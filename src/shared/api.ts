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

export function buildParams(
  params: Record<string, string | number | boolean>
): URLSearchParams {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    urlParams.append(key, String(value));
  });

  return urlParams;
}

export async function makeKonnectRequest<T>(options: {
  region: string;
  path: string;
  params?: URLSearchParams;
  method?: "get" | "post" | "put" | "delete";
  body?: any;
  errorPrefix: string;
  apiVersion?: "v1" | "v2";
}): Promise<{
  content: Array<{ type: "text"; text: string }>;
  data?: any;
}> {
  const { 
    region, 
    path, 
    params = new URLSearchParams(), 
    method = "get", 
    body, 
    errorPrefix, 
    apiVersion = "v2" 
  } = options;
  
  const url = `https://${region}.api.konghq.com/${apiVersion}${path}?${params.toString()}`;

  try {
    let response;
    const headers = getAuthHeaders();

    switch (method) {
      case "get":
        response = await axios.get(url, { headers });
        break;
      case "post":
        response = await axios.post(url, body, { headers });
        break;
      case "put":
        response = await axios.put(url, body, { headers });
        break;
      case "delete":
        response = await axios.delete(url, { 
          headers, 
          data: body  // Allow optional body for delete requests
        });
        break;
      default:
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
      data: response.data
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
