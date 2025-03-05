import { z } from "zod";
import {
  listServicesParameters,
  createServiceParameters,
  getServiceParameters,
  updateServiceParameters,
  deleteServiceParameters
} from "./parameters";
import { makeKonnectRequest, buildParams } from "../shared/api";

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
    method: 'get',
    params,
    errorPrefix: "Failed to list services",
  });
}

export async function createService(
  args: z.infer<typeof createServiceParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/services`,
    method: 'post',
    body: args.service,
    errorPrefix: "Failed to create service",
  });
}

export async function getService(
  args: z.infer<typeof getServiceParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/services/${args.serviceId}`,
    method: 'get',
    errorPrefix: "Failed to get service",
  });
}

export async function updateService(
  args: z.infer<typeof updateServiceParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/services/${args.serviceId}`,
    method: 'put',
    body: args.service,
    errorPrefix: "Failed to update service",
  });
}

export async function deleteService(
  args: z.infer<typeof deleteServiceParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/services/${args.serviceId}`,
    method: 'delete',
    errorPrefix: "Failed to delete service",
  });
}
