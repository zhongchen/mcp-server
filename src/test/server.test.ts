import { KonnectMCPServer } from '../server';
import { tools } from '../tools';
import { setKonnectToken } from '../functions';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

// Mock the MCP Server from SDK
jest.mock('@modelcontextprotocol/sdk/server/mcp.js');
jest.mock('../functions');

describe('KonnectMCPServer', () => {
  const mockToken = 'test-token';
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should initialize correctly', () => {
    const server = new KonnectMCPServer(tools, mockToken);
    
    // Check if the constructor was called with correct params
    expect(McpServer).toHaveBeenCalledWith({
      name: 'Konnect MCP Server',
      version: '1.0.0',
      description: 'A MCP server for Konnect',
    });
    
    // Check if token was set
    expect(setKonnectToken).toHaveBeenCalledWith(mockToken);
  });
  
  it('should register all tools', () => {
    const mockTool = jest.fn();
    // @ts-ignore - Create a mock for testing
    McpServer.prototype.tool = mockTool;
    
    const server = new KonnectMCPServer(tools, mockToken);
    
    // Should register each tool
    expect(mockTool).toHaveBeenCalledTimes(tools.length);
    
    // Verify each tool was registered with correct params
    tools.forEach((tool) => {
      expect(mockTool).toHaveBeenCalledWith(
        tool.name,
        tool.description,
        tool.parameters.shape,
        tool.execute
      );
    });
  });
});
