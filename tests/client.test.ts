import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockConnect = vi.fn().mockResolvedValue(undefined);
const mockCallTool = vi.fn();
const mockClose = vi.fn().mockResolvedValue(undefined);

vi.mock('@modelcontextprotocol/sdk/client/index.js', () => ({
  Client: class MockClient {
    connect = mockConnect;
    callTool = mockCallTool;
    close = mockClose;
  },
}));

vi.mock('@modelcontextprotocol/sdk/client/streamableHttp.js', () => ({
  StreamableHTTPClientTransport: class MockTransport {
    terminateSession = vi.fn().mockResolvedValue(undefined);
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockConnect.mockResolvedValue(undefined);
});

describe('McpClient', () => {
  async function createClient(): Promise<InstanceType<typeof import('../src/client/mcp-client.js').McpClient>> {
    const { McpClient } = await import('../src/client/mcp-client.js');
    return new McpClient('https://mcp.xpoz.ai/mcp', 'test-key', 300000);
  }

  it('forwards tool name and args to MCP client', async () => {
    mockCallTool.mockResolvedValue({
      content: [{ type: 'text', text: '{"results":[]}' }],
    });

    const client = await createClient();
    await client.callTool('getTwitterUser', { identifier: 'elonmusk', identifierType: 'username' });

    expect(mockCallTool).toHaveBeenCalledWith(
      { name: 'getTwitterUser', arguments: { identifier: 'elonmusk', identifierType: 'username' } },
      undefined,
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('returns content blocks from successful call', async () => {
    mockCallTool.mockResolvedValue({
      content: [{ type: 'text', text: '{"id":"123","username":"elonmusk"}' }],
    });

    const client = await createClient();
    const result = await client.callTool('getTwitterUser', { identifier: 'elonmusk', identifierType: 'username' });

    expect(result.content).toEqual([
      { type: 'text', text: '{"id":"123","username":"elonmusk"}' },
    ]);
  });

  it('throws on MCP error response', async () => {
    mockCallTool.mockResolvedValue({
      isError: true,
      content: [{ type: 'text', text: 'User not found' }],
    });

    const client = await createClient();
    await expect(client.callTool('getTwitterUser', { identifier: 'nonexistent', identifierType: 'username' }))
      .rejects.toThrow('User not found');
  });

  it('resets and throws on connection failure', async () => {
    mockConnect.mockRejectedValueOnce(new Error('ECONNREFUSED'));

    const client = await createClient();
    await expect(client.callTool('getTwitterUser', { identifier: 'test', identifierType: 'username' }))
      .rejects.toThrow('Failed to connect to Xpoz MCP server');

    mockConnect.mockResolvedValue(undefined);
    mockCallTool.mockResolvedValue({
      content: [{ type: 'text', text: '{}' }],
    });
    const result = await client.callTool('getTwitterUser', { identifier: 'test', identifierType: 'username' });
    expect(result.content).toEqual([{ type: 'text', text: '{}' }]);
  });

  it('resets on callTool failure for reconnection', async () => {
    mockCallTool
      .mockRejectedValueOnce(new Error('connection lost'))
      .mockResolvedValue({ content: [{ type: 'text', text: '{}' }] });

    const client = await createClient();
    await expect(client.callTool('getTwitterUser', { identifier: 'test', identifierType: 'username' }))
      .rejects.toThrow('connection lost');

    const result = await client.callTool('getTwitterUser', { identifier: 'test', identifierType: 'username' });
    expect(result.content).toEqual([{ type: 'text', text: '{}' }]);
    expect(mockConnect).toHaveBeenCalledTimes(2);
  });
});
