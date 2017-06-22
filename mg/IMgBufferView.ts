/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgBufferView {
		destroyBufferView(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;
	}
}