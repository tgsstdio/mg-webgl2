import {IMgDevice}
	from './IMgDevice';	  
import {MgResult}
	from './MgResult';	  
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	

export interface IMgDescriptorPool {
	destroyDescriptorPool(device: IMgDevice
		, allocator: IMgAllocationCallbacks|null) : void;

	resetDescriptorPool(device: IMgDevice, flags: number) : MgResult;
}
