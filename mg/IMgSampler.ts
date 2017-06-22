/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgSampler {
		destroySampler (device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
  }
}