import { z } from "zod";

import { coreTools } from './core';
import { serviceTools } from './services';
import { routeTools } from './routes';
import { consumerTools } from './consumer';
import { basicAuthTools } from './basic-auth';

export interface Tool {
  name: string;
  description: string;
  parameters: z.ZodObject<any, any, any, any>;
  execute: (args: any) => Promise<any>;
}

// Combine all tool groups
export const tools: Tool[] = [
  ...coreTools,
  ...serviceTools,
  ...routeTools,
  ...consumerTools,
  ...basicAuthTools
];