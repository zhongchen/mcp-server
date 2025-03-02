import {
  listControlPlaneParameters,
  searchParameters,
  searchTypesParameters
} from '../../core/parameters';

describe('Core Parameter Schemas', () => {
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
