namespace Magnesium {
  export class WGLDescriptorPool implements IWGLDescriptorPool {
    private mMaxSets: number;
    get maxSets(): number {
      return this.maxSets;
    }

    private mAvailableSets: Array<IWGLDescriptorSet>;
    private mAllocatedSets: Map<number, IWGLDescriptorSet>;
    get allocatedSets(): Map<number, IWGLDescriptorSet> {
      return this.mAllocatedSets;
    }

    constructor(
      createInfo: MgDescriptorPoolCreateInfo
      , entrypoint: IGLImageDescriptorEntrypoint
    ) {
      this.mMaxSets = createInfo.maxSets;
      this.mAvailableSets = new Array<IWGLDescriptorSet>();

      for (let i = 0; i <= this.mMaxSets; i += 1) {        
        let temp = new WGLDescriptorSet(i, this as IWGLDescriptorPool);
        this.mAvailableSets.push(temp);
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

		destroyDescriptorPool(
      device: IMgDevice
      , allocator: IMgAllocationCallbacks|null
    ) : void {

    }

		resetDescriptorPool(
      device: IMgDevice
      , flags: number
    ) : MgResult {
			for (let dSet of this.mAllocatedSets.values()) {
				if (dSet != null && dSet.isValidDescriptorSet) {
					for (let resource of dSet.resources) {
						this.resetResource(resource);
					}
					dSet.invalidate();
				}
			}
			return MgResult.SUCCESS;
    }

    private mStorageBuffers: WGLDescriptorPoolResource<GLBufferDescriptor>;
		private setupStorageBuffers(noOfStorageBuffers: number): void {
			let buffers = new Array<GLBufferDescriptor>(noOfStorageBuffers);
			for (let i = 0; i < noOfStorageBuffers; i += 1) {
				buffers[i] = new GLBufferDescriptor();
			}

			this.mStorageBuffers = new WGLDescriptorPoolResource<GLBufferDescriptor>(
				noOfStorageBuffers
        ,	buffers);
		}

    private mCombinedImageSamplers: WGLDescriptorPoolResource<GLImageDescriptor>;
    private setupCombinedImageSamplers(
      entrypoint: IGLImageDescriptorEntrypoint
      , noOfCombinedImageSamplers: number
    ) : void {
      let cis = new Array<GLImageDescriptor>(noOfCombinedImageSamplers);
			for (let i = 0; i < noOfCombinedImageSamplers; i += 1) {
				cis[i] = new GLImageDescriptor(entrypoint);
			}
			this.mCombinedImageSamplers = new WGLDescriptorPoolResource<GLImageDescriptor>(
				noOfCombinedImageSamplers
        ,	cis);
    }

    private mUniformBuffers: WGLDescriptorPoolResource<GLBufferDescriptor>;
    private setupUniformBlocks(noOfUniformBlocks: number) : void {
      let blocks = new Array<GLBufferDescriptor>(noOfUniformBlocks);
      for (let i = 0; i < noOfUniformBlocks; i += 1) {
        blocks[i] = new GLBufferDescriptor();
      }

			this.mUniformBuffers = new WGLDescriptorPoolResource<GLBufferDescriptor>(
				noOfUniformBlocks
        ,	blocks);
    }

    readonly combinedImageSamplers: IGLDescriptorPoolResource<GLImageDescriptor>;
    readonly uniformBuffers: IGLDescriptorPoolResource<GLBufferDescriptor>;
    readonly storageBuffers: IGLDescriptorPoolResource<GLBufferDescriptor>;

		resetResource(resourceInfo: GLDescriptorPoolResourceInfo) : void {
			if (resourceInfo != null)	{
				switch (resourceInfo.groupType)
				{
					case GLDescriptorBindingGroup.UniformBuffer:
						this.mUniformBuffers.free(resourceInfo.ticket);
						break;
					case GLDescriptorBindingGroup.CombinedImageSampler:
						this.mCombinedImageSamplers.free(resourceInfo.ticket);
						break;
					case GLDescriptorBindingGroup.StorageBuffer:
						this.mStorageBuffers.free(resourceInfo.ticket);
						break;
				}
			}      
    }

		tryTake(out: {result: IWGLDescriptorSet|null } ) : boolean {
      if (this.mAvailableSets.length > 0) {
        let result = this.mAvailableSets.pop() as IWGLDescriptorSet;
        out.result = result;
        return true;
      }
      else {
        out.result = null;
        return false;
      }
    }
  }
}