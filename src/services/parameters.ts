import { z } from "zod";

export const listServicesParameters = z.object({
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
      "A list of tags to filter services. Use comma (,) for AND, forward slash (/) for OR"
    ),
});

export const createServiceParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  service: z.object({
    name: z.string().optional(),
    protocol: z.string().optional(),
    host: z.string(),
    port: z.number().optional(),
    path: z.string().optional(),
    retries: z.number().optional(),
    connect_timeout: z.number().optional(),
    write_timeout: z.number().optional(),
    read_timeout: z.number().optional(),
    tags: z.array(z.string()).optional(),
    client_certificate: z.object({
      id: z.string()
    }).optional(),
    tls_verify: z.boolean().optional(),
    tls_verify_depth: z.number().optional(),
    ca_certificates: z.array(z.string()).optional(),
    enabled: z.boolean().optional()
  }).describe("Service configuration")
});

export const getServiceParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  serviceId: z.string().describe("ID or name of the service")
});

export const updateServiceParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  serviceId: z.string().describe("ID or name of the service"),
  service: z.object({
    name: z.string().optional(),
    protocol: z.string().optional(),
    host: z.string().optional(),
    port: z.number().optional(),
    path: z.string().optional(),
    retries: z.number().optional(),
    connect_timeout: z.number().optional(),
    write_timeout: z.number().optional(),
    read_timeout: z.number().optional(),
    tags: z.array(z.string()).optional(),
    client_certificate: z.object({
      id: z.string()
    }).optional(),
    tls_verify: z.boolean().optional(),
    tls_verify_depth: z.number().optional(),
    ca_certificates: z.array(z.string()).optional(),
    enabled: z.boolean().optional()
  }).describe("Updated service configuration")
});

export const deleteServiceParameters = z.object({
  controlPlaneId: z.string().describe("The ID of the control plane"),
  region: z
    .enum(["us", "eu", "au", "in", "me"])
    .optional()
    .default("us")
    .describe("konnect region"),
  serviceId: z.string().describe("ID or name of the service")
});
