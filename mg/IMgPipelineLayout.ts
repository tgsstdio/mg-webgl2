/// <reference path="Magnesium.ts" />

export interface IMgPipelineLayout {
  destroyPipelineLayout(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}

