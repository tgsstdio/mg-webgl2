/// <reference path="Magnesium.ts" />

export interface IMgShaderModule {
	destroyShaderModule(
		device : IMgDevice
		, allocator : IMgAllocationCallbacks|null
	) : void;
}
