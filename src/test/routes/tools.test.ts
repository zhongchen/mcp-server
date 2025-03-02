import { routeTools } from '../../routes';
import {
  listRoutes,
  createRoute,
  getRoute,
  updateRoute,
  deleteRoute,
  routeParameters,
  createRouteParameters,
  getRouteParameters,
  updateRouteParameters,
  deleteRouteParameters,
  listRoutesPrompt,
  createRoutePrompt,
  getRoutePrompt,
  updateRoutePrompt,
  deleteRoutePrompt
} from '../../routes';

describe('Route Tools', () => {
  it('should have the correct number of tools', () => {
    expect(routeTools.length).toBe(5);
  });

  it('should have ListRoutes tool correctly configured', () => {
    const listRoutesTool = routeTools.find(tool => tool.name === 'ListRoutes');
    
    expect(listRoutesTool).toBeDefined();
    expect(listRoutesTool?.description).toBe(listRoutesPrompt);
    expect(listRoutesTool?.parameters).toBe(routeParameters);
    expect(listRoutesTool?.execute).toBe(listRoutes);
  });

  it('should have CreateRoute tool correctly configured', () => {
    const createRouteTool = routeTools.find(tool => tool.name === 'CreateRoute');
    
    expect(createRouteTool).toBeDefined();
    expect(createRouteTool?.description).toBe(createRoutePrompt);
    expect(createRouteTool?.parameters).toBe(createRouteParameters);
    expect(createRouteTool?.execute).toBe(createRoute);
  });

  it('should have GetRoute tool correctly configured', () => {
    const getRouteTool = routeTools.find(tool => tool.name === 'GetRoute');
    
    expect(getRouteTool).toBeDefined();
    expect(getRouteTool?.description).toBe(getRoutePrompt);
    expect(getRouteTool?.parameters).toBe(getRouteParameters);
    expect(getRouteTool?.execute).toBe(getRoute);
  });

  it('should have UpdateRoute tool correctly configured', () => {
    const updateRouteTool = routeTools.find(tool => tool.name === 'UpdateRoute');
    
    expect(updateRouteTool).toBeDefined();
    expect(updateRouteTool?.description).toBe(updateRoutePrompt);
    expect(updateRouteTool?.parameters).toBe(updateRouteParameters);
    expect(updateRouteTool?.execute).toBe(updateRoute);
  });

  it('should have DeleteRoute tool correctly configured', () => {
    const deleteRouteTool = routeTools.find(tool => tool.name === 'DeleteRoute');
    
    expect(deleteRouteTool).toBeDefined();
    expect(deleteRouteTool?.description).toBe(deleteRoutePrompt);
    expect(deleteRouteTool?.parameters).toBe(deleteRouteParameters);
    expect(deleteRouteTool?.execute).toBe(deleteRoute);
  });
});