/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgPipelineCache {
		destroyPipelineCache(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}