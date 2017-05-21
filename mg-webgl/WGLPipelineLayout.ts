namespace Magnesium {
  export class WGLPipelineLayout implements IWGLPipelineLayout {
    private mBindings: Array<GLUniformBinding>;
    get bindings(): Array<GLUniformBinding> {
      return this.mBindings;
    }

    private mNoOfBindingPoints: number;
    get noOfBindingPoints(): number {
      return this.mNoOfBindingPoints;
    }

    private mNoOfStorageBuffers: number;
    get noOfStorageBuffers(): number {
      return this.mNoOfStorageBuffers;
    }

    private mNoOfExpectedDynamicOffsets: number;
    get noOfExpectedDynamicOffsets(): number {
      return this.mNoOfExpectedDynamicOffsets;
    }

    private mRanges: Map<number, GLBindingPointOffsetInfo>;
    get ranges(): Map<number, GLBindingPointOffsetInfo> {
      return this.mRanges;
    }

    private mOffsetDestinations: Array<GLDynamicOffsetInfo>;
    get offsetDestinations(): Array<GLDynamicOffsetInfo> {
      return this.mOffsetDestinations;
    }

    constructor(pCreateInfo: MgPipelineLayoutCreateInfo) {
      if (pCreateInfo.setLayouts.length == 1) {
        let layout = pCreateInfo.setLayouts[0] as IWGLDescriptorSetLayout;
      }
      else {
        this.mBindings = new Array<GLUniformBinding>(0);
      }
      this.mNoOfBindingPoints = 0;
      this.mNoOfStorageBuffers = 0;
      this.mNoOfExpectedDynamicOffsets = 0;

      this.mRanges = new Map<number, GLBindingPointOffsetInfo>();
      this.mOffsetDestinations = this.extractBindingsInformation();
      this.setupOffsetRangesByBindings();
    }

    private extractBindingsInformation()
      : Array<GLDynamicOffsetInfo> {
			let signPosts = new Array<GLDynamicOffsetInfo>();
			// build flat slots array for uniforms 
			for (let desc of this.mBindings) {
				if (desc.descriptorType == MgDescriptorType.UNIFORM_BUFFER
          || desc.descriptorType == MgDescriptorType.UNIFORM_BUFFER_DYNAMIC
        ) {
					this.mNoOfBindingPoints += desc.descriptorCount;
					let tempRange = new GLBindingPointOffsetInfo();
					tempRange.binding = desc.binding;
					tempRange.first = 0,
					tempRange.last = desc.descriptorCount - 1;
          this.mRanges.set(desc.binding, tempRange);

					if (desc.descriptorType == MgDescriptorType.UNIFORM_BUFFER_DYNAMIC) {
            let post = new GLDynamicOffsetInfo();
            post.target = GLBufferRangeTarget.UNIFORM_BUFFER;
            post.dstIndex = this.mNoOfExpectedDynamicOffsets;
						this.mNoOfExpectedDynamicOffsets += desc.descriptorCount;
					}
				}
				else if (desc.descriptorType == MgDescriptorType.STORAGE_BUFFER
          || desc.descriptorType == MgDescriptorType.STORAGE_BUFFER_DYNAMIC
        ) {
					this.mNoOfStorageBuffers += desc.descriptorCount;

					if (desc.descriptorType ==  MgDescriptorType.STORAGE_BUFFER_DYNAMIC) {
            let post = new GLDynamicOffsetInfo();
            post.target = GLBufferRangeTarget.STORAGE_BUFFER;
            post.dstIndex = desc.binding;
						signPosts.push(post);
						this.mNoOfExpectedDynamicOffsets += desc.descriptorCount;
					}
				}

			}
			return signPosts;        
    }

		private setupOffsetRangesByBindings() : void
		{
      let keys = new Array<number>();
      for (let key of this.mRanges.keys()) {
        keys.push(key);
      }

      let sortedKeys = keys.sort((a,b) => a < b ? -1 : 1);

      let startingOffset = 0;
      for (let key of sortedKeys) {
         let range = this.mRanges.get(key) as GLBindingPointOffsetInfo;
         range.first += startingOffset;
         range.last += startingOffset;
         startingOffset = range.last + 1;
      }
		}

		destroyPipelineLayout(device: IMgDevice
      , allocator: IMgAllocationCallbacks|null
    ) : void {

    }
  }
}