import {
  listControlPlaneParameters,
  listServicesParameters,
  searchParameters,
  searchTypesParameters
} from '../parameters';

describe('Parameter Schemas', () => {
  describe('listControlPlaneParameters', () => {
    it('should validate with default values', () => {
      const result = listControlPlaneParameters.parse({});
      expect(result).toEqual({
        region: 'us',
        pageSize: 10,
        pageNumber: 1
      });
    });

    it('should accept valid regions', () => {
      const validRegions = ['us', 'eu', 'au', 'in', 'me'];
      
      validRegions.forEach(region => {
        const result = listControlPlaneParameters.parse({ region });
        expect(result.region).toBe(region);
      });
    });

    it('should reject invalid regions', () => {
      expect(() => {
        listControlPlaneParameters.parse({ region: 'invalid' });
      }).toThrow();
    });

    it('should accept custom page size and number', () => {
      const result = listControlPlaneParameters.parse({
        pageSize: 20,
        pageNumber: 2
      });
      
      expect(result).toEqual({
        region: 'us',
        pageSize: 20,
        pageNumber: 2
      });
    });
  });

  describe('listServicesParameters', () => {
    it('should require controlPlaneId', () => {
      expect(() => {
        listServicesParameters.parse({});
      }).toThrow();
    });

    it('should validate with controlPlaneId and default values', () => {
      const result = listServicesParameters.parse({
        controlPlaneId: 'test-id'
      });
      
      expect(result).toEqual({
        controlPlaneId: 'test-id',
        region: 'us',
        pageSize: 10,
        pageNumber: 1
      });
    });

    it('should accept tags parameter', () => {
      const result = listServicesParameters.parse({
        controlPlaneId: 'test-id',
        tags: 'prod,dev'
      });
      
      expect(result.tags).toBe('prod,dev');
    });
  });

  describe('searchParameters', () => {
    it('should require query parameter', () => {
      expect(() => {
        searchParameters.parse({});
      }).toThrow();
    });

    it('should validate with query and default values', () => {
      const result = searchParameters.parse({
        q: 'test query'
      });
      
      expect(result).toEqual({
        q: 'test query',
        region: 'us',
        pageSize: 10
      });
    });

    it('should accept pageAfter parameter', () => {
      const result = searchParameters.parse({
        q: 'test query',
        pageAfter: 'some-token'
      });
      
      expect(result.pageAfter).toBe('some-token');
    });
  });

  describe('searchTypesParameters', () => {
    it('should validate with default values', () => {
      const result = searchTypesParameters.parse({});
      
      expect(result).toEqual({
        region: 'us'
      });
    });

    it('should accept valid regions', () => {
      const validRegions = ['us', 'eu', 'au', 'in', 'me'];
      
      validRegions.forEach(region => {
        const result = searchTypesParameters.parse({ region });
        expect(result.region).toBe(region);
      });
    });
  });
});
