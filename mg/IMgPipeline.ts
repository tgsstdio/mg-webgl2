/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgPipeline {
		 destroyPipeline(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}