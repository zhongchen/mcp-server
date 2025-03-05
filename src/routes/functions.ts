import { z } from "zod";
import {
  routeParameters,
  createRouteParameters,
  getRouteParameters,
  updateRouteParameters,
  deleteRouteParameters
} from "./parameters";
import { makeKonnectRequest, buildParams } from "../shared/api";

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
    method: 'get',
    params,
    errorPrefix: "Failed to list routes",
  });
}

export async function createRoute(
  args: z.infer<typeof createRouteParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/routes`,
    method: 'post',
    body: args.route,
    errorPrefix: "Failed to create route",
  });
}

export async function getRoute(
  args: z.infer<typeof getRouteParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/routes/${args.routeId}`,
    method: 'get',
    errorPrefix: "Failed to get route",
  });
}

export async function updateRoute(
  args: z.infer<typeof updateRouteParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/routes/${args.routeId}`,
    method: 'put',
    body: args.route,
    errorPrefix: "Failed to update route",
  });
}

export async function deleteRoute(
  args: z.infer<typeof deleteRouteParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/routes/${args.routeId}`,
    method: 'delete',
    errorPrefix: "Failed to delete route",
  });
}
