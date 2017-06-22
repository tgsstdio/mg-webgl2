/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgQueryPool{
		destroyQueryPool (device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
  }
}