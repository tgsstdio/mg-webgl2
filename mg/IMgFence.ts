/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgFence {
    destroyFence(device : IMgDevice, allocator : IMgAllocationCallbacks|null) : void;
  }
}