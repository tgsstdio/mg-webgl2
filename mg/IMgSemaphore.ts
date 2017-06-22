/// <reference path="Magnesium.ts" />

export interface IMgSemaphore	{
  destroySemaphore (device: IMgDevice
    , allocator: IMgAllocationCallbacks|null
  ) : void;
}

