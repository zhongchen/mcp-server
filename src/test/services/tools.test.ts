import { serviceTools } from '../../services';
import {
  listServices,
  createService,
  getService,
  updateService,
  deleteService,
  listServicesParameters,
  createServiceParameters,
  getServiceParameters,
  updateServiceParameters,
  deleteServiceParameters,
  listServicesPrompt,
  createServicePrompt,
  getServicePrompt,
  updateServicePrompt,
  deleteServicePrompt
} from '../../services';

describe('Service Tools', () => {
  it('should have the correct number of tools', () => {
    expect(serviceTools.length).toBe(5);
  });

  it('should have ListServices tool correctly configured', () => {
    const listServicesTool = serviceTools.find(tool => tool.name === 'ListServices');
    
    expect(listServicesTool).toBeDefined();
    expect(listServicesTool?.description).toBe(listServicesPrompt);
    expect(listServicesTool?.parameters).toBe(listServicesParameters);
    expect(listServicesTool?.execute).toBe(listServices);
  });

  it('should have CreateService tool correctly configured', () => {
    const createServiceTool = serviceTools.find(tool => tool.name === 'CreateService');
    
    expect(createServiceTool).toBeDefined();
    expect(createServiceTool?.description).toBe(createServicePrompt);
    expect(createServiceTool?.parameters).toBe(createServiceParameters);
    expect(createServiceTool?.execute).toBe(createService);
  });

  it('should have GetService tool correctly configured', () => {
    const getServiceTool = serviceTools.find(tool => tool.name === 'GetService');
    
    expect(getServiceTool).toBeDefined();
    expect(getServiceTool?.description).toBe(getServicePrompt);
    expect(getServiceTool?.parameters).toBe(getServiceParameters);
    expect(getServiceTool?.execute).toBe(getService);
  });

  it('should have UpdateService tool correctly configured', () => {
    const updateServiceTool = serviceTools.find(tool => tool.name === 'UpdateService');
    
    expect(updateServiceTool).toBeDefined();
    expect(updateServiceTool?.description).toBe(updateServicePrompt);
    expect(updateServiceTool?.parameters).toBe(updateServiceParameters);
    expect(updateServiceTool?.execute).toBe(updateService);
  });

  it('should have DeleteService tool correctly configured', () => {
    const deleteServiceTool = serviceTools.find(tool => tool.name === 'DeleteService');
    
    expect(deleteServiceTool).toBeDefined();
    expect(deleteServiceTool?.description).toBe(deleteServicePrompt);
    expect(deleteServiceTool?.parameters).toBe(deleteServiceParameters);
    expect(deleteServiceTool?.execute).toBe(deleteService);
  });
});