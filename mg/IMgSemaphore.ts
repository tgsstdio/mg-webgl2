/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgSemaphore	{
		destroySemaphore (device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}
