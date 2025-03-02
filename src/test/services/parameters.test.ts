import {
  listServicesParameters,
  createServiceParameters,
  getServiceParameters,
  updateServiceParameters,
  deleteServiceParameters
} from '../../services/parameters';

describe('Services Parameter Schemas', () => {
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
  
  describe('createServiceParameters', () => {
    it('should require controlPlaneId and service with host', () => {
      expect(() => {
        createServiceParameters.parse({});
      }).toThrow();
      
      expect(() => {
        createServiceParameters.parse({
          controlPlaneId: 'test-id',
          service: {}
        });
      }).toThrow();
    });
    
    it('should validate with required fields and default values', () => {
      const result = createServiceParameters.parse({
        controlPlaneId: 'test-id',
        service: {
          host: 'example.com'
        }
      });
      
      expect(result).toEqual({
        controlPlaneId: 'test-id',
        region: 'us',
        service: {
          host: 'example.com'
        }
      });
    });
  });
  
  describe('getServiceParameters', () => {
    it('should require controlPlaneId and serviceId', () => {
      expect(() => {
        getServiceParameters.parse({});
      }).toThrow();
      
      expect(() => {
        getServiceParameters.parse({
          controlPlaneId: 'test-id'
        });
      }).toThrow();
    });
    
    it('should validate with all required fields', () => {
      const result = getServiceParameters.parse({
        controlPlaneId: 'test-id',
        serviceId: 'service-id'
      });
      
      expect(result).toEqual({
        controlPlaneId: 'test-id',
        region: 'us',
        serviceId: 'service-id'
      });
    });
  });
  
  describe('updateServiceParameters', () => {
    it('should require all necessary fields', () => {
      expect(() => {
        updateServiceParameters.parse({});
      }).toThrow();
      
      expect(() => {
        updateServiceParameters.parse({
          controlPlaneId: 'test-id'
        });
      }).toThrow();
    });
    
    it('should validate with all required fields', () => {
      const result = updateServiceParameters.parse({
        controlPlaneId: 'test-id',
        serviceId: 'service-id',
        service: {
          name: 'Updated Service'
        }
      });
      
      expect(result).toEqual({
        controlPlaneId: 'test-id',
        region: 'us',
        serviceId: 'service-id',
        service: {
          name: 'Updated Service'
        }
      });
    });
  });
  
  describe('deleteServiceParameters', () => {
    it('should require controlPlaneId and serviceId', () => {
      expect(() => {
        deleteServiceParameters.parse({});
      }).toThrow();
    });
    
    it('should validate with all required fields', () => {
      const result = deleteServiceParameters.parse({
        controlPlaneId: 'test-id',
        serviceId: 'service-id'
      });
      
      expect(result).toEqual({
        controlPlaneId: 'test-id',
        region: 'us',
        serviceId: 'service-id'
      });
    });
  });
});
