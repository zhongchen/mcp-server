import {
  listRoutes,
  createRoute,
  getRoute,
  updateRoute,
  deleteRoute
} from './functions';

import {
  routeParameters,
  createRouteParameters,
  getRouteParameters,
  updateRouteParameters,
  deleteRouteParameters
} from './parameters';

import {
  listRoutesPrompt,
  createRoutePrompt,
  getRoutePrompt,
  updateRoutePrompt,
  deleteRoutePrompt
} from './prompts';

import { Tool } from '../tools';

export const routeTools: Tool[] = [
  {
    name: 'ListRoutes',
    description: listRoutesPrompt,
    parameters: routeParameters,
    execute: listRoutes
  },
  {
    name: 'CreateRoute',
    description: createRoutePrompt,
    parameters: createRouteParameters,
    execute: createRoute
  },
  {
    name: 'GetRoute',
    description: getRoutePrompt,
    parameters: getRouteParameters,
    execute: getRoute
  },
  {
    name: 'UpdateRoute',
    description: updateRoutePrompt,
    parameters: updateRouteParameters,
    execute: updateRoute
  },
  {
    name: 'DeleteRoute',
    description: deleteRoutePrompt,
    parameters: deleteRouteParameters,
    execute: deleteRoute
  }
];

export {
  listRoutes,
  createRoute,
  getRoute,
  updateRoute,
  deleteRoute,
  routeParameters,
  createRouteParameters,
  getRouteParameters,
  updateRouteParameters,
  deleteRouteParameters,
  listRoutesPrompt,
  createRoutePrompt,
  getRoutePrompt,
  updateRoutePrompt,
  deleteRoutePrompt
};