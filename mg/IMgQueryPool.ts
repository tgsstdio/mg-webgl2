/// <reference path="Magnesium.ts" />

export interface IMgQueryPool{
  destroyQueryPool (device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
