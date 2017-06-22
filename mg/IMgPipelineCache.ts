/// <reference path="Magnesium.ts" />

export interface IMgPipelineCache {
  destroyPipelineCache(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
