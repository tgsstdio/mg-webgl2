import {IMgDevice}
	from './IMgDevice';	   
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	

export interface IMgPipeline {
    destroyPipeline(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
