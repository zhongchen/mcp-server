# Konnect MCP Server

A Model Context Protocol (MCP) server for interacting with Kong Konnect APIs. This server allows AI tools like Claude to interact with Konnect services via structured function calls.

## Overview

The Konnect MCP Server implements the Model Context Protocol to provide a bridge between AI assistants and Kong Konnect APIs. It enables AI assistants to:

- List and manage control planes
- List, create, update, and delete services
- List, create, update, and delete routes
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

The server exposes the following functions to AI assistants, organized by category:

### Core Tools

#### ListControlPlanes

Lists control planes in a Konnect account.

Parameters:
- `region` (optional): The Konnect region (us, eu, au, in, me). Default: "us"
- `pageSize` (optional): Maximum number of items per page. Default: 10
- `pageNumber` (optional): Page number to retrieve. Default: 1

#### SearchKonnect

Searches for entities in Konnect using a query string.

Parameters:
- `q` (required): The query that defines the search criteria (e.g., `name:"API Gateway"`)
- `region` (optional): The Konnect region (us, eu, au, in, me). Default: "us"
- `pageSize` (optional): Maximum number of items per page. Default: 10
- `pageAfter` (optional): Token for pagination to request the next page

#### ListSearchTypes

Lists all searchable entity types in Konnect.

Parameters:
- `region` (optional): The Konnect region (us, eu, au, in, me). Default: "us"

### Service Tools

#### ListServices

Lists services in a specific control plane.

Parameters:
- `controlPlaneId` (required): The ID of the control plane
- `region` (optional): The Konnect region (us, eu, au, in, me). Default: "us"
- `pageSize` (optional): Maximum number of items per page. Default: 10
- `pageNumber` (optional): Page number to retrieve. Default: 1
- `tags` (optional): Tags to filter services by. Use comma (,) for AND, forward slash (/) for OR

#### CreateService

Creates a new service in a control plane.

Parameters:
- `controlPlaneId` (required): The ID of the control plane
- `service` (required): Service configuration object
  - `name` (optional): The name of the service
  - `protocol` (optional): The protocol to use (http, https, grpc, etc.)
  - `host` (required): The host of the upstream server
  - `port` (optional): The port of the upstream server
  - And other service configuration options

#### GetService

Fetches details of a specific service.

Parameters:
- `controlPlaneId` (required): The ID of the control plane
- `serviceId` (required): The ID or name of the service

#### UpdateService

Updates an existing service.

Parameters:
- `controlPlaneId` (required): The ID of the control plane
- `serviceId` (required): The ID or name of the service
- `service` (required): Updated service configuration

#### DeleteService

Deletes a service.

Parameters:
- `controlPlaneId` (required): The ID of the control plane
- `serviceId` (required): The ID or name of the service

### Route Tools

#### ListRoutes

Lists routes in a specific control plane.

Parameters:
- `controlPlaneId` (required): The ID of the control plane
- `region` (optional): The Konnect region (us, eu, au, in, me). Default: "us"
- `pageSize` (optional): Maximum number of items per page. Default: 10
- `pageOffset` (optional): Offset for pagination
- `tags` (optional): Tags to filter routes by. Use comma (,) for AND, forward slash (/) for OR

#### CreateRoute

Creates a new route in a control plane.

Parameters:
- `controlPlaneId` (required): The ID of the control plane
- `route` (required): Route configuration object
  - `name` (optional): The name of the route
  - `protocols` (optional): An array of protocols this route should match
  - `methods` (optional): An array of HTTP methods this route should match
  - `hosts` (optional): An array of domain names this route should match
  - `paths` (optional): An array of paths this route should match
  - And other route configuration options

#### GetRoute

Fetches details of a specific route.

Parameters:
- `controlPlaneId` (required): The ID of the control plane
- `routeId` (required): The ID or name of the route

#### UpdateRoute

Updates an existing route.

Parameters:
- `controlPlaneId` (required): The ID of the control plane
- `routeId` (required): The ID or name of the route
- `route` (required): Updated route configuration

#### DeleteRoute

Deletes a route.

Parameters:
- `controlPlaneId` (required): The ID of the control plane
- `routeId` (required): The ID or name of the route

## Development

### Project Structure

The project is organized into modules by functionality:

```
src/
├── core/           # Core functionality (control planes, search)
│   ├── functions.ts
│   ├── parameters.ts
│   ├── prompts.ts
│   └── index.ts
├── services/       # Service-related functionality
│   ├── functions.ts
│   ├── parameters.ts
│   ├── prompts.ts
│   └── index.ts
├── routes/         # Route-related functionality
│   ├── functions.ts
│   ├── parameters.ts
│   ├── prompts.ts
│   └── index.ts
├── shared/         # Shared utilities
│   └── api.ts
├── index.ts        # Application entry point
├── server.ts       # MCP server implementation
└── tools.ts        # Tool registration and configuration
```

### Tests

Tests are organized to match the project structure:

```
src/test/
├── core/           # Tests for core functionality
├── services/       # Tests for service-related functionality
├── routes/         # Tests for route-related functionality
├── shared/         # Tests for shared utilities
└── server.test.ts  # Tests for the MCP server
```

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