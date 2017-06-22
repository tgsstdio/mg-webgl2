/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgFramebuffer {
		destroyFramebuffer (device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
  }
}