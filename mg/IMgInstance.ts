import {MgResult}
	from './MgResult';	  
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';
import {IMgPhysicalDevice}
	from './IMgPhysicalDevice';	  

export interface IMgInstance {
  destroyInstance(
    allocator: IMgAllocationCallbacks | null
  ) : void;
  enumeratePhysicalDevices(
    out : { physicalDevices: Array<IMgPhysicalDevice> | null}
  ): MgResult;
}
