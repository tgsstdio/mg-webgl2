/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgDescriptorPool {
		destroyDescriptorPool(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;

		resetDescriptorPool(device: IMgDevice, flags: number) : MgResult;
	}
}