/// <reference path="Magnesium.ts" />

export interface IMgImage {
  // WARN: memoryOffset requires UInt64
  bindImageMemory(device: IMgDevice
    , memory: IMgDeviceMemory
    , memoryOffset: number) : MgResult;		

  destroyImage(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
