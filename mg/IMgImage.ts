import {IMgDevice}
	from './IMgDevice';	  
import {IMgDeviceMemory}
	from './IMgDeviceMemory';	  
import {MgResult}
	from './MgResult';	  
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	      

export interface IMgImage {
  // WARN: memoryOffset requires UInt64
  bindImageMemory(device: IMgDevice
    , memory: IMgDeviceMemory
    , memoryOffset: number) : MgResult;		

  destroyImage(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
