/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgImageView {
		destroyImageView(device : IMgDevice, allocator : IMgAllocationCallbacks|null) : void;
	}
}