/// <reference path="IMgAllocationCallbacks.ts" />
/// <reference path="IMgDevice.ts" />

namespace Magnesium {
  export interface IMgFence {
    destroyFence(device : IMgDevice, allocator : IMgAllocationCallbacks) : void;
  }
}