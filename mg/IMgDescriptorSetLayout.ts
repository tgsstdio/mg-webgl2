/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgDescriptorSetLayout {
		destroyDescriptorSetLayout(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}