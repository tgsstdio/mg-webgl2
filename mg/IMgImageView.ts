import {IMgDevice}
	from './IMgDevice';	   
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	  

export interface IMgImageView {
	destroyImageView(
		device : IMgDevice
		, allocator : IMgAllocationCallbacks|null
	) : void;
}
