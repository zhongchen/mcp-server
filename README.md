# Konnect MCP Server

A Model Context Protocol (MCP) server for interacting with Kong Konnect APIs. This server allows AI tools like Claude to interact with Konnect services via structured function calls.

## Overview

The Konnect MCP Server implements the Model Context Protocol to provide a bridge between AI assistants and Kong Konnect APIs. It enables AI assistants to:

- List control planes
- List services within a control plane
- Search for Konnect entities
- List available search types

## Prerequisites

- Node.js (v18 or later)
- Kong Konnect account
- Konnect API token with appropriate permissions

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/konnect-mcp-server.git
cd konnect-mcp-server
npm install
```

## Building

To build the project:

```bash
npm run build
```

This will compile the TypeScript code and generate the JavaScript files in the `dist` directory.

## Usage

To start the MCP server:

```bash
npm start
```

Or, you can provide your Konnect API token directly:

```bash
npm start -- --token=your_konnect_api_token
```

Alternatively, you can set the `KONNECT_TOKEN` environment variable:

```bash
export KONNECT_TOKEN=your_konnect_api_token
npm start
```

## Available Tools

The server exposes the following functions to AI assistants:

### ListControlPlanes

Lists control planes in a Konnect account.

Parameters:
- `region` (optional): The Konnect region (us, eu, au, in, me). Default: "us"
- `pageSize` (optional): Maximum number of items per page. Default: 10
- `pageNumber` (optional): Page number to retrieve. Default: 1

### ListServices

Lists services in a specific control plane.

Parameters:
- `controlPlaneId` (required): The ID of the control plane
- `region` (optional): The Konnect region (us, eu, au, in, me). Default: "us"
- `pageSize` (optional): Maximum number of items per page. Default: 10
- `pageNumber` (optional): Page number to retrieve. Default: 1
- `tags` (optional): Tags to filter services by. Use comma (,) for AND, forward slash (/) for OR

### SearchKonnect

Searches for entities in Konnect using a query string.

Parameters:
- `q` (required): The query that defines the search criteria (e.g., `name:"API Gateway"`)
- `region` (optional): The Konnect region (us, eu, au, in, me). Default: "us"
- `pageSize` (optional): Maximum number of items per page. Default: 10
- `pageAfter` (optional): Token for pagination to request the next page

### ListSearchTypes

Lists all searchable entity types in Konnect.

Parameters:
- `region` (optional): The Konnect region (us, eu, au, in, me). Default: "us"

## Development

### Project Structure

- `src/index.ts`: Entry point for the application
- `src/server.ts`: MCP server implementation
- `src/tools.ts`: Tool definitions for the MCP server
- `src/functions.ts`: Implementation of tool functions (API calls)
- `src/parameters.ts`: Parameter validation schemas
- `src/prompts.ts`: Tool descriptions and documentation

### Available Scripts

- `npm run build`: Compiles the TypeScript code
- `npm run start`: Starts the server
- `npm run clean`: Removes the dist directory
- `npm run lint`: Lints the codebase
- `npm run test`: Runs tests
- `npm run test:watch`: Runs tests in watch mode
- `npm run prettier`: Formats the code
- `npm run prettier-check`: Checks if the code is formatted

## Search Query Examples

You can use the `SearchKonnect` tool with various query formats:

- Search by name: `name:"API Gateway"`
- Search by type: `type:user`
- Search by attribute: `attributes.email:*@example.com`
- Combined search: `type:team AND labels.env:prod`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.