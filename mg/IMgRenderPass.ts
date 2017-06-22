/// <reference path="Magnesium.ts" />

export interface IMgRenderPass {
  destroyRenderPass(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
