import axios from 'axios';
import {
  listControlPlanes,
  search,
  searchTypes
} from '../../core/functions';
import { setKonnectToken } from '../../shared/api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Make sure we have a token for all tests
beforeAll(() => {
  setKonnectToken('test-token');
});

describe('Core API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
        expect.stringContaining('https://us.api.konghq.com/v2/control-planes'),
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
