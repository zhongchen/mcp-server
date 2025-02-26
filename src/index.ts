#!/usr/bin/env node

import { green } from "colors";
import { KonnectMCPServer } from "./server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./tools";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export async function main() {
  const argv = yargs(hideBin(process.argv))
    .option("token", {
      alias: "t",
      type: "string",
      description: "Konnect API token",
      env: "KONNECT_TOKEN",
    })
    .help().parseSync();

  // Make token available to tools
  const token = argv.token || process.env.KONNECT_TOKEN ;

  if (!token) {
    throw new Error(
      'Konnect API key not provided. Please either pass it as an argument --token=$KEY or set the KONNECT_TOKEN environment variable.'
    );
  }

  const server = new KonnectMCPServer(tools, token);
  const transport = new StdioServerTransport();

  // Handle process termination
  process.on("SIGINT", async () => {
    await server.close();
    process.exit(0);
  });

  try {
    await server.connect(transport);
    console.error(green("✅ Konnect MCP Server running on stdio"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Failed to run server:", error);
    process.exit(1);
  });
}
