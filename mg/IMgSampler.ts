/// <reference path="Magnesium.ts" />

export interface IMgSampler {
  destroySampler (
    device: IMgDevice
    , allocator: IMgAllocationCallbacks|null
  ) : void;
}
