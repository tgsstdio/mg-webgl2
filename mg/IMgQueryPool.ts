import {IMgDevice}
	from './IMgDevice';	   
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	

export interface IMgQueryPool{
  destroyQueryPool (device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
