/// <reference path="Magnesium.ts" />

export interface IMgSurfaceKHR {
  destroySurfaceKHR(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
