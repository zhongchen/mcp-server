import {
  routeParameters,
  createRouteParameters,
  getRouteParameters,
  updateRouteParameters,
  deleteRouteParameters
} from '../../routes/parameters';

describe('Routes Parameter Schemas', () => {
  describe('routeParameters', () => {
    it('should require controlPlaneId', () => {
      expect(() => {
        routeParameters.parse({});
      }).toThrow();
    });

    it('should validate with controlPlaneId and default values', () => {
      const result = routeParameters.parse({
        controlPlaneId: 'test-id'
      });
      
      expect(result).toEqual({
        controlPlaneId: 'test-id',
        region: 'us',
        pageSize: 10
      });
    });

    it('should accept tags parameter', () => {
      const result = routeParameters.parse({
        controlPlaneId: 'test-id',
        tags: 'prod,dev'
      });
      
      expect(result.tags).toBe('prod,dev');
    });
    
    it('should accept pageOffset parameter', () => {
      const result = routeParameters.parse({
        controlPlaneId: 'test-id',
        pageOffset: 'offset-token'
      });
      
      expect(result.pageOffset).toBe('offset-token');
    });
  });
  
  describe('createRouteParameters', () => {
    it('should require controlPlaneId and route object', () => {
      expect(() => {
        createRouteParameters.parse({});
      }).toThrow();
      
      expect(() => {
        createRouteParameters.parse({
          controlPlaneId: 'test-id'
        });
      }).toThrow();
    });
    
    it('should validate with minimal required fields', () => {
      const result = createRouteParameters.parse({
        controlPlaneId: 'test-id',
        route: {}
      });
      
      expect(result).toEqual({
        controlPlaneId: 'test-id',
        region: 'us',
        route: {}
      });
    });
    
    it('should accept complex route configuration', () => {
      const routeConfig = {
        name: 'test-route',
        protocols: ['http', 'https'],
        hosts: ['example.com'],
        paths: ['/api'],
        service: { id: 'service-id' }
      };
      
      const result = createRouteParameters.parse({
        controlPlaneId: 'test-id',
        route: routeConfig
      });
      
      expect(result.route).toEqual(routeConfig);
    });
  });
  
  describe('getRouteParameters', () => {
    it('should require controlPlaneId and routeId', () => {
      expect(() => {
        getRouteParameters.parse({});
      }).toThrow();
      
      expect(() => {
        getRouteParameters.parse({
          controlPlaneId: 'test-id'
        });
      }).toThrow();
    });
    
    it('should validate with all required fields', () => {
      const result = getRouteParameters.parse({
        controlPlaneId: 'test-id',
        routeId: 'route-id'
      });
      
      expect(result).toEqual({
        controlPlaneId: 'test-id',
        region: 'us',
        routeId: 'route-id'
      });
    });
  });
  
  describe('updateRouteParameters', () => {
    it('should require all necessary fields', () => {
      expect(() => {
        updateRouteParameters.parse({});
      }).toThrow();
      
      expect(() => {
        updateRouteParameters.parse({
          controlPlaneId: 'test-id'
        });
      }).toThrow();
    });
    
    it('should validate with all required fields', () => {
      const result = updateRouteParameters.parse({
        controlPlaneId: 'test-id',
        routeId: 'route-id',
        route: {}
      });
      
      expect(result).toEqual({
        controlPlaneId: 'test-id',
        region: 'us',
        routeId: 'route-id',
        route: {}
      });
    });
  });
  
  describe('deleteRouteParameters', () => {
    it('should require controlPlaneId and routeId', () => {
      expect(() => {
        deleteRouteParameters.parse({});
      }).toThrow();
    });
    
    it('should validate with all required fields', () => {
      const result = deleteRouteParameters.parse({
        controlPlaneId: 'test-id',
        routeId: 'route-id'
      });
      
      expect(result).toEqual({
        controlPlaneId: 'test-id',
        region: 'us',
        routeId: 'route-id'
      });
    });
  });
});
