/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgCommandPool	{
		destroyCommandPool(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null) : void;

		resetCommandPool(device: IMgDevice
    , flags: MgCommandPoolResetFlagBits) : MgResult;
	}
}