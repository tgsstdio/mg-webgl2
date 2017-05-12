/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgDescriptorPool {
		destroyDescriptorPool(device: IMgDevice
      , allocator: IMgAllocationCallbacks) : void;

		resetDescriptorPool(device: IMgDevice, flags: number) : MgResult;
	}
}