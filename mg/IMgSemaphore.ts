/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgSemaphore	{
		destroySemaphore (device: IMgDevice
      , allocator: IMgAllocationCallbacks) : void;
	}
}
