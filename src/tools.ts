import { z } from "zod";

export interface Tool {
  name: string;
  description: string;
  parameters: z.ZodObject<any, any, any, any>;
  execute: (args: any) => Promise<any>;
}

export const tools: Tool[] = [{
    name: "greet.create",
    description: "Generate a greeting for a given name",
    parameters: z.object({
      name: z.string()
    }),
    execute: async (args: { name: string }) => {
      return { message: `Hello, ${args.name}!` };
    }
  }
];