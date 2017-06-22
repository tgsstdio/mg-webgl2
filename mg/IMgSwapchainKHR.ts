/// <reference path="Magnesium.ts" />

export interface IMgSwapchainKHR {
  destroySwapchainKHR(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}

