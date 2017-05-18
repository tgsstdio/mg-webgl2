/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgImageView {
		destroyImageView(device : IMgDevice, allocator : IMgAllocationCallbacks|null) : void;
	}
}