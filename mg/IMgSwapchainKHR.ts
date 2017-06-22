/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgSwapchainKHR {
		destroySwapchainKHR(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}
