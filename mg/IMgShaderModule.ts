import {IMgDevice}
	from './IMgDevice';	   
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	  

export interface IMgShaderModule {
	destroyShaderModule(
		device : IMgDevice
		, allocator : IMgAllocationCallbacks|null
	) : void;
}
