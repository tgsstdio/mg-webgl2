/// <reference path="Magnesium.ts" />

export interface IMgDescriptorPool {
	destroyDescriptorPool(device: IMgDevice
		, allocator: IMgAllocationCallbacks|null) : void;

	resetDescriptorPool(device: IMgDevice, flags: number) : MgResult;
}
