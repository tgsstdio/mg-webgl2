/// <reference path="Magnesium.ts" />

export interface IMgPipeline {
    destroyPipeline(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
