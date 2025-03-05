import { z } from "zod";
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
    method: 'get',
    params,
    errorPrefix: "Failed to list basic-auth credentials",
  });
}

export async function createBasicAuth(
  args: z.infer<typeof createBasicAuthParameters>
) {
  const path = args.consumerId 
    ? `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}/basic-auth`
    : `/control-planes/${args.controlPlaneId}/core-entities/basic-auths`;

  return makeKonnectRequest({
    region: args.region,
    path,
    method: 'post',
    body: args.basicAuth,
    errorPrefix: "Failed to create basic-auth credential",
  });
}

export async function getBasicAuth(
  args: z.infer<typeof getBasicAuthParameters>
) {
  const path = args.consumerId 
    ? `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}/basic-auth/${args.basicAuthId}`
    : `/control-planes/${args.controlPlaneId}/core-entities/basic-auths/${args.basicAuthId}`;

  return makeKonnectRequest({
    region: args.region,
    path,
    method: 'get',
    errorPrefix: "Failed to get basic-auth credential",
  });
}

export async function updateBasicAuth(
  args: z.infer<typeof updateBasicAuthParameters>
) {
  const path = args.consumerId 
    ? `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}/basic-auth/${args.basicAuthId}`
    : `/control-planes/${args.controlPlaneId}/core-entities/basic-auths/${args.basicAuthId}`;

  return makeKonnectRequest({
    region: args.region,
    path,
    method: 'put',
    body: args.basicAuth,
    errorPrefix: "Failed to update basic-auth credential",
  });
}

export async function deleteBasicAuth(
  args: z.infer<typeof deleteBasicAuthParameters>
) {
  const path = args.consumerId 
    ? `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}/basic-auth/${args.basicAuthId}`
    : `/control-planes/${args.controlPlaneId}/core-entities/basic-auths/${args.basicAuthId}`;

  return makeKonnectRequest({
    region: args.region,
    path,
    method: 'delete',
    errorPrefix: "Failed to delete basic-auth credential",
  });
}
