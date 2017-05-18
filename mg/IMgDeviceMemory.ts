/// <reference path="MgResult.ts" />
/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgDeviceMemory {
    freeMemory(device : IMgDevice, allocator : IMgAllocationCallbacks|null) : void;
    // WARN : offset requires UInt64
    // WARN : size requires UInt64
		mapMemory(device : IMgDevice, offset : number, size: number, flags: number, out : { ppData : object } ) : MgResult;
		unmapMemory(device : IMgDevice) : void;
  }
}