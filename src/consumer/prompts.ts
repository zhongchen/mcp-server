export const listConsumersPrompt = `
List consumers in a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane to list consumers from
- tags (optional): Tags to filter consumers by. Use comma (,) for AND, forward slash (/) for OR

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "tags": "silver-tier"
}

Response will include:
- List of consumers in the control plane
- Consumer details like username, custom_id, etc.
- Metadata about the consumers
`;

export const createConsumerPrompt = `
Create a new consumer in a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- consumer (required): Consumer configuration object
  - username (optional): The unique username of the Consumer
  - custom_id (optional): A custom identifier for the Consumer
  - tags (optional): An array of tags for the Consumer

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "consumer": {
    "username": "bob-the-builder",
    "custom_id": "4200",
    "tags": ["silver-tier"]
  }
}

Response will include:
- The created consumer object
`;

export const getConsumerPrompt = `
Fetch a specific consumer from a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- consumerId (required): The ID or username of the consumer to fetch

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "consumerId": "8a388226-80e8-4027-a486-25e4f7db5d21"
}

Response will include:
- The consumer object with all its properties
`;

export const updateConsumerPrompt = `
Update an existing consumer in a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- consumerId (required): The ID or username of the consumer to update
- consumer (required): Updated consumer configuration

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "consumerId": "8a388226-80e8-4027-a486-25e4f7db5d21",
  "consumer": {
    "username": "new-username",
    "tags": ["gold-tier"]
  }
}

Response will include:
- The updated consumer object
`;

export const deleteConsumerPrompt = `
Delete a consumer from a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- consumerId (required): The ID or username of the consumer to delete

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "consumerId": "8a388226-80e8-4027-a486-25e4f7db5d21"
}

Response will include:
- Success confirmation
`;
