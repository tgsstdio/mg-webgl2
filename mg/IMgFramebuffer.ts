import {IMgDevice}
	from './IMgDevice';	   
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';

export interface IMgFramebuffer {
  destroyFramebuffer (device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
