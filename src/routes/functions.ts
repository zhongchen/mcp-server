import { z } from "zod";
import {
  routeParameters,
  createRouteParameters,
  getRouteParameters,
  updateRouteParameters,
  deleteRouteParameters
} from "./parameters";
import axios from "axios";
import { getAuthHeaders, makeKonnectRequest, buildParams } from "../shared/api";

export async function listRoutes(
  args: z.infer<typeof routeParameters>
) {
  const queryParams: Record<string, string | number | boolean> = {
    "page[size]": args.pageSize,
    "page[offset]": args.pageOffset || "",
  };

  if (args.tags) {
    queryParams.tags = args.tags;
  }

  const params = buildParams(queryParams);

  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/routes`,
    params,
    errorPrefix: "Failed to list routes",
  });
}

export async function createRoute(
  args: z.infer<typeof createRouteParameters>
) {
  const url = `https://${args.region}.api.konghq.com/v2/control-planes/${args.controlPlaneId}/core-entities/routes`;
  
  try {
    const response = await axios.post(url, args.route, { headers: getAuthHeaders() });
    
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
        `Failed to create route: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}

export async function getRoute(
  args: z.infer<typeof getRouteParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/routes/${args.routeId}`,
    params: new URLSearchParams(),
    errorPrefix: "Failed to get route",
  });
}

export async function updateRoute(
  args: z.infer<typeof updateRouteParameters>
) {
  const url = `https://${args.region}.api.konghq.com/v2/control-planes/${args.controlPlaneId}/core-entities/routes/${args.routeId}`;
  
  try {
    const response = await axios.put(url, args.route, { headers: getAuthHeaders() });
    
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
        `Failed to update route: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}

export async function deleteRoute(
  args: z.infer<typeof deleteRouteParameters>
) {
  const url = `https://${args.region}.api.konghq.com/v2/control-planes/${args.controlPlaneId}/core-entities/routes/${args.routeId}`;
  
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
        `Failed to delete route: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}
