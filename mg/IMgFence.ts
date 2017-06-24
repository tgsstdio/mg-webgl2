import {IMgDevice}
	from './IMgDevice';	   
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	 

export interface IMgFence {
  destroyFence(device : IMgDevice
  , allocator : IMgAllocationCallbacks|null) : void;
}
