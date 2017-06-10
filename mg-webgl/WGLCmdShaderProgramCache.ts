namespace Magnesium {
  export class WGLCmdShaderProgramCache implements IWGLCmdShaderProgramCache {
    private mProgramID: WebGLProgram | null;
    get programID(): WebGLProgram | null {
      return this.mProgramID;
    }    
    private mVAO: WebGLVertexArrayObject| null;
    get vao(): WebGLVertexArrayObject|null {
      return this.mVAO;
    }
    private mBoundDescriptorSets: WGLCmdDescriptorSetParameter;

    private mEntrypoint: IWGLCmdStateRendererCacheEntrypoint;
    constructor(entrypoint: IWGLCmdStateRendererCacheEntrypoint) {
      this.mEntrypoint = entrypoint;
    }

    private mBoundInternalCache: WGLInternalBlockCache;
    private mBoundPipelineLayout: IWGLPipelineLayout;
    setProgramID(
      bindingPoint: MgPipelineBindPoint
      , programID: WebGLProgram
      , layoutCache: WGLInternalBlockCache
      , pipelineLayout: IWGLPipelineLayout
    ) : void {
      if (!(programID === this.mProgramID))
      {
        this.mProgramID = programID;
        this.mEntrypoint.bindProgram(this.mProgramID);
        this.mBoundInternalCache = layoutCache;
        this.mBoundPipelineLayout = pipelineLayout;

        this.setupPipelineUniformBlocks();
        this.setupUniformBufferSlots();

        // ORIGINAL IMPLEMENTATION IS BOTH COMPUTE AND GRAPHICS WERE 
        // STORED BUT ONLY GRAPHICS IS IMPLEMENTED IN WEBGL 2
        this.bindDescriptorSets(this.mBoundDescriptorSets);
      }
    }

		setVAO(vao: WebGLVertexArrayObject): void {
			if (!(this.mVAO === vao))	{
				this.mVAO = vao;
				this.mEntrypoint.bindVAO(this.mVAO);
			}
		}

    setDescriptorSets(ds: WGLCmdDescriptorSetParameter): void {
      this.mBoundDescriptorSets = ds;
      this.bindDescriptorSets(ds);
    }    

    private setupPipelineUniformBlocks() : void {
      if (this.mBoundInternalCache != null && this.mProgramID != null) {
        let blocks = this.mBoundInternalCache.blockBindings;
        for (let block of blocks) {
          this.mEntrypoint.setUniformBlock(
            this.mProgramID
            , block.activeIndex
            , block.bindingPoint);
        }
      }
    }   

    private mNoOfBindingPoints: number;
    private mUniformBuffers: Array<WebGLBuffer|null>;
    private mUniformOffsets: Array<number>;
    private mUniformSizes: Array<number>;        
    private setupUniformBufferSlots(): void {
      if (this.mBoundPipelineLayout != null) {
        let count = this.mBoundPipelineLayout.noOfBindingPoints;

        if (this.mNoOfBindingPoints != count) {
          this.mNoOfBindingPoints = count;

          this.mUniformBuffers = new Array<WebGLBuffer|null>(count);
          this.mUniformOffsets = new Array<number>(count);
          this.mUniformSizes = new Array<number>(count);
        }
      }
    }

		bindDescriptorSets(
      param: WGLCmdDescriptorSetParameter|null
    ): void {
      if (param != null) {
        let ds = param.descriptorSet;

        if (ds != null && ds.isValidDescriptorSet) {
          let index = 0;
          for (let resource of ds.resources) {
            if (resource != null) {
              // NOT USED
              // if (resource.groupType
              //    == GLDescriptorBindingGroup.StorageBuffer) {
              //   index = this.bindStorageBuffer(
              //     ds
              //     , resource
              //     , param.dynamicOffsets
              //     , index);
              // }
              if (resource.groupType
                 == GLDescriptorBindingGroup.UniformBuffer) {
                index = this.bindUniformBuffer(
                  ds
                  , resource
                  , param.dynamicOffsets
                  , index);
              }
              else if (resource.groupType
                == GLDescriptorBindingGroup.CombinedImageSampler) {
                this.bindCombinedSampler(ds, resource);
              }
            }
          }
        }
        else {
          this.resetExistingUniformBuffers();
        }

        this.rebindAllUniformBuffers();
      }
		}

		private bindUniformBuffer(
      ds: IWGLDescriptorSet
      , resource: GLDescriptorPoolResourceInfo
      , dynamicOffsets: Array<number>|null
      , offsetIndex: number
    ) : number {
			// do diff
			if (this.mBoundPipelineLayout != null) {
        let parentPool: IWGLDescriptorPool = ds.parent as IWGLDescriptorPool;

        // for each active uniform block
        let uniformGroup = 
          this.mBoundPipelineLayout.ranges.get(resource.binding) as GLBindingPointOffsetInfo;

				let srcIndex = resource.ticket.first;
				let dstIndex = uniformGroup.first;

				for (let i = 0; i < resource.descriptorCount; i += 1) {
					let buffer = parentPool.uniformBuffers.items[srcIndex];

					this.mUniformBuffers[dstIndex] = buffer.bufferId;

					let offset = buffer.offset;

					// WHAT DYNAMIC
					if (buffer.isDynamic) {
            if (dynamicOffsets != null && offsetIndex < dynamicOffsets.length) {
						  offset += dynamicOffsets[offsetIndex];
              offsetIndex += 1;
            }
					}

					this.mUniformOffsets[dstIndex] = offset;

					this.mUniformSizes[dstIndex] = buffer.size;

					srcIndex += 1;
					dstIndex += 1;
				}

				return offsetIndex;
			}
			else
			{
				return offsetIndex;
			}
		}


    bindCombinedSampler(
      ds: IWGLDescriptorSet
      , resource: GLDescriptorPoolResourceInfo
    ) : void {
			let parentPool = ds.parent as IWGLDescriptorPool;
  
      for (let i = resource.ticket.first; i <= resource.ticket.last; i += 1) {
				let image: WGLImageDescriptor = parentPool.combinedImageSamplers.items[i];

  	    this.mEntrypoint.bindCombinedImageSampler(
          this.mProgramID
          , resource.binding
          , image.texture
          , image.sampler);
      }
		}
		   

    private resetExistingUniformBuffers(): void {
      for (let i = 0; i < this.mNoOfBindingPoints; i += 1) {
        this.mUniformBuffers[i] = 0;
        this.mUniformOffsets[i] = 0;
        this.mUniformSizes[i] = 0;
      }
    }

		private rebindAllUniformBuffers(): void	{
		  this.mEntrypoint.bindUniformBuffers(
        this.mNoOfBindingPoints
        , this.mUniformBuffers
        , this.mUniformOffsets
        , this.mUniformSizes);
		}    
    
  }
}