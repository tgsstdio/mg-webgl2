/// <reference path="IWGLDeviceMemory.ts" />
/// <reference path="../mg/MgMemoryAllocateInfo.ts" />

namespace Magnesium {
  export interface IWGLDeviceMemoryEntrypoint {
    createDeviceMemory(createInfo: MgMemoryAllocateInfo) : IWGLDeviceMemory;
  }
}