namespace Magnesium {
  export class WGLDeviceMemoryEntrypoint implements IWGLDeviceMemoryEntrypoint {
    createDeviceMemory(createInfo: MgMemoryAllocateInfo) : IWGLDeviceMemory {
      return new WGLDeviceMemory();
    }
  }
}