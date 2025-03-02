import {
  listServices,
  createService,
  getService,
  updateService,
  deleteService
} from './functions';

import {
  listServicesParameters,
  createServiceParameters,
  getServiceParameters,
  updateServiceParameters,
  deleteServiceParameters
} from './parameters';

import {
  listServicesPrompt,
  createServicePrompt,
  getServicePrompt,
  updateServicePrompt,
  deleteServicePrompt
} from './prompts';

import { Tool } from '../tools';

export const serviceTools: Tool[] = [
  {
    name: 'ListServices',
    description: listServicesPrompt,
    parameters: listServicesParameters,
    execute: listServices
  },
  {
    name: 'CreateService',
    description: createServicePrompt,
    parameters: createServiceParameters,
    execute: createService
  },
  {
    name: 'GetService',
    description: getServicePrompt,
    parameters: getServiceParameters,
    execute: getService
  },
  {
    name: 'UpdateService',
    description: updateServicePrompt,
    parameters: updateServiceParameters,
    execute: updateService
  },
  {
    name: 'DeleteService',
    description: deleteServicePrompt,
    parameters: deleteServiceParameters,
    execute: deleteService
  }
];

export {
  listServices,
  createService,
  getService,
  updateService,
  deleteService,
  listServicesParameters,
  createServiceParameters,
  getServiceParameters,
  updateServiceParameters,
  deleteServiceParameters,
  listServicesPrompt,
  createServicePrompt,
  getServicePrompt,
  updateServicePrompt,
  deleteServicePrompt
};
