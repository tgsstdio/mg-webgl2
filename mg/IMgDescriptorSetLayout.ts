/// <reference path="Magnesium.ts" />

export interface IMgDescriptorSetLayout {
  destroyDescriptorSetLayout(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
