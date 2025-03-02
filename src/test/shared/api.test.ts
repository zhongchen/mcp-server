import axios, { AxiosError } from 'axios';
import {
  setKonnectToken,
  getAuthHeaders,
  buildParams,
  makeKonnectRequest
} from '../../shared/api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Create a type-safe mock of isAxiosError
const originalIsAxiosError = axios.isAxiosError;
// @ts-ignore - we're intentionally replacing this function for testing
axios.isAxiosError = jest.fn().mockImplementation((payload): payload is AxiosError => {
  return true; // Always return true for tests
});

describe('Shared API Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore the original function
    // @ts-ignore - we're restoring the original function
    axios.isAxiosError = originalIsAxiosError;
  });

  beforeAll(() => {
    setKonnectToken('test-token');
  });

  describe('getAuthHeaders', () => {
    it('should return correct headers with token', () => {
      const headers = getAuthHeaders();
      expect(headers).toEqual({
        accept: 'application/json',
        Authorization: 'Bearer test-token'
      });
    });

    it('should throw an error if token is not set', () => {
      // Temporarily unset the token
      setKonnectToken(null as any);
      
      expect(() => {
        getAuthHeaders();
      }).toThrow('Konnect token has not been set');
      
      // Reset token for other tests
      setKonnectToken('test-token');
    });
  });

  describe('buildParams', () => {
    it('should convert object to URLSearchParams', () => {
      const params = buildParams({
        foo: 'bar',
        num: 123,
        bool: true
      });
      
      expect(params.toString()).toContain('foo=bar');
      expect(params.toString()).toContain('num=123');
      expect(params.toString()).toContain('bool=true');
    });
  });

  describe('makeKonnectRequest', () => {
    it('should make GET request with correct URL and headers', async () => {
      const mockResponse = {
        data: { items: [{ id: 'test' }] }
      };
      
      mockedAxios.get.mockResolvedValue(mockResponse);
      
      await makeKonnectRequest({
        region: 'us',
        path: '/test-path',
        params: new URLSearchParams(),
        errorPrefix: 'Error'
      });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://us.api.konghq.com/v2/test-path?',
        { headers: expect.any(Object) }
      );
    });

    it('should handle errors properly', async () => {
      const errorMessage = 'API Error';
      
      // Create an error object with the right structure
      const error = new Error('Request failed') as any;
      error.response = { data: { message: errorMessage } };
      
      mockedAxios.get.mockRejectedValue(error);
      
      await expect(makeKonnectRequest({
        region: 'us',
        path: '/error-path',
        params: new URLSearchParams(),
        errorPrefix: 'Test Error'
      })).rejects.toThrow(`Test Error: ${errorMessage}`);
    });
    
    it('should support different API versions', async () => {
      const mockResponse = { data: {} };
      
      mockedAxios.get.mockResolvedValue(mockResponse);
      
      await makeKonnectRequest({
        region: 'us',
        path: '/v1-path',
        params: new URLSearchParams(),
        errorPrefix: 'Error',
        apiVersion: 'v1'
      });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://us.api.konghq.com/v1/v1-path?',
        { headers: expect.any(Object) }
      );
    });
  });
});