/// <reference path="IMgAllocationCallbacks.ts" />
/// <reference path="IMgPhysicalDevice.ts" />
/// <reference path="MgResult.ts" />

namespace Magnesium {
  export interface IMgInstance {
		destroyInstance(allocator: IMgAllocationCallbacks | null) : void;
		enumeratePhysicalDevices(out : { physicalDevices: Array<IMgPhysicalDevice> | null} ): MgResult;
  }
}