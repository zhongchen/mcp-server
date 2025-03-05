import { z } from "zod";

export const listConsumersParameters = z.object({
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
      "A list of tags to filter consumers. Use comma (,) for AND, forward slash (/) for OR"
    ),
});

export const createConsumerParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  consumer: z.object({
    username: z.string().optional(),
    custom_id: z.string().optional(),
    tags: z.array(z.string()).optional()
  }).describe("Consumer configuration")
});

export const getConsumerParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  consumerId: z.string().describe("ID or username of the consumer")
});

export const updateConsumerParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  consumerId: z.string().describe("ID or username of the consumer"),
  consumer: z.object({
    username: z.string().optional(),
    custom_id: z.string().optional(),
    tags: z.array(z.string()).optional()
  }).describe("Updated consumer configuration")
});

export const deleteConsumerParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  consumerId: z.string().describe("ID or username of the consumer")
});
