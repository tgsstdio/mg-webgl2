/// <reference path="Magnesium.ts" />

export interface IMgInstance {
  destroyInstance(
    allocator: IMgAllocationCallbacks | null
  ) : void;
  enumeratePhysicalDevices(
    out : { physicalDevices: Array<IMgPhysicalDevice> | null}
  ): MgResult;
}
