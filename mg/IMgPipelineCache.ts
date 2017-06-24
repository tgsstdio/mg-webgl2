import {IMgDevice}
	from './IMgDevice';	   
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';
  
export interface IMgPipelineCache {
  destroyPipelineCache(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
