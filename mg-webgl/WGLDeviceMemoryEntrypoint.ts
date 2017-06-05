namespace Magnesium {
  export class WGLDeviceMemoryEntrypoint implements IWGLDeviceMemoryEntrypoint {
    private mGL: WebGL2RenderingContext;
    private mDeviceMemoryMap: IWGLDeviceMemoryTypeMap;
    constructor(
      gl: WebGL2RenderingContext
      , deviceMemoryMap: IWGLDeviceMemoryTypeMap
    ) {
      this.mGL = gl;
      this.mDeviceMemoryMap = deviceMemoryMap;
    }

    createDeviceMemory(createInfo: MgMemoryAllocateInfo) : IWGLDeviceMemory {
      return new WGLDeviceMemory(
        this.mGL
        , createInfo
        , this.mDeviceMemoryMap
      );
    }
  }
}