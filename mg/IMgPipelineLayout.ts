import {IMgDevice}
	from './IMgDevice';	
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	

export interface IMgPipelineLayout {
  destroyPipelineLayout(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}

