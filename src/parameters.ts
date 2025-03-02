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

// Route Parameters

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

// Additional Service Parameters

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