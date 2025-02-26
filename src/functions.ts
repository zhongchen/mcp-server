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

export async function listControlPlanes(
  args: z.infer<typeof listControlPlaneParameters>
) {
  const params = new URLSearchParams();
  params.append("page[size]", args.pageSize.toString());
  params.append("page[number]", args.pageNumber.toString());
  const url = `https://${
    args.region
  }.api.konghq.com/v2/control-planes?${params.toString()}`;

  try {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to list control planes: ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw error;
  }
}

export async function listServices(
  args: z.infer<typeof listServicesParameters>
) {
  const params = new URLSearchParams();
  params.append("page[size]", args.pageSize.toString());
  params.append("page[number]", args.pageNumber.toString());
  if (args.tags) {
    params.append("tags", args.tags);
  }

  const url = `https://${args.region}.api.konghq.com/v2/control-planes/${args.controlPlaneId}/core-entities/services?${params.toString}`;

  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${konnectToken}`,
      },
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to list services: ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw error;
  }
}
