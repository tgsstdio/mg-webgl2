/// <reference path="IMgDevice.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />
/// <reference path="MgCommandPoolResetFlagBits.ts" />

namespace Magnesium {
  export interface IMgCommandPool	{
		destroyCommandPool(device: IMgDevice
      , allocator: IMgAllocationCallbacks) : void;

		resetCommandPool(device: IMgDevice
    , flags: MgCommandPoolResetFlagBits) : MgResult;
	}
}