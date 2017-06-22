/// <reference path="Magnesium.ts" />

export interface IMgCommandPool	{
  destroyCommandPool(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;

  resetCommandPool(device: IMgDevice
  , flags: MgCommandPoolResetFlagBits) : MgResult;
}
