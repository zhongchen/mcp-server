import {
  listControlPlanes,
  search,
  searchTypes
} from './functions';

import {
  listControlPlaneParameters,
  searchParameters,
  searchTypesParameters
} from './parameters';

import {
  listControlPlanePrompt,
  searchPrompt,
  searchTypesPrompt
} from './prompts';

import { Tool } from '../tools';

export const coreTools: Tool[] = [
  {
    name: "ListControlPlanes",
    description: listControlPlanePrompt,
    parameters: listControlPlaneParameters,
    execute: listControlPlanes,
  },
  {
    name: 'SearchKonnect',
    description: searchPrompt,
    parameters: searchParameters,
    execute: search
  },
  {
    name: 'ListSearchTypes',
    description: searchTypesPrompt,
    parameters: searchTypesParameters,
    execute: searchTypes
  }
];

export {
  listControlPlanes,
  search,
  searchTypes,
  listControlPlaneParameters,
  searchParameters,
  searchTypesParameters,
  listControlPlanePrompt,
  searchPrompt,
  searchTypesPrompt
};