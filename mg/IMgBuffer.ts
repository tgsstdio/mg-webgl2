/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgBuffer {
		destroyBuffer(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;

    // WARN: memoryOffset requires UInt64
		bindBufferMemory(device: IMgDevice
      , memory: IMgDeviceMemory
      , memoryOffset: number) : MgResult;
	}
}