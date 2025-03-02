import axios from 'axios';
import {
  listServices,
  createService,
  getService,
  updateService,
  deleteService
} from '../../services/functions';
import { setKonnectToken } from '../../shared/api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Make sure we have a token for all tests
beforeAll(() => {
  setKonnectToken('test-token');
});

describe('Services API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listServices', () => {
    it('should call axios with correct parameters', async () => {
      const mockResponse = {
        data: { items: [{ id: 'svc-1', name: 'Service 1' }] }
      };
      
      mockedAxios.get.mockResolvedValue(mockResponse);
      
      await listServices({
        controlPlaneId: 'test-cp-id',
        region: 'eu',
        pageSize: 20,
        pageNumber: 2,
        tags: 'prod,api'
      });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://eu.api.konghq.com/v2/control-planes/test-cp-id/core-entities/services'),
        { headers: expect.any(Object) }
      );
    });
  });
  
  describe('createService', () => {
    it('should call axios post with correct parameters', async () => {
      const mockResponse = {
        data: { id: 'svc-new', name: 'New Service' }
      };
      
      mockedAxios.post.mockResolvedValue(mockResponse);
      
      const serviceConfig = {
        name: 'New Service',
        protocol: 'http',
        host: 'example.internal',
        port: 80
      };
      
      await createService({
        controlPlaneId: 'test-cp-id',
        region: 'us',
        service: serviceConfig
      });
      
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://us.api.konghq.com/v2/control-planes/test-cp-id/core-entities/services',
        serviceConfig,
        { headers: expect.any(Object) }
      );
    });
  });
  
  describe('getService', () => {
    it('should call axios with correct parameters', async () => {
      const mockResponse = {
        data: { id: 'svc-1', name: 'Service 1' }
      };
      
      mockedAxios.get.mockResolvedValue(mockResponse);
      
      await getService({
        controlPlaneId: 'test-cp-id',
        region: 'us',
        serviceId: 'svc-1'
      });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://us.api.konghq.com/v2/control-planes/test-cp-id/core-entities/services/svc-1'),
        { headers: expect.any(Object) }
      );
    });
  });
  
  describe('updateService', () => {
    it('should call axios put with correct parameters', async () => {
      const mockResponse = {
        data: { id: 'svc-1', name: 'Updated Service' }
      };
      
      mockedAxios.put.mockResolvedValue(mockResponse);
      
      const serviceUpdates = {
        name: 'Updated Service',
        host: 'new-example.internal'
      };
      
      await updateService({
        controlPlaneId: 'test-cp-id',
        region: 'us',
        serviceId: 'svc-1',
        service: serviceUpdates
      });
      
      expect(mockedAxios.put).toHaveBeenCalledWith(
        'https://us.api.konghq.com/v2/control-planes/test-cp-id/core-entities/services/svc-1',
        serviceUpdates,
        { headers: expect.any(Object) }
      );
    });
  });
  
  describe('deleteService', () => {
    it('should call axios delete with correct parameters', async () => {
      const mockResponse = {
        status: 204,
        data: {}
      };
      
      mockedAxios.delete.mockResolvedValue(mockResponse);
      
      await deleteService({
        controlPlaneId: 'test-cp-id',
        region: 'us',
        serviceId: 'svc-1'
      });
      
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        'https://us.api.konghq.com/v2/control-planes/test-cp-id/core-entities/services/svc-1',
        { headers: expect.any(Object) }
      );
    });
  });
});
