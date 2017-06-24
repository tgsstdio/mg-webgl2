import {IMgDevice}
	from './IMgDevice';	   
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	  

export interface IMgSurfaceKHR {
  destroySurfaceKHR(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
