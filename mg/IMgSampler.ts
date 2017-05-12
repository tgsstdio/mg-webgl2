/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgSampler {
		destroySampler (device: IMgDevice
      , allocator: IMgAllocationCallbacks) : void;
  }
}