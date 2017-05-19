namespace Magnesium {
  export class WGLDeviceEntrypoint implements IWGLDeviceEntrypoint {
    private mDeviceMemory: IWGLDeviceMemoryEntrypoint;
    private mImage: IWGLDeviceImageEntrypoint;
    constructor(
      deviceMemory: IWGLDeviceMemoryEntrypoint
      , image: IWGLDeviceImageEntrypoint
    ) {
      this.mDeviceMemory = deviceMemory;
      this.mImage = image;
    }

    get deviceMemory() : IWGLDeviceMemoryEntrypoint {
      return this.mDeviceMemory;
    }
    
    get image(): IWGLDeviceImageEntrypoint {
      return this.mImage;
    }
  }
}