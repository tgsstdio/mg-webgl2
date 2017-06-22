/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgPipelineCache {
		destroyPipelineCache(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}