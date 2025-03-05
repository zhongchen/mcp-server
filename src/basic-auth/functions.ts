import { z } from "zod";
import axios from "axios";
import {
  listBasicAuthParameters,
  createBasicAuthParameters,
  getBasicAuthParameters,
  updateBasicAuthParameters,
  deleteBasicAuthParameters
} from "./parameters";
import { getAuthHeaders, makeKonnectRequest, buildParams } from "../shared/api";

export async function listBasicAuth(
  args: z.infer<typeof listBasicAuthParameters>
) {
  const queryParams: Record<string, string | number | boolean> = {
    "page[size]": args.pageSize,
    "page[number]": args.pageNumber,
  };

  if (args.tags) {
    queryParams.tags = args.tags;
  }

  const params = buildParams(queryParams);
  const path = args.consumerId 
    ? `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}/basic-auth`
    : `/control-planes/${args.controlPlaneId}/core-entities/basic-auths`;

  return makeKonnectRequest({
    region: args.region,
    path,
    params,
    errorPrefix: "Failed to list basic-auth credentials",
  });
}

export async function createBasicAuth(
  args: z.infer<typeof createBasicAuthParameters>
) {
  const consumerPath = args.consumerId 
    ? `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}/basic-auth`
    : `/control-planes/${args.controlPlaneId}/core-entities/basic-auths`;

  const url = `https://${args.region}.api.konghq.com/v2${consumerPath}`;
  
  try {
    const response = await axios.post(url, args.basicAuth, { headers: getAuthHeaders() });
    
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(response.data),
        },
      ],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to create basic-auth credential: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}

export async function getBasicAuth(
  args: z.infer<typeof getBasicAuthParameters>
) {
  const consumerPath = args.consumerId 
    ? `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}/basic-auth/${args.basicAuthId}`
    : `/control-planes/${args.controlPlaneId}/core-entities/basic-auths/${args.basicAuthId}`;

  return makeKonnectRequest({
    region: args.region,
    path: consumerPath,
    params: new URLSearchParams(),
    errorPrefix: "Failed to get basic-auth credential",
  });
}

export async function updateBasicAuth(
  args: z.infer<typeof updateBasicAuthParameters>
) {
  const consumerPath = args.consumerId 
    ? `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}/basic-auth/${args.basicAuthId}`
    : `/control-planes/${args.controlPlaneId}/core-entities/basic-auths/${args.basicAuthId}`;

  const url = `https://${args.region}.api.konghq.com/v2${consumerPath}`;
  
  try {
    const response = await axios.put(url, args.basicAuth, { headers: getAuthHeaders() });
    
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(response.data),
        },
      ],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to update basic-auth credential: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}

export async function deleteBasicAuth(
  args: z.infer<typeof deleteBasicAuthParameters>
) {
  const consumerPath = args.consumerId 
    ? `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}/basic-auth/${args.basicAuthId}`
    : `/control-planes/${args.controlPlaneId}/core-entities/basic-auths/${args.basicAuthId}`;

  const url = `https://${args.region}.api.konghq.com/v2${consumerPath}`;
  
  try {
    const response = await axios.delete(url, { headers: getAuthHeaders() });
    
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(response.status === 204 ? { success: true } : response.data),
        },
      ],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to delete basic-auth credential: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}
