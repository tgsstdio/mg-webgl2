namespace Magnesium {
  export class WGLDeviceMemory implements IGLDeviceMemory {
    freeMemory(device : IMgDevice, allocator : IMgAllocationCallbacks|null) : never
    {
      throw new Error('not implemented');
    }
    // WARN : offset requires UInt64
    // WARN : size requires UInt64
		mapMemory(device : IMgDevice, offset : number, size: number, flags: number, out : { ppData : object } 
    ) : never {
      throw new Error('not implemented');
    }    

		unmapMemory(device : IMgDevice) : never {
      throw new Error('not implemented');
    }    
  }
}