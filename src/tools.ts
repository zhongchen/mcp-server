import { z } from "zod";
import { 
  listControlPlanePrompt, 
  listServicesPrompt, 
  searchPrompt, 
  searchTypesPrompt,
  listRoutesPrompt,
  createRoutePrompt,
  getRoutePrompt,
  updateRoutePrompt,
  deleteRoutePrompt,
  createServicePrompt,
  getServicePrompt,
  updateServicePrompt,
  deleteServicePrompt
} from "./prompts";
import { 
  listControlPlaneParameters, 
  listServicesParameters, 
  searchParameters, 
  searchTypesParameters,
  routeParameters,
  createRouteParameters,
  getRouteParameters,
  updateRouteParameters,
  deleteRouteParameters,
  createServiceParameters,
  getServiceParameters,
  updateServiceParameters,
  deleteServiceParameters
} from "./parameters";
import { 
  listControlPlanes, 
  listServices, 
  search, 
  searchTypes,
  listRoutes,
  createRoute,
  getRoute,
  updateRoute,
  deleteRoute,
  createService,
  getService,
  updateService,
  deleteService
} from "./functions";

export interface Tool {
  name: string;
  description: string;
  parameters: z.ZodObject<any, any, any, any>;
  execute: (args: any) => Promise<any>;
}

export const tools: Tool[] = [
  // Existing tools
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
  },
  
  // Route tools
  {
    name: 'ListRoutes',
    description: listRoutesPrompt,
    parameters: routeParameters,
    execute: listRoutes
  },
  {
    name: 'CreateRoute',
    description: createRoutePrompt,
    parameters: createRouteParameters,
    execute: createRoute
  },
  {
    name: 'GetRoute',
    description: getRoutePrompt,
    parameters: getRouteParameters,
    execute: getRoute
  },
  {
    name: 'UpdateRoute',
    description: updateRoutePrompt,
    parameters: updateRouteParameters,
    execute: updateRoute
  },
  {
    name: 'DeleteRoute',
    description: deleteRoutePrompt,
    parameters: deleteRouteParameters,
    execute: deleteRoute
  },
  
  // Additional Service tools
  {
    name: 'CreateService',
    description: createServicePrompt,
    parameters: createServiceParameters,
    execute: createService
  },
  {
    name: 'GetService',
    description: getServicePrompt,
    parameters: getServiceParameters,
    execute: getService
  },
  {
    name: 'UpdateService',
    description: updateServicePrompt,
    parameters: updateServiceParameters,
    execute: updateService
  },
  {
    name: 'DeleteService',
    description: deleteServicePrompt,
    parameters: deleteServiceParameters,
    execute: deleteService
  }
];