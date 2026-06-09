import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { CLIENT_NAME, CLIENT_VERSION } from '../consts/server.consts.js';

interface McpToolResult {
  content: Array<{ type: string; text: string }>;
}

export class McpClient {
  private serverUrl: string;
  private accessKey: string;
  private timeoutMs: number;
  private client: Client | null = null;
  private transport: StreamableHTTPClientTransport | null = null;
  private connecting: Promise<void> | null = null;

  constructor(serverUrl: string, accessKey: string, timeoutMs: number) {
    this.serverUrl = serverUrl;
    this.accessKey = accessKey;
    this.timeoutMs = timeoutMs;
  }

  private async ensureConnected(): Promise<void> {
    if (this.client) {
      return;
    }
    if (this.connecting) {
      return this.connecting;
    }
    this.connecting = this.connect();
    try {
      await this.connecting;
    } finally {
      this.connecting = null;
    }
  }

  private async connect(): Promise<void> {
    this.transport = new StreamableHTTPClientTransport(new URL(this.serverUrl), {
      requestInit: {
        headers: {
          'User-Agent': `${CLIENT_NAME}/${CLIENT_VERSION}`,
          Authorization: `Bearer ${this.accessKey}`,
        },
      },
    });

    this.client = new Client(
      { name: CLIENT_NAME, version: CLIENT_VERSION },
      { capabilities: {} },
    );

    await this.client.connect(this.transport);
  }

  private reset(): void {
    this.client = null;
    this.transport = null;
  }

  async callTool(name: string, args: Record<string, unknown>, signal?: AbortSignal): Promise<McpToolResult> {
    try {
      await this.ensureConnected();
    } catch {
      this.reset();
      throw new Error(`Failed to connect to Xpoz MCP server at ${this.serverUrl}`);
    }

    const timeoutSignal = AbortSignal.timeout(this.timeoutMs);
    const combinedSignal = signal
      ? AbortSignal.any([signal, timeoutSignal])
      : timeoutSignal;

    let result: { isError?: boolean; content: Array<{ type: string; text?: string }> };
    try {
      result = await this.client!.callTool(
        { name, arguments: args },
        undefined,
        { signal: combinedSignal },
      ) as typeof result;
    } catch (error) {
      this.reset();
      throw error;
    }

    if (result.isError) {
      const errorText = result.content
        .filter((b): b is { type: string; text: string } => b.text !== undefined)
        .map(b => b.text)
        .join('\n');
      throw new Error(errorText || `Tool "${name}" returned an error`);
    }

    const blocks: Array<{ type: string; text: string }> = [];
    for (const block of result.content) {
      if (block.text !== undefined) {
        blocks.push({ type: block.type, text: block.text });
      }
    }

    return { content: blocks };
  }

  async close(): Promise<void> {
    if (this.client) {
      try {
        await this.transport?.terminateSession();
      } catch {
        // server may not support session termination
      }
      try {
        await this.client.close();
      } catch {
        // ignore errors on close
      }
      this.reset();
    }
  }
}
