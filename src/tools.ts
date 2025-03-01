import { z } from "zod";
import { 
  listControlPlanePrompt, 
  listServicesPrompt, 
  searchPrompt, 
  searchTypesPrompt 
} from "./prompts";
import { 
  listControlPlaneParameters, 
  listServicesParameters, 
  searchParameters, 
  searchTypesParameters 
} from "./parameters";
import { 
  listControlPlanes, 
  listServices, 
  search, 
  searchTypes 
} from "./functions";

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
  {
    name: 'SearchKonnect',
    description: searchPrompt,
    parameters: searchParameters,
    execute: search
  },
  {
    name: 'ListSearchTypes',
    description: searchTypesPrompt,
    parameters: searchTypesParameters,
    execute: searchTypes
  }
];
