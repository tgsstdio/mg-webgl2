/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgRenderPass {
		destroyRenderPass(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}