/// <reference path="IMgAllocationCallbacks.ts" />
/// <reference path="IMgDevice.ts" />

namespace Magnesium {
  export interface IMgPipeline {
		 destroyPipeline(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}