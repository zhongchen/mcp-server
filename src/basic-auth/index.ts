import {
  listBasicAuth,
  createBasicAuth,
  getBasicAuth,
  updateBasicAuth,
  deleteBasicAuth
} from './functions';

import {
  listBasicAuthParameters,
  createBasicAuthParameters,
  getBasicAuthParameters,
  updateBasicAuthParameters,
  deleteBasicAuthParameters
} from './parameters';

import {
  listBasicAuthPrompt,
  createBasicAuthPrompt,
  getBasicAuthPrompt,
  updateBasicAuthPrompt,
  deleteBasicAuthPrompt
} from './prompts';

import { Tool } from '../tools';

export const basicAuthTools: Tool[] = [
  {
    name: 'ListBasicAuth',
    description: listBasicAuthPrompt,
    parameters: listBasicAuthParameters,
    execute: listBasicAuth
  },
  {
    name: 'CreateBasicAuth',
    description: createBasicAuthPrompt,
    parameters: createBasicAuthParameters,
    execute: createBasicAuth
  },
  {
    name: 'GetBasicAuth',
    description: getBasicAuthPrompt,
    parameters: getBasicAuthParameters,
    execute: getBasicAuth
  },
  {
    name: 'UpdateBasicAuth',
    description: updateBasicAuthPrompt,
    parameters: updateBasicAuthParameters,
    execute: updateBasicAuth
  },
  {
    name: 'DeleteBasicAuth',
    description: deleteBasicAuthPrompt,
    parameters: deleteBasicAuthParameters,
    execute: deleteBasicAuth
  }
];

export {
  listBasicAuth,
  createBasicAuth,
  getBasicAuth,
  updateBasicAuth,
  deleteBasicAuth,
  listBasicAuthParameters,
  createBasicAuthParameters,
  getBasicAuthParameters,
  updateBasicAuthParameters,
  deleteBasicAuthParameters,
  listBasicAuthPrompt,
  createBasicAuthPrompt,
  getBasicAuthPrompt,
  updateBasicAuthPrompt,
  deleteBasicAuthPrompt
};
