namespace Magnesium {
  export class WGLDescriptorPool
    implements IWGLDescriptorPool {

    private mMaxSets: number;
    get maxSets(): number {
      return this.maxSets;
    }

    private mAvailableSets: Map<number, IWGLDescriptorSet>;
    private mAllocatedSets: Map<number, IWGLDescriptorSet>;
    get allocatedSets(): Map<number, IWGLDescriptorSet> {
      return this.mAllocatedSets;
    }

    constructor(
      createInfo: MgDescriptorPoolCreateInfo
      , entrypoint: IGLImageDescriptorEntrypoint
    ) {
      this.mMaxSets = createInfo.maxSets;
      this.mAvailableSets = new Map<number, IWGLDescriptorSet>();

      let parent : IWGLDescriptorPool = this;
      for (let i = 0; i <= this.mMaxSets; i += 1) {
        
        let temp = new WGLDescriptorSet(i, parent);
        this.mAvailableSets.set(i, temp);
      }

      let noOfUniformBlocks = 0;
      let noOfStorageBuffers = 0;
      let noOfCombinedImageSamplers = 0;

      for (let pool of createInfo.poolSizes) {
          switch(pool.type) {
            case MgDescriptorType.UNIFORM_BUFFER:
            case MgDescriptorType.UNIFORM_BUFFER_DYNAMIC:
              noOfUniformBlocks += pool.descriptorCount;
              break;
            case MgDescriptorType.STORAGE_BUFFER:
            case MgDescriptorType.STORAGE_BUFFER_DYNAMIC:
              noOfStorageBuffers += pool.descriptorCount;
              break;
					case MgDescriptorType.COMBINED_IMAGE_SAMPLER:
						  noOfCombinedImageSamplers += pool.descriptorCount;
						  break;                        
          }
      }

      this.setupCombinedImageSamplers(entrypoint, noOfCombinedImageSamplers);
      this.setupUniformBlocks(noOfUniformBlocks);
      this.setupStorageBuffers(noOfStorageBuffers);
    }

    private setupCombinedImageSamplers() : void {

    }

    private mUniformBuffers: WGLDescriptorPoolResource<GLBufferDescriptor>;
    private setupUniformBlocks(noOfUniformBlocks: number) : void {
      let blocks = new Array<GLBufferDescriptor>(noOfUniformBlocks);
      for (let i = 0; i < noOfUniformBlocks; i += 1) {
        blocks[i] = new GLBufferDescriptor();
      }

    }

    readonly combinedImageSamplers: IGLDescriptorPoolResource<GLImageDescriptor>;
    readonly uniformBuffers: IGLDescriptorPoolResource<GLBufferDescriptor>;
    readonly storageBuffers: IGLDescriptorPoolResource<GLBufferDescriptor>;

		resetResource(resource: GLDescriptorPoolResourceInfo) : void;

		tryTake(out: {result: IWGLDescriptorSet|null } ) : boolean;
  }
}