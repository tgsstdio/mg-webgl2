import {IMgDevice}
	from './IMgDevice';	   
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	  

export interface IMgDescriptorSetLayout {
  destroyDescriptorSetLayout(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
