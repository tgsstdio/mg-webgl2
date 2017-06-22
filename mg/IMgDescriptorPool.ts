/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgDescriptorPool {
		destroyDescriptorPool(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;

		resetDescriptorPool(device: IMgDevice, flags: number) : MgResult;
	}
}