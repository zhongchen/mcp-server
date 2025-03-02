export const listControlPlanePrompt = `
List the number of control planes in a Konnect account.

It takes one argument
- region (str, optional): the region (default is us)
- pageNumber (number, optional) (default 1)
- pageSize (number, optional) (default 10)
`;


export const listServicesPrompt = `
List services in a Konnect control plane.

Parameters:
- control_plane_id (required): The ID of the control plane to list services from
- tags (optional): Tags to filter services by. Use comma (,) for AND, forward slash (/) for OR

Example usage:
{
  "control_plane_id": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "tags": "production,api/internal"
}

Response will include:
- List of services in the control plane
- Service details like name, host, path, etc.
- Metadata about the services
`;

export const searchPrompt = `
Search for entities in Konnect using a query string.

Parameters:
- q (required): The query that defines the search criteria (e.g., "name:\"John Smith\"")
- region (optional): Konnect region (default is "us")
- pageSize (optional): Maximum number of items per page (default is 10)
- pageAfter (optional): Token for pagination to request the next page

Example usage:
{
  "q": "name:\"API Gateway\"",
  "region": "us",
  "pageSize": 20
}

Response will include:
- List of matched Konnect entities
- Entity details like id, type, name, description, etc.
- Pagination metadata
`;

export const searchTypesPrompt = `
List all searchable entity types in Konnect.

Parameters:
- region (optional): Konnect region (default is "us")

Response will include:
- List of searchable entity types
- Details about each type including name, description, searchable attributes, etc.
- Regions where each entity type is available
`;

// Route Prompts
export const listRoutesPrompt = `
List all routes in a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane to list routes from
- tags (optional): Tags to filter routes by. Use comma (,) for AND, forward slash (/) for OR
- pageSize (optional): Maximum number of items per page. Default: 10
- pageOffset (optional): Offset for pagination

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "tags": "production,api/internal"
}

Response will include:
- List of routes in the control plane
- Route details like name, hosts, paths, etc.
- Metadata about the routes
`;

export const createRoutePrompt = `
Create a new route in a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- route (required): Route configuration object
  - name (optional): The name of the route
  - protocols (optional): An array of protocols this route should match
  - methods (optional): An array of HTTP methods this route should match
  - hosts (optional): An array of domain names this route should match
  - paths (optional): An array of paths this route should match
  - service (optional): The service this route should be associated with
  - tags (optional): An array of tags for the route

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "route": {
    "name": "example-route",
    "protocols": ["http", "https"],
    "hosts": ["example.com"],
    "paths": ["/api"],
    "service": {
      "id": "7fca84d6-7d37-4a74-a7b0-93e576089a41"
    }
  }
}

Response will include:
- The created route object
`;

export const getRoutePrompt = `
Fetch a specific route from a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- routeId (required): The ID or name of the route to fetch

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "routeId": "a4326a41-aa12-44e3-93e4-6b6e58bfb9d7"
}

Response will include:
- The route object with all its properties
`;

export const updateRoutePrompt = `
Update an existing route in a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- routeId (required): The ID or name of the route to update
- route (required): Updated route configuration

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "routeId": "a4326a41-aa12-44e3-93e4-6b6e58bfb9d7",
  "route": {
    "hosts": ["new-example.com"],
    "paths": ["/api/v2"]
  }
}

Response will include:
- The updated route object
`;

export const deleteRoutePrompt = `
Delete a route from a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- routeId (required): The ID or name of the route to delete

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "routeId": "a4326a41-aa12-44e3-93e4-6b6e58bfb9d7"
}

Response will include:
- Success confirmation
`;

// Additional Service Prompts
export const createServicePrompt = `
Create a new service in a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- service (required): Service configuration object
  - name (optional): The name of the service
  - protocol (optional): The protocol used to communicate with the upstream
  - host (required): The host of the upstream server
  - port (optional): The upstream server port
  - path (optional): The path to be used in requests to the upstream server
  - tags (optional): An array of tags for the service

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "service": {
    "name": "example-service",
    "protocol": "http",
    "host": "example.internal",
    "port": 80,
    "path": "/"
  }
}

Response will include:
- The created service object
`;

export const getServicePrompt = `
Fetch a specific service from a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- serviceId (required): The ID or name of the service to fetch

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "serviceId": "7fca84d6-7d37-4a74-a7b0-93e576089a41"
}

Response will include:
- The service object with all its properties
`;

export const updateServicePrompt = `
Update an existing service in a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- serviceId (required): The ID or name of the service to update
- service (required): Updated service configuration

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "serviceId": "7fca84d6-7d37-4a74-a7b0-93e576089a41",
  "service": {
    "host": "new-example.internal",
    "path": "/api"
  }
}

Response will include:
- The updated service object
`;

export const deleteServicePrompt = `
Delete a service from a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- serviceId (required): The ID or name of the service to delete

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "serviceId": "7fca84d6-7d37-4a74-a7b0-93e576089a41"
}

Response will include:
- Success confirmation
`;