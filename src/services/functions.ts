import { z } from "zod";
import {
  listServicesParameters,
  createServiceParameters,
  getServiceParameters,
  updateServiceParameters,
  deleteServiceParameters
} from "./parameters";
import axios from "axios";
import { getAuthHeaders, makeKonnectRequest, buildParams } from "../shared/api";

export async function listServices(
  args: z.infer<typeof listServicesParameters>
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
    path: `/control-planes/${args.controlPlaneId}/core-entities/services`,
    params,
    errorPrefix: "Failed to list services",
  });
}

export async function createService(
  args: z.infer<typeof createServiceParameters>
) {
  const url = `https://${args.region}.api.konghq.com/v2/control-planes/${args.controlPlaneId}/core-entities/services`;
  
  try {
    const response = await axios.post(url, args.service, { headers: getAuthHeaders() });
    
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
        `Failed to create service: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}

export async function getService(
  args: z.infer<typeof getServiceParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/services/${args.serviceId}`,
    params: new URLSearchParams(),
    errorPrefix: "Failed to get service",
  });
}

export async function updateService(
  args: z.infer<typeof updateServiceParameters>
) {
  const url = `https://${args.region}.api.konghq.com/v2/control-planes/${args.controlPlaneId}/core-entities/services/${args.serviceId}`;
  
  try {
    const response = await axios.put(url, args.service, { headers: getAuthHeaders() });
    
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
        `Failed to update service: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}

export async function deleteService(
  args: z.infer<typeof deleteServiceParameters>
) {
  const url = `https://${args.region}.api.konghq.com/v2/control-planes/${args.controlPlaneId}/core-entities/services/${args.serviceId}`;
  
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
        `Failed to delete service: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}
