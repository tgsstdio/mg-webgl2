/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgBufferView {
		destroyBufferView(device: IMgDevice
      , allocator: IMgAllocationCallbacks) : void;
	}
}