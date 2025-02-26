import { z } from "zod";
import {
  listControlPlaneParameters,
  listServicesParameters,
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
}): Promise<{
  content: Array<{ type: "text"; text: string }>;
}> {
  const { region, path, params, method = "get", errorPrefix } = options;
  const url = `https://${region}.api.konghq.com${path}?${params.toString()}`;

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

function buildParams(
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
    path: "/v2/control-planes",
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
    path: `/v2/control-planes/${args.controlPlaneId}/core-entities/services`,
    params,
    errorPrefix: "Failed to list services",
  });
}
