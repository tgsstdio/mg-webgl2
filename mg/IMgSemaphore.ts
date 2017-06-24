import {IMgDevice}
	from './IMgDevice';	   
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	  

export interface IMgSemaphore	{
  destroySemaphore (device: IMgDevice
    , allocator: IMgAllocationCallbacks|null
  ) : void;
}

