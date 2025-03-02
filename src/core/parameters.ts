import { z } from "zod";

export const listControlPlaneParameters = z.object({
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  pageSize: z.number().optional().default(10),
  pageNumber: z.number().optional().default(1),
});

export const searchParameters = z.object({
  q: z.string().describe("The query that defines the search criteria"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("Konnect region"),
  pageSize: z.number().optional().default(10),
  pageAfter: z.string().optional().describe("Token for pagination"),
});

export const searchTypesParameters = z.object({
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("Konnect region"),
});