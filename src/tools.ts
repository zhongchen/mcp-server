import { z } from "zod";
import { listControlPlanePrompt } from "./prompts";
import { text } from "stream/consumers";
import axios from "axios";
import { listControlPlaneParameters } from "./parameters";

let konnectToken: string | null = null;

export const setKonnectToken = (token: string) => {
  konnectToken = token;
};

export const getAuthHeaders = () => {
  if (!konnectToken) {
    throw new Error(
      "Konnect token has not been set. Please provide a token via --token option."
    );
  }

  return {
    accept: "application/json",
    Authorization: `Bearer ${konnectToken}`,
  };
};

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
    execute: async (args: z.infer<typeof listControlPlaneParameters>) => {
      const params = new URLSearchParams();
      params.append("page[size]", args.pageSize.toString());
      params.append("page[number]", args.pageNumber.toString());
      const url = `https://${
        args.region
      }.api.konghq.com/v2/control-planes?${params.toString()}`;
      const response = await axios.get(url, {
        headers: getAuthHeaders(),
      });
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(response.data),
          },
          {
            type: "text" as const,
            text: url,
          },
        ],
      };
    },
  },
];
