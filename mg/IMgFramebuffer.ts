/// <reference path="Magnesium.ts" />

export interface IMgFramebuffer {
  destroyFramebuffer (device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
