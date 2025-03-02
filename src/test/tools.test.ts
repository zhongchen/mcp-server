import { tools } from '../tools';
import { coreTools } from '../core';
import { serviceTools } from '../services';
import { routeTools } from '../routes';

// Mock modules to isolate the test
jest.mock('../core', () => ({
  coreTools: [
    { name: 'ListControlPlanes' },
    { name: 'SearchKonnect' },
    { name: 'ListSearchTypes' }
  ]
}));

jest.mock('../services', () => ({
  serviceTools: [
    { name: 'ListServices' },
    { name: 'CreateService' },
    { name: 'GetService' },
    { name: 'UpdateService' },
    { name: 'DeleteService' }
  ]
}));

jest.mock('../routes', () => ({
  routeTools: [
    { name: 'ListRoutes' },
    { name: 'CreateRoute' },
    { name: 'GetRoute' },
    { name: 'UpdateRoute' },
    { name: 'DeleteRoute' }
  ]
}));

describe('Tools Configuration', () => {
  it('should include all tools from all modules', () => {
    // Total tools count should be the sum of all modules
    const expectedCount = 
      coreTools.length + 
      serviceTools.length + 
      routeTools.length;
    
    expect(tools.length).toBe(expectedCount);
  });
  
  it('should include all core tools', () => {
    coreTools.forEach(tool => {
      const found = tools.find(t => t.name === tool.name);
      expect(found).toBeDefined();
    });
  });
  
  it('should include all service tools', () => {
    serviceTools.forEach(tool => {
      const found = tools.find(t => t.name === tool.name);
      expect(found).toBeDefined();
    });
  });
  
  it('should include all route tools', () => {
    routeTools.forEach(tool => {
      const found = tools.find(t => t.name === tool.name);
      expect(found).toBeDefined();
    });
  });
});