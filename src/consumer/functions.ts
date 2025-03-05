import { z } from "zod";
import {
  listConsumersParameters,
  createConsumerParameters,
  getConsumerParameters,
  updateConsumerParameters,
  deleteConsumerParameters
} from "./parameters";
import { makeKonnectRequest, buildParams } from "../shared/api";

export async function listConsumers(
  args: z.infer<typeof listConsumersParameters>
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
    path: `/control-planes/${args.controlPlaneId}/core-entities/consumers`,
    method: 'get',
    params,
    errorPrefix: "Failed to list consumers",
  });
}

export async function createConsumer(
  args: z.infer<typeof createConsumerParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/consumers`,
    method: 'post',
    body: args.consumer,
    errorPrefix: "Failed to create consumer",
  });
}

export async function getConsumer(
  args: z.infer<typeof getConsumerParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}`,
    method: 'get',
    errorPrefix: "Failed to get consumer",
  });
}

export async function updateConsumer(
  args: z.infer<typeof updateConsumerParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}`,
    method: 'put',
    body: args.consumer,
    errorPrefix: "Failed to update consumer",
  });
}

export async function deleteConsumer(
  args: z.infer<typeof deleteConsumerParameters>
) {
  return makeKonnectRequest({
    region: args.region,
    path: `/control-planes/${args.controlPlaneId}/core-entities/consumers/${args.consumerId}`,
    method: 'delete',
    errorPrefix: "Failed to delete consumer",
  });
}
