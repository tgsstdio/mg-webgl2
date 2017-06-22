/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgShaderModule {
		destroyShaderModule(device : IMgDevice, allocator : IMgAllocationCallbacks|null) : void;
	}
}