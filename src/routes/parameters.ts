import { z } from "zod";

export const routeParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  pageSize: z.number().optional().default(10),
  pageOffset: z.string().optional(),
  tags: z
    .string()
    .optional()
    .describe(
      "A list of tags to filter routes. Use comma (,) for AND, forward slash (/) for OR"
    ),
});

export const createRouteParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  route: z.object({
    name: z.string().optional(),
    protocols: z.array(z.string()).optional(),
    methods: z.array(z.string()).optional(),
    hosts: z.array(z.string()).optional(),
    paths: z.array(z.string()).optional(),
    headers: z.record(z.string(), z.string()).optional(),
    https_redirect_status_code: z.number().optional(),
    regex_priority: z.number().optional(),
    strip_path: z.boolean().optional(),
    preserve_host: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    service: z.object({
      id: z.string()
    }).optional()
  }).describe("Route configuration")
});

export const getRouteParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  routeId: z.string().describe("ID or name of the route")
});

export const updateRouteParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  routeId: z.string().describe("ID or name of the route"),
  route: z.object({
    name: z.string().optional(),
    protocols: z.array(z.string()).optional(),
    methods: z.array(z.string()).optional(),
    hosts: z.array(z.string()).optional(),
    paths: z.array(z.string()).optional(),
    headers: z.record(z.string(), z.string()).optional(),
    https_redirect_status_code: z.number().optional(),
    regex_priority: z.number().optional(),
    strip_path: z.boolean().optional(),
    preserve_host: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    service: z.object({
      id: z.string()
    }).optional()
  }).describe("Updated route configuration")
});

export const deleteRouteParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  routeId: z.string().describe("ID or name of the route")
});
