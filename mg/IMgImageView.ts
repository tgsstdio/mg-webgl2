/// <reference path="Magnesium.ts" />

export interface IMgImageView {
	destroyImageView(
		device : IMgDevice
		, allocator : IMgAllocationCallbacks|null
	) : void;
}
