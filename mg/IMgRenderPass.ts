import {IMgDevice}
	from './IMgDevice';	   
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	  

export interface IMgRenderPass {
  destroyRenderPass(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
