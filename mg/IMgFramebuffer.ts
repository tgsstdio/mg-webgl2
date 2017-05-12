/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgFramebuffer {
		destroyFramebuffer (device: IMgDevice
      , allocator: IMgAllocationCallbacks) : void;
  }
}