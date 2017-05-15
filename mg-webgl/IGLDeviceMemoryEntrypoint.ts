/// <reference path="IGLDeviceMemory.ts" />
/// <reference path="../mg/MgMemoryAllocateInfo.ts" />

namespace Magnesium {
  export interface IGLDeviceMemoryEntrypoint {
    createDeviceMemory(createInfo: MgMemoryAllocateInfo) : IGLDeviceMemory;
  }
}