import {
  listConsumers,
  createConsumer,
  getConsumer,
  updateConsumer,
  deleteConsumer
} from './functions';

import {
  listConsumersParameters,
  createConsumerParameters,
  getConsumerParameters,
  updateConsumerParameters,
  deleteConsumerParameters
} from './parameters';

import {
  listConsumersPrompt,
  createConsumerPrompt,
  getConsumerPrompt,
  updateConsumerPrompt,
  deleteConsumerPrompt
} from './prompts';

import { Tool } from '../tools';

export const consumerTools: Tool[] = [
  {
    name: 'ListConsumers',
    description: listConsumersPrompt,
    parameters: listConsumersParameters,
    execute: listConsumers
  },
  {
    name: 'CreateConsumer',
    description: createConsumerPrompt,
    parameters: createConsumerParameters,
    execute: createConsumer
  },
  {
    name: 'GetConsumer',
    description: getConsumerPrompt,
    parameters: getConsumerParameters,
    execute: getConsumer
  },
  {
    name: 'UpdateConsumer',
    description: updateConsumerPrompt,
    parameters: updateConsumerParameters,
    execute: updateConsumer
  },
  {
    name: 'DeleteConsumer',
    description: deleteConsumerPrompt,
    parameters: deleteConsumerParameters,
    execute: deleteConsumer
  }
];

export {
  listConsumers,
  createConsumer,
  getConsumer,
  updateConsumer,
  deleteConsumer,
  listConsumersParameters,
  createConsumerParameters,
  getConsumerParameters,
  updateConsumerParameters,
  deleteConsumerParameters,
  listConsumersPrompt,
  createConsumerPrompt,
  getConsumerPrompt,
  updateConsumerPrompt,
  deleteConsumerPrompt
};
