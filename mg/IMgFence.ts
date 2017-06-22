/// <reference path="Magnesium.ts" />

export interface IMgFence {
  destroyFence(device : IMgDevice
  , allocator : IMgAllocationCallbacks|null) : void;
}
