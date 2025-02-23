import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Tool } from "./tools";

export class KonnectMCPServer extends McpServer {
  constructor(tools: Tool[]) {
    super({
      name: "Konnect MCP Server",
      version: "1.0.0",
      description: "A simple MCP server for testing",
    });

    // Register tools
    tools.forEach((tool) => {
      this.tool(tool.name, tool.description, tool.parameters.shape, tool.execute);
    });
  }
}
