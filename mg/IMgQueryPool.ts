/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgQueryPool{
		destroyQueryPool (device: IMgDevice
      , allocator: IMgAllocationCallbacks) : void;
  }
}