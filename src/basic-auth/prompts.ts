export const listBasicAuthPrompt = `
List basic-auth credentials in a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane to list basic-auth credentials from
- consumerId (optional): Filter basic-auth credentials by consumer ID
- tags (optional): Tags to filter basic-auth credentials by. Use comma (,) for AND, forward slash (/) for OR

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "consumerId": "84a73fb8-50fc-44a7-a4d5-aa17728ee83f",
  "tags": "production"
}

Response will include:
- List of basic-auth credentials in the control plane
- Credential details like username, consumer association, etc.
- Metadata about the credentials
`;

export const createBasicAuthPrompt = `
Create a new basic-auth credential in a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- consumerId (optional): Consumer ID to associate the basic-auth credential
- basicAuth (required): Basic-auth credential configuration
  - username (required): Username for the credential
  - password (required): Password for the credential
  - tags (optional): An array of tags for the credential

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "consumerId": "84a73fb8-50fc-44a7-a4d5-aa17728ee83f",
  "basicAuth": {
    "username": "johndoe",
    "password": "securepassword123",
    "tags": ["production"]
  }
}

Response will include:
- The created basic-auth credential object
`;

export const getBasicAuthPrompt = `
Fetch a specific basic-auth credential from a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- basicAuthId (required): ID of the basic-auth credential
- consumerId (optional): Consumer ID associated with the credential

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "basicAuthId": "b2f34145-0343-41a4-9602-4c69dec2f269"
}

Response will include:
- The basic-auth credential object with all its properties
`;

export const updateBasicAuthPrompt = `
Update an existing basic-auth credential in a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- basicAuthId (required): ID of the basic-auth credential
- consumerId (optional): Consumer ID associated with the credential
- basicAuth (required): Updated basic-auth credential configuration
  - username (optional): New username
  - password (optional): New password
  - tags (optional): Updated tags

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "basicAuthId": "b2f34145-0343-41a4-9602-4c69dec2f269",
  "basicAuth": {
    "password": "newpassword456",
    "tags": ["production", "updated"]
  }
}

Response will include:
- The updated basic-auth credential object
`;

export const deleteBasicAuthPrompt = `
Delete a basic-auth credential from a Konnect control plane.

Parameters:
- controlPlaneId (required): The ID of the control plane
- basicAuthId (required): ID of the basic-auth credential
- consumerId (optional): Consumer ID associated with the credential

Example usage:
{
  "controlPlaneId": "9524ec7d-36d9-465d-a8c5-83a3c9390458",
  "basicAuthId": "b2f34145-0343-41a4-9602-4c69dec2f269"
}

Response will include:
- Success confirmation
`;
