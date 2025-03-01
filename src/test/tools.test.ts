import { tools } from '../tools';
import {
  listControlPlanes,
  listServices,
  search,
  searchTypes
} from '../functions';
import {
  listControlPlaneParameters,
  listServicesParameters,
  searchParameters,
  searchTypesParameters
} from '../parameters';
import {
  listControlPlanePrompt,
  listServicesPrompt,
  searchPrompt,
  searchTypesPrompt
} from '../prompts';

// Mock the functions module
jest.mock('../functions');

describe('Tools', () => {
  it('should have the correct number of tools', () => {
    expect(tools.length).toBe(4);
  });

  it('should have ListControlPlanes tool correctly configured', () => {
    const listControlPlanesTool = tools.find(tool => tool.name === 'ListControlPlanes');
    
    expect(listControlPlanesTool).toBeDefined();
    expect(listControlPlanesTool?.description).toBe(listControlPlanePrompt);
    expect(listControlPlanesTool?.parameters).toBe(listControlPlaneParameters);
    expect(listControlPlanesTool?.execute).toBe(listControlPlanes);
  });

  it('should have ListServices tool correctly configured', () => {
    const listServicesTool = tools.find(tool => tool.name === 'ListServices');
    
    expect(listServicesTool).toBeDefined();
    expect(listServicesTool?.description).toBe(listServicesPrompt);
    expect(listServicesTool?.parameters).toBe(listServicesParameters);
    expect(listServicesTool?.execute).toBe(listServices);
  });

  it('should have SearchKonnect tool correctly configured', () => {
    const searchTool = tools.find(tool => tool.name === 'SearchKonnect');
    
    expect(searchTool).toBeDefined();
    expect(searchTool?.description).toBe(searchPrompt);
    expect(searchTool?.parameters).toBe(searchParameters);
    expect(searchTool?.execute).toBe(search);
  });

  it('should have ListSearchTypes tool correctly configured', () => {
    const searchTypesTool = tools.find(tool => tool.name === 'ListSearchTypes');
    
    expect(searchTypesTool).toBeDefined();
    expect(searchTypesTool?.description).toBe(searchTypesPrompt);
    expect(searchTypesTool?.parameters).toBe(searchTypesParameters);
    expect(searchTypesTool?.execute).toBe(searchTypes);
  });
});
