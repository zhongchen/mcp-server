import { z } from "zod";

export const listControlPlaneParameters = z.object({
  region: z.enum(["us", "eu", "au", "in", "me"]),
  pageSize: z.number().default(10),
  pageNumber: z.number().default(1),
})