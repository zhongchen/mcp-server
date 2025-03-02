import axios from 'axios';
import {
  listRoutes,
  createRoute,
  getRoute,
  updateRoute,
  deleteRoute
} from '../../routes/functions';
import { setKonnectToken } from '../../shared/api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Make sure we have a token for all tests
beforeAll(() => {
  setKonnectToken('test-token');
});

describe('Routes API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listRoutes', () => {
    it('should call axios with correct parameters', async () => {
      const mockResponse = {
        data: { items: [{ id: 'rt-1', name: 'Route 1' }] }
      };
      
      mockedAxios.get.mockResolvedValue(mockResponse);
      
      await listRoutes({
        controlPlaneId: 'test-cp-id',
        region: 'eu',
        pageSize: 20,
        tags: 'prod,api'
      });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://eu.api.konghq.com/v2/control-planes/test-cp-id/core-entities/routes'),
        { headers: expect.any(Object) }
      );
    });
  });
  
  describe('createRoute', () => {
    it('should call axios post with correct parameters', async () => {
      const mockResponse = {
        data: { id: 'rt-new', name: 'New Route' }
      };
      
      mockedAxios.post.mockResolvedValue(mockResponse);
      
      const routeConfig = {
        name: 'New Route',
        protocols: ['http', 'https'],
        hosts: ['example.com'],
        paths: ['/api']
      };
      
      await createRoute({
        controlPlaneId: 'test-cp-id',
        region: 'us',
        route: routeConfig
      });
      
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://us.api.konghq.com/v2/control-planes/test-cp-id/core-entities/routes',
        routeConfig,
        { headers: expect.any(Object) }
      );
    });
  });
  
  describe('getRoute', () => {
    it('should call axios with correct parameters', async () => {
      const mockResponse = {
        data: { id: 'rt-1', name: 'Route 1' }
      };
      
      mockedAxios.get.mockResolvedValue(mockResponse);
      
      await getRoute({
        controlPlaneId: 'test-cp-id',
        region: 'us',
        routeId: 'rt-1'
      });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://us.api.konghq.com/v2/control-planes/test-cp-id/core-entities/routes/rt-1'),
        { headers: expect.any(Object) }
      );
    });
  });
  
  describe('updateRoute', () => {
    it('should call axios put with correct parameters', async () => {
      const mockResponse = {
        data: { id: 'rt-1', name: 'Updated Route' }
      };
      
      mockedAxios.put.mockResolvedValue(mockResponse);
      
      const routeUpdates = {
        name: 'Updated Route',
        paths: ['/api/v2']
      };
      
      await updateRoute({
        controlPlaneId: 'test-cp-id',
        region: 'us',
        routeId: 'rt-1',
        route: routeUpdates
      });
      
      expect(mockedAxios.put).toHaveBeenCalledWith(
        'https://us.api.konghq.com/v2/control-planes/test-cp-id/core-entities/routes/rt-1',
        routeUpdates,
        { headers: expect.any(Object) }
      );
    });
  });
  
  describe('deleteRoute', () => {
    it('should call axios delete with correct parameters', async () => {
      const mockResponse = {
        status: 204,
        data: {}
      };
      
      mockedAxios.delete.mockResolvedValue(mockResponse);
      
      await deleteRoute({
        controlPlaneId: 'test-cp-id',
        region: 'us',
        routeId: 'rt-1'
      });
      
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        'https://us.api.konghq.com/v2/control-planes/test-cp-id/core-entities/routes/rt-1',
        { headers: expect.any(Object) }
      );
    });
  });
});
