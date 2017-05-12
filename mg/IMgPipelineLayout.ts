/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />
namespace Magnesium {
  export interface IMgPipelineLayout {
		destroyPipelineLayout(device: IMgDevice
      , allocator: IMgAllocationCallbacks) : void;
	}
}
