namespace Magnesium {
  export class WGLDescriptorPoolEntrypoint implements IWGLDescriptorPoolEntrypoint {
    private mEntrypoint: IWGLImageDescriptorEntrypoint;
    constructor(
      entrypoint: IWGLImageDescriptorEntrypoint
    ) {
      this.mEntrypoint = entrypoint;
    }
    
    createPool(
      createInfo: MgDescriptorPoolCreateInfo
    ) : IWGLDescriptorPool {
      return new WGLDescriptorPool(createInfo, this.mEntrypoint);
    }
  }
}