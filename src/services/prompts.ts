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
