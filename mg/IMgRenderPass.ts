/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgRenderPass {
		destroyRenderPass(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}