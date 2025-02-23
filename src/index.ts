#!/usr/bin/env node

import { green } from "colors";
import { KonnectMCPServer } from "./server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./tools";

export async function main() {
  const server = new KonnectMCPServer(tools);
  const transport = new StdioServerTransport();
  
  // Handle process termination
  process.on('SIGINT', async () => {
    await server.close();
    process.exit(0);
  });

  try {
    await server.connect(transport);
    console.error(green('✅ Konnect MCP Server running on stdio'));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Failed to run server:", error);
    process.exit(1);
  });
}