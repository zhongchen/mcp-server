import { z } from "zod";

export const listBasicAuthParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  pageSize: z.number().optional().default(10),
  pageNumber: z.number().optional().default(1),
  tags: z
    .string()
    .optional()
    .describe(
      "A list of tags to filter basic-auth credentials. Use comma (,) for AND, forward slash (/) for OR"
    ),
  consumerId: z.string().optional().describe("Consumer ID to filter basic-auth credentials")
});

export const createBasicAuthParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  consumerId: z.string().optional().describe("Consumer ID to associate the basic-auth credential"),
  basicAuth: z.object({
    username: z.string().describe("Username for the basic-auth credential"),
    password: z.string().describe("Password for the basic-auth credential"),
    tags: z.array(z.string()).optional()
  }).describe("Basic-auth credential configuration")
});

export const getBasicAuthParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  basicAuthId: z.string().describe("ID of the basic-auth credential"),
  consumerId: z.string().optional().describe("Consumer ID associated with the credential")
});

export const updateBasicAuthParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  basicAuthId: z.string().describe("ID of the basic-auth credential"),
  consumerId: z.string().optional().describe("Consumer ID associated with the credential"),
  basicAuth: z.object({
    username: z.string().optional(),
    password: z.string().optional(),
    tags: z.array(z.string()).optional()
  }).describe("Updated basic-auth credential configuration")
});

export const deleteBasicAuthParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  basicAuthId: z.string().describe("ID of the basic-auth credential"),
  consumerId: z.string().optional().describe("Consumer ID associated with the credential")
});
