/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgInstance {
		destroyInstance(allocator: IMgAllocationCallbacks | null) : void;
		enumeratePhysicalDevices(out : { physicalDevices: Array<IMgPhysicalDevice> | null} ): MgResult;
  }
}