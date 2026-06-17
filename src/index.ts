import { Type } from 'typebox';
import { defineToolPlugin } from 'openclaw/plugin-sdk/tool-plugin';
import { TOOL_REGISTRY } from './tools/tool-registry.js';
import { McpClient } from './client/mcp-client.js';
import { PLUGIN_ID, PLUGIN_NAME, PLUGIN_DESCRIPTION, DEFAULT_SERVER_URL, DEFAULT_TIMEOUT_MS } from './consts/server.consts.js';

let client: McpClient | null = null;
let clientKey: string | null = null;

function getClient(config: { serverUrl?: string; accessKey: string; timeoutMs?: number }): McpClient {
  const serverUrl = config.serverUrl || DEFAULT_SERVER_URL;
  const timeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const key = `${serverUrl}::${config.accessKey}::${timeoutMs}`;
  if (!client || clientKey !== key) {
    client = new McpClient(serverUrl, config.accessKey, timeoutMs);
    clientKey = key;
  }
  return client;
}

export default defineToolPlugin({
  id: PLUGIN_ID,
  name: PLUGIN_NAME,
  description: PLUGIN_DESCRIPTION,
  configSchema: Type.Object({
    serverUrl: Type.Optional(Type.String({ description: 'Xpoz MCP server URL' })),
    accessKey: Type.String({ description: 'Xpoz API access key (Bearer token). Get yours at https://xpoz.ai' }),
    timeoutMs: Type.Optional(Type.Number({ description: 'Request timeout in milliseconds. Default: 300000 (5 minutes).' })),
  }),
  tools: (tool) =>
    TOOL_REGISTRY.map((t) =>
      tool({
        name: t.name,
        description: t.description,
        parameters: t.parameters,
        execute(params, config, context) {
          context.signal?.throwIfAborted();
          const mcpClient = getClient(config);
          return mcpClient.callTool(t.name, params as Record<string, unknown>, context.signal);
        },
      }),
    ),
});
