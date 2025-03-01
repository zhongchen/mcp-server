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
