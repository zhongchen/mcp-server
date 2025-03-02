import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Tool } from "./tools";
import { setKonnectToken } from "./shared/api";

export class KonnectMCPServer extends McpServer {
  constructor(tools: Tool[], token: string) {
    super({
      name: "Konnect MCP Server",
      version: "1.0.0",
      description: "A MCP server for Konnect",
    });

    setKonnectToken(token);
    // Register tools
    tools.forEach((tool) => {
      this.tool(
        tool.name,
        tool.description,
        tool.parameters.shape,
        tool.execute
      );
    });
  }
}