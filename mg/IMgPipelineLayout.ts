/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgPipelineLayout {
		destroyPipelineLayout(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}
