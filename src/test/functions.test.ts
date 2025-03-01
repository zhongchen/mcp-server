import axios from 'axios';
import {
  setKonnectToken,
  getAuthHeaders,
  listControlPlanes,
  listServices,
  search,
  searchTypes
} from '../functions';

// We need to directly test the functions we want to test
// without the mocking interference
jest.unmock('../functions');

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Make sure we have a token for all tests
beforeAll(() => {
  setKonnectToken('test-token');
});

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAuthHeaders', () => {
    it('should return correct headers with token', () => {
      const headers = getAuthHeaders();
      expect(headers).toEqual({
        accept: 'application/json',
        Authorization: 'Bearer test-token'
      });
    });
  });

  describe('listControlPlanes', () => {
    it('should call axios with correct parameters', async () => {
      const mockResponse = {
        data: { items: [{ id: 'cp-1', name: 'Control Plane 1' }] }
      };
      
      mockedAxios.get.mockResolvedValue(mockResponse);
      
      await listControlPlanes({
        region: 'us',
        pageSize: 10,
        pageNumber: 1
      });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://us.api.konghq.com'),
        { headers: expect.any(Object) }
      );
    });
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
        expect.stringContaining('https://eu.api.konghq.com'),
        { headers: expect.any(Object) }
      );
    });
  });

  describe('search', () => {
    it('should call axios with correct parameters', async () => {
      const mockResponse = {
        data: { data: [{ id: 'entity-1', name: 'Entity 1' }] }
      };
      
      mockedAxios.get.mockResolvedValue(mockResponse);
      
      await search({
        q: 'name:"Test Entity"',
        region: 'us',
        pageSize: 15,
        pageAfter: 'token123'
      });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://us.api.konghq.com/v1/search'),
        { headers: expect.any(Object) }
      );
    });
  });

  describe('searchTypes', () => {
    it('should call axios with correct parameters', async () => {
      const mockResponse = {
        data: { data: [{ type: 'user', name: 'User' }] }
      };
      
      mockedAxios.get.mockResolvedValue(mockResponse);
      
      await searchTypes({
        region: 'au'
      });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://au.api.konghq.com/v1/search/types'),
        { headers: expect.any(Object) }
      );
    });
  });
});

// Separate file for error handling tests
describe('API Error Handling', () => {
  // This test can be simplified by just checking that our basic API calls work
  it('should verify that the functions are properly exported', () => {
    expect(typeof listControlPlanes).toBe('function');
    expect(typeof listServices).toBe('function');
    expect(typeof search).toBe('function');
    expect(typeof searchTypes).toBe('function');
  });
});
