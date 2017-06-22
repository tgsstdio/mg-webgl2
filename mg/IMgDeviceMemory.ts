/// <reference path="Magnesium.ts" />

export interface IMgDeviceMemory {
  freeMemory(
    device : IMgDevice
    , allocator : IMgAllocationCallbacks|null
  ) : void;
  // WARN : offset requires UInt64
  // WARN : size requires UInt64
  mapMemory(
    device : IMgDevice
    , offset : number
    , size: number
    , flags: number
    , out : { ppData : Uint8Array|null }
  ) : MgResult;
  
  unmapMemory(device : IMgDevice) : void;
}
