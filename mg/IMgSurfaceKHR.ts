/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgSurfaceKHR {
		destroySurfaceKHR(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}