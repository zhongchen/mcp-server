import { z } from "zod";
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
import axios from "axios";

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

async function makeKonnectRequest<T>(options: {
  region: string;
  path: string;
  params: URLSearchParams;
  method?: "get" | "post" | "put" | "delete";
  errorPrefix: string;
  apiVersion?: "v1" | "v2";
}): Promise<{
  content: Array<{ type: "text"; text: string }>;
}> {
  const { region, path, params, method = "get", errorPrefix, apiVersion = "v2" } = options;
  const url = `https://${region}.api.konghq.com/${apiVersion}${path}?${params.toString()}`;

  try {
    let response;
    if (method === "get") {
      response = await axios.get(url, { headers: getAuthHeaders() });
    } else if (method === "post") {
      response = await axios.post(url, {}, { headers: getAuthHeaders() });
    } else if (method === "put") {
      response = await axios.put(url, {}, { headers: getAuthHeaders() });
    } else if (method === "delete") {
      response = await axios.delete(url, { headers: getAuthHeaders() });
    } else {
      throw new Error(`Unsupported HTTP method: ${method}`);
    }

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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `${errorPrefix}: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}

export function buildParams(
  params: Record<string, string | number | boolean>
): URLSearchParams {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    urlParams.append(key, String(value));
  });

  return urlParams;
}

export async function listControlPlanes(
  args: z.infer<typeof listControlPlaneParameters>
) {
  const queryParams = {
    "page[size]": args.pageSize,
    "page[number]": args.pageNumber,
  };

  const params = buildParams(queryParams);

  return makeKonnectRequest({
    region: args.region,
    path: "/control-planes",
    params,
    errorPrefix: "Failed to list control planes",
  });
}

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

export async function search(
  args: z.infer<typeof searchParameters>
) {
  const queryParams: Record<string, string | number | boolean> = {
    q: args.q,
    "page[size]": args.pageSize,
  };

  if (args.pageAfter) {
    queryParams["page[after]"] = args.pageAfter;
  }

  const params = buildParams(queryParams);

  return makeKonnectRequest({
    region: args.region,
    path: "/search",
    params,
    errorPrefix: "Failed to search Konnect",
    apiVersion: "v1"
  });
}

export async function searchTypes(
  args: z.infer<typeof searchTypesParameters>
) {
  const params = new URLSearchParams();

  return makeKonnectRequest({
    region: args.region,
    path: "/search/types",
    params,
    errorPrefix: "Failed to list search types",
    apiVersion: "v1"
  });
}

// Route Operations

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

// Additional Service Operations

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