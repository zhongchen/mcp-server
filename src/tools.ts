import { z } from "zod";
import { listControlPlanePrompt, listServicesPrompt } from "./prompts";
import { listControlPlaneParameters, listServicesParameters } from "./parameters";
import { listControlPlanes, listServices } from "./functions";

export interface Tool {
  name: string;
  description: string;
  parameters: z.ZodObject<any, any, any, any>;
  execute: (args: any) => Promise<any>;
}

export const tools: Tool[] = [
  {
    name: "ListControlPlanes",
    description: listControlPlanePrompt,
    parameters: listControlPlaneParameters,
    execute: listControlPlanes,
  },
  {
    name: 'ListServices',
    description: listServicesPrompt,
    parameters: listServicesParameters,
    execute: listServices
  },
];
