/// <reference path="IMgAllocationCallbacks.ts" />
/// <reference path="MgDeviceCreateInfo.ts" />
/// <reference path="MgResult.ts" />
/// <reference path="IMgDevice.ts" />

namespace Magnesium {
  export interface IMgPhysicalDevice {
		createDevice(
      pCreateInfo : MgDeviceCreateInfo,
      allocator : IMgAllocationCallbacks,
      out : { pDevice : IMgDevice} ) : MgResult;
  }
}