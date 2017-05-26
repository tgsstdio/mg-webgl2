namespace Magnesium {
  export class WGLDeviceMemoryEntrypoint implements IWGLDeviceMemoryEntrypoint {
    createDeviceMemory(createInfo: MgMemoryAllocateInfo) : IGLDeviceMemory {
      return new WGLDeviceMemory();
    }
  }
}