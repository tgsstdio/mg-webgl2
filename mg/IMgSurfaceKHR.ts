/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgSurfaceKHR {
		destroySurfaceKHR(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}