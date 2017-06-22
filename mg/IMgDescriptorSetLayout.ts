/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgDescriptorSetLayout {
		destroyDescriptorSetLayout(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}