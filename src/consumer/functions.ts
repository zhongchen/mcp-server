import { z } from "zod";
import axios from "axios";
import {
  listConsumersParameters,
  createConsumerParameters,
  getConsumerParameters,
  updateConsumerParameters,
  deleteConsumerParameters
} from "./parameters";
import { getAuthHeaders, makeKonnectRequest, buildParams } from "../shared/api";

export async function listConsumers(
  args: z.infer<typeof listConsumersParameters>
) {
  const queryParams: Record<string, string | number | boolean> = {
    "page[size]": args.pageSize,
    "page[number]": args.pageNumber,
  };

  if (args.tags) {
    queryParams.tags = args.tags;
  }

  const params = buildParams(queryParams);

  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/consumers`,
    params,
    errorPrefix: "Failed to list consumers",
  });
}

export async function createConsumer(
  args: z.infer<typeof createConsumerParameters>
) {
  const url = `https://${args.region}.api.konghq.com/v2/control-planes/${args.controlPlaneId}/core-entities/consumers`;
  
  try {
    const response = await axios.post(url, args.consumer, { headers: getAuthHeaders() });
    
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
        `Failed to create consumer: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}

export async function getConsumer(
  args: z.infer<typeof getConsumerParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}`,
    params: new URLSearchParams(),
    errorPrefix: "Failed to get consumer",
  });
}

export async function updateConsumer(
  args: z.infer<typeof updateConsumerParameters>
) {
  const url = `https://${args.region}.api.konghq.com/v2/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}`;
  
  try {
    const response = await axios.put(url, args.consumer, { headers: getAuthHeaders() });
    
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
        `Failed to update consumer: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}

export async function deleteConsumer(
  args: z.infer<typeof deleteConsumerParameters>
) {
  const url = `https://${args.region}.api.konghq.com/v2/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}`;
  
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
        `Failed to delete consumer: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}
