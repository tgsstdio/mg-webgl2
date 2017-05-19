/// <reference path="IGLDeviceMemory.ts" />
/// <reference path="../mg/MgMemoryAllocateInfo.ts" />

namespace Magnesium {
  export interface IWGLDeviceMemoryEntrypoint {
    createDeviceMemory(createInfo: MgMemoryAllocateInfo) : IGLDeviceMemory;
  }
}