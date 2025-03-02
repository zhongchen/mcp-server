import { z } from "zod";
import {
  listControlPlaneParameters,
  searchParameters,
  searchTypesParameters
} from "./parameters";
import { buildParams, makeKonnectRequest } from "../shared/api";

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