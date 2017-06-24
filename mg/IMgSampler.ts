import {IMgDevice}
	from './IMgDevice';	   
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	  

export interface IMgSampler {
  destroySampler (
    device: IMgDevice
    , allocator: IMgAllocationCallbacks|null
  ) : void;
}
