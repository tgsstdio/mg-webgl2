/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgShaderModule {
		destroyShaderModule(device : IMgDevice, allocator : IMgAllocationCallbacks|null) : void;
	}
}