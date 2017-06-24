import {IMgDisposable}
	from './IMgDisposable';	  
import {IMgCommandPool}
	from './IMgCommandPool';
import {IMgDevice}
	from './IMgDevice';	
import {IMgQueue}
	from './IMgQueue';	  
import {IMgPhysicalDevice}
	from './IMgPhysicalDevice';
import {MgMemoryPropertyFlagBits}
	from './MgMemoryPropertyFlagBits';	  

export interface IMgThreadPartition
    extends IMgDisposable {
      
  readonly commandPool: IMgCommandPool;
  readonly device: IMgDevice;
  readonly queue: IMgQueue;
  readonly physicalDevice: IMgPhysicalDevice;

  getMemoryType(
    typeBits: number
    , memoryPropertyFlags: MgMemoryPropertyFlagBits
    , out: { typeIndex: number}) : boolean;
}
