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
