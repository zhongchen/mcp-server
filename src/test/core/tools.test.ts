import { coreTools } from '../../core';
import {
  listControlPlanes,
  search,
  searchTypes,
  listControlPlaneParameters,
  searchParameters,
  searchTypesParameters,
  listControlPlanePrompt,
  searchPrompt,
  searchTypesPrompt
} from '../../core';

describe('Core Tools', () => {
  it('should have the correct number of tools', () => {
    expect(coreTools.length).toBe(3);
  });

  it('should have ListControlPlanes tool correctly configured', () => {
    const listControlPlanesTool = coreTools.find(tool => tool.name === 'ListControlPlanes');
    
    expect(listControlPlanesTool).toBeDefined();
    expect(listControlPlanesTool?.description).toBe(listControlPlanePrompt);
    expect(listControlPlanesTool?.parameters).toBe(listControlPlaneParameters);
    expect(listControlPlanesTool?.execute).toBe(listControlPlanes);
  });

  it('should have SearchKonnect tool correctly configured', () => {
    const searchTool = coreTools.find(tool => tool.name === 'SearchKonnect');
    
    expect(searchTool).toBeDefined();
    expect(searchTool?.description).toBe(searchPrompt);
    expect(searchTool?.parameters).toBe(searchParameters);
    expect(searchTool?.execute).toBe(search);
  });

  it('should have ListSearchTypes tool correctly configured', () => {
    const searchTypesTool = coreTools.find(tool => tool.name === 'ListSearchTypes');
    
    expect(searchTypesTool).toBeDefined();
    expect(searchTypesTool?.description).toBe(searchTypesPrompt);
    expect(searchTypesTool?.parameters).toBe(searchTypesParameters);
    expect(searchTypesTool?.execute).toBe(searchTypes);
  });
});