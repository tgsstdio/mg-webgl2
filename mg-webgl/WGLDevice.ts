/// <reference path="IWGLQueue.ts" />
/// <reference path="IWGLDeviceEntrypoint.ts" />
/// <reference path="WGLImage.ts" />

namespace Magnesium {
  export class WGLDevice implements IWGLDevice {
    private mGL: WebGL2RenderingContext;
    private mQueue: IWGLQueue;
    private mEntrypoint: IWGLDeviceEntrypoint;

    constructor(
      gl: WebGL2RenderingContext
      ,queue: IWGLQueue
      , entrypoint: IWGLDeviceEntrypoint
    ) {
      this.mGL = gl;
      this.mQueue = queue;
      this.mEntrypoint = entrypoint;
    }

    destroyDevice(allocator : IMgAllocationCallbacks) : void {

    }

    getDeviceQueue(queueFamilyIndex : number
      , queueIndex : number
      , out : {pQueue: IMgQueue}
    ) : void {
      out.pQueue = this.mQueue;
    }

    allocateMemory(pAllocateInfo : MgMemoryAllocateInfo
      , allocator : IMgAllocationCallbacks
      , out : { pMemory : IMgDeviceMemory }
    ) : MgResult {
      out.pMemory = this.mEntrypoint.deviceMemory.createDeviceMemory(pAllocateInfo);
      return MgResult.SUCCESS;
    }

		createImage(pCreateInfo: MgImageCreateInfo
      , allocator: IMgAllocationCallbacks|null
      , out: { pImage: IMgImage|null }
    ) : MgResult {
		
			if (pCreateInfo == null) {
				throw new Error ("pCreateInfo is null");
			}

			// ARB_texture_storage
			let textureId : WebGLTexture;

			let width = pCreateInfo.extent.width;
			let height = pCreateInfo.extent.height;
			let depth = pCreateInfo.extent.depth;
			let levels = pCreateInfo.mipLevels;
			let arrayLayers = pCreateInfo.arrayLayers;

			let imageType = pCreateInfo.imageType;

			switch (imageType) {
        case MgImageType.TYPE_1D:
          textureId = this.mEntrypoint.image.createTextureStorage1D (
             levels
            , pCreateInfo.format
            , width
          );
          break;
        case MgImageType.TYPE_2D:
          textureId = this.mEntrypoint.image.createTextureStorage2D (
             levels
            , pCreateInfo.format
            , width
            , height
          );
          break;
        case MgImageType.TYPE_3D:
          textureId = this.mEntrypoint.image.createTextureStorage3D (
             levels
            , pCreateInfo.format
            , width
            , height
            , depth);
          break;
        default:				
          throw new Error('MgImageType not supported');
			}

			out.pImage = new WGLImage(
        this.mEntrypoint.image
        , textureId
        , imageType
        , pCreateInfo.format
        , width
        , height
        , depth
        , levels
        , arrayLayers);
			return MgResult.SUCCESS;
    }
    
    getImageSubresourceLayout(
      image: IMgImage
      , pSubresource: MgImageSubresource
      , out: { pLayout: MgSubresourceLayout }
    ) : void
		{
			var internalImage : IWGLImage = image as IWGLImage;

			if (internalImage != null
				&& pSubresource.arrayLayer < internalImage.arrayLayers.length 
				&& pSubresource.mipLevel < internalImage.arrayLayers[pSubresource.arrayLayer].levels.length)
			{
				out.pLayout = internalImage
          .arrayLayers[pSubresource.arrayLayer]
          .levels[pSubresource.mipLevel]
          .subresourceLayout;
			}
			else
			{
				out.pLayout = new MgSubresourceLayout();
			}
		}

		createImageView(pCreateInfo: MgImageViewCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pView: IMgImageView|null }
    ) : MgResult {
			if (pCreateInfo == null) {
				throw new Error("pCreateInfo is null");
			}

			if (pCreateInfo.image == null) {
				throw new Error("pCreateInfo.image is null");
			}

			if (pCreateInfo.subresourceRange == null)	{
				throw new Error ("pCreateInfo.SubresourceRange is null");
			}

      let originalImage = pCreateInfo.image as IWGLImage;

      // STUB: not sure what required YET ...
      out.pView = new WGLImageView(originalImage);
      return MgResult.SUCCESS;
    }

		createShaderModule(pCreateInfo: MgShaderModuleCreateInfo
      , allocator: IMgAllocationCallbacks|null
      , out: { pShaderModule: IMgShaderModule|null }
    ) : MgResult
    {
			if (pCreateInfo == null) {
				throw new Error("pCreateInfo is null");
			}

			out.pShaderModule = new WGLShaderModule (pCreateInfo);
			return MgResult.SUCCESS;
    }

		createGraphicsPipelines(pipelineCache: IMgPipelineCache
      , pCreateInfos: Array<MgGraphicsPipelineCreateInfo>
      , allocator: IMgAllocationCallbacks
      , out: { pPipelines: Array<IMgPipeline>|null }
    ) : MgResult {
      let output = new Array<IMgPipeline>();

			if (pCreateInfos == null) {
				throw new Error("pCreateInfos is null");
			}

      for (let info of pCreateInfos) {
        let bLayout: IWGLPipelineLayout = info.layout as IWGLPipelineLayout;
        if (bLayout == null) {
          throw new Error("pCreateInfos[].Layout is null");
        }

        if (info.vertexInputState == null) {
            throw new Error("pCreateInfos[].VertexInputState");
        }

        if (info.inputAssemblyState == null) {
            throw new Error("pCreateInfos[].InputAssemblyState");
        }

        if (info.rasterizationState == null) {
            throw new Error("pCreateInfos[].RasterizationState");
        }

        let program = this.mEntrypoint.graphicsCompiler.compile(info);

        let blocks = this.mEntrypoint.graphicsCompiler.inspect(program);

        let arrayMapper = new WGLInternalCacheArrayMapper(bLayout, blocks);

        let internalCache = new GLInternalCache(bLayout, blocks, arrayMapper);

        let pipeline = new WGLGraphicsPipeline(
          this.mEntrypoint.graphicsPipeline
          , program
          , info
          , internalCache
          , bLayout
        );
        output.push(pipeline);
      }
      out.pPipelines = output;
      return MgResult.SUCCESS;
    }

		createComputePipelines(pipelineCache: IMgPipelineCache
      , pCreateInfos: Array<MgComputePipelineCreateInfo>
      , allocator: IMgAllocationCallbacks
      , out: { pPipelines: Array<IMgPipeline>|null }
    ) : never {
      throw new Error('ERROR: not implemented');
    }

		createPipelineLayout(pCreateInfo: MgPipelineLayoutCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pPipelineLayout: IMgPipelineLayout|null }
    ) : MgResult
    {
      if (pCreateInfo == null) {
        throw new Error('ERROR: pCreateInfo is null');
      }

      if (pCreateInfo.setLayouts == null) {
        throw new Error('ERROR: pCreateInfo.setLayouts is null');
      }

      if (pCreateInfo.setLayouts.length > 1) {
        throw new Error('ERROR: - pCreateInfo.SetLayouts.length must be <= 1');
      }

      out.pPipelineLayout = new WGLPipelineLayout(pCreateInfo);
      return MgResult.SUCCESS;
    }

		createSampler(pCreateInfo: MgSamplerCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pSampler: IMgSampler|null }
    ) : MgResult {
      if (pCreateInfo == null) {
        throw new Error('ERROR: pCreateInfo is null');
      }

      out.pSampler = new WGLSampler(
        this.mEntrypoint.sampler
        , pCreateInfo);
      return MgResult.SUCCESS; 
    }

		createDescriptorSetLayout(pCreateInfo: MgDescriptorSetLayoutCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pSetLayout: IMgDescriptorSetLayout|null }
    ) : MgResult {
      if (pCreateInfo == null) {
        throw new Error('ERROR: pCreateInfo is null');
      }

			out.pSetLayout  = new WGLDescriptorSetLayout (pCreateInfo); 
			return MgResult.SUCCESS;      
    }

		createDescriptorPool(pCreateInfo: MgDescriptorPoolCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pDescriptorPool: IMgDescriptorPool|null }
    ) : MgResult {
      if (pCreateInfo == null) {
        throw new Error('ERROR: pCreateInfo is null');
      }

      out.pDescriptorPool = this.mEntrypoint.descriptorPool.createPool(pCreateInfo);
      return MgResult.SUCCESS;
    }

		allocateDescriptorSets(
      pAllocateInfo: MgDescriptorSetAllocateInfo
      , out: { pDescriptorSets: Array<IMgDescriptorSet> }
    ) : MgResult {
      return this.mEntrypoint.descriptorSet.allocate(pAllocateInfo, out);
    }

		freeDescriptorSets(
      descriptorPool: IMgDescriptorPool
      , pDescriptorSets: Array<IMgDescriptorSet>
    ) : MgResult {
      return this.mEntrypoint.descriptorSet.free(descriptorPool, pDescriptorSets);
    }

		updateDescriptorSets(
      pDescriptorWrites: Array<MgWriteDescriptorSet>|null
      , pDescriptorCopies: Array<MgCopyDescriptorSet>|null
    ) : void {
      this.mEntrypoint.descriptorSet.update(pDescriptorWrites, pDescriptorCopies);
    }

		createFramebuffer(
      pCreateInfo: MgFramebufferCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pFramebuffer: IMgFramebuffer|null
      }) : MgResult {
        out.pFramebuffer = new WGLFramebuffer();
        return MgResult.SUCCESS;
      }

		createRenderPass(
      pCreateInfo: MgRenderPassCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pRenderPass: IMgRenderPass|null }
    ) : MgResult {
      if (pCreateInfo == null) {
        throw new Error('ERROR: pCreateInfo is null');
      }

      out.pRenderPass = new WGLRenderPass(pCreateInfo.attachments);
      return MgResult.SUCCESS; 
    }

		createCommandPool(pCreateInfo: MgCommandPoolCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pCommandPool: IMgCommandPool|null }
    ) : MgResult {
      if (pCreateInfo == null) {
        throw new Error('ERROR: pCreateInfo is null');
      }

      out.pCommandPool = new WGLCommandPool (pCreateInfo.flags);
			return MgResult.SUCCESS;
    }

		allocateCommandBuffers(
      pAllocateInfo: MgCommandBufferAllocateInfo
      , pCommandBuffers: Array<IMgCommandBuffer>
    ) : MgResult {
      if (pAllocateInfo == null) {
        throw new Error('ERROR: pAllocateInfo is null');
      } 

			if (pAllocateInfo.commandPool == null) {
				throw new Error ("ERROR: pAllocateInfo.commandPool is null");
			}

      let cmdPool = pAllocateInfo.commandPool as IWGLCommandPool;

      for (let i = 0; i < pAllocateInfo.commandBufferCount; i += 1)	{
        let sorter = new WGLCmdEncoderContextSorter();
        let dsBinder = new WGLDescriptorSetBinder();
        let graphics = new WGLCmdGraphicsEncoder(
          sorter
          , new WGLCmdGraphicsBag()
          , this.mEntrypoint.vertexArrays
          , dsBinder);
        let compute = new WGLCmdComputeEncoder();
        let blit = new WGLCmdBlitEncoder(
          sorter
          , new WGLCmdBlitBag()
          , this.mEntrypoint.imageFormat);
        let encoder = new WGLCmdCommandEncoder(sorter, graphics, compute, blit);

				let buffer : IWGLCommandBuffer = new WGLCmdCommandBuffer(true, encoder);
				cmdPool.buffers.push (buffer);
				pCommandBuffers [i] = buffer;
      }

      return MgResult.SUCCESS;
    }

		freeCommandBuffers(
      commandPool: IMgCommandPool
      , pCommandBuffers: Array<IMgCommandBuffer>
    ) : void {
      if (pCommandBuffers != null) {
        for (let item of pCommandBuffers)	{
          let cmdBuf = item as IWGLCommandBuffer;
          cmdBuf.resetAllData ();
        }
      }
    }

		createSwapchainKHR(
      pCreateInfo: MgSwapchainCreateInfoKHR
      , allocator: IMgAllocationCallbacks
      , out: { pSwapchain : IMgSwapchainKHR }
    ) : never {
      throw new Error("ERROR: not implemented");
    }

		getSwapchainImagesKHR(swapchain: IMgSwapchainKHR
      , out: { pSwapchainImages: Array<IMgImage>}
    ) : never {
      throw new Error("ERROR: not implemented");
    }

    // // WARN: timeout requires UInt64
		acquireNextImageKHR(
      swapchain: IMgSwapchainKHR
      , timeout: number
      , semaphore: IMgSemaphore
      , fence: IMgFence
      , out: { pImageIndex: number}
    ) : MgResult {
			if (swapchain == null)
			{
				throw new Error ("swapchain is null");
			}

			let sc = swapchain as IGLSwapchainKHR;
			out.pImageIndex = sc.getNextImage ();
			// TODO : fence stuff
			return MgResult.SUCCESS;
		}

		createSemaphore(pCreateInfo: MgSemaphoreCreateInfo
       , allocator: IMgAllocationCallbacks
       , out: { pSemaphore: IMgSemaphore|null }) : MgResult {
      out.pSemaphore = this.mEntrypoint.semaphores.createSemaphore();
			return MgResult.SUCCESS;
    }

		createFence(pCreateInfo: MgFenceCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { fence: IMgFence|null}
    )  : MgResult {
      out.fence = this.mEntrypoint.fences.createFence();
      return MgResult.SUCCESS;        
    }       

		resetFences(pFences: Array<IMgFence>) : MgResult {
      for (let fence of pFences) {
          let bFence = fence as IGLFence;
          bFence.reset();
      }
      return MgResult.SUCCESS; 
    }

		getFenceStatus(
      fence: IMgFence
    ) : MgResult{
        let bFence = fence as IGLFence;
        return (bFence.isSignalled) 
          ? MgResult.SUCCESS 
          : MgResult.NOT_READY;
    }

    // // WARN: timeout requires UInt64
		waitForFences(pFences: Array<IMgFence>
      , waitAll: boolean
      , timeout: number
      //) : MgResult {
    ) : never {
      throw new Error("ERROR: not implemented");
    }
  }
}