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
      , out: { pPipelines: Array<IMgPipeline> }
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
      }
      return MgResult.SUCCESS;
    }

		// createComputePipelines(pipelineCache: IMgPipelineCache
    //   , pCreateInfos: Array<MgComputePipelineCreateInfo>
    //   , allocator: IMgAllocationCallbacks
    //   , out: { pPipelines: Array<IMgPipeline> } ) : MgResult;

		// createPipelineLayout(pCreateInfo: MgPipelineLayoutCreateInfo
    //   , allocator: IMgAllocationCallbacks
    //   , out: { pPipelineLayout: IMgPipelineLayout }) : MgResult;

		// createSampler(pCreateInfo: MgSamplerCreateInfo
    //   , allocator: IMgAllocationCallbacks
    //   , out: { pSampler: IMgSampler } ) : MgResult;

		// createDescriptorSetLayout(pCreateInfo: MgDescriptorSetLayoutCreateInfo
    //   , allocator: IMgAllocationCallbacks
    //   , out: { pSetLayout: IMgDescriptorSetLayout }) : MgResult;

		// createDescriptorPool(pCreateInfo: MgDescriptorPoolCreateInfo
    //   , allocator: IMgAllocationCallbacks
    //   , out: { pDescriptorPool: IMgDescriptorPool}) : MgResult;

		// allocateDescriptorSets(pAllocateInfo: MgDescriptorSetAllocateInfo
    //   , out: { pDescriptorSets: Array<IMgDescriptorSet> } ) : MgResult;

		// freeDescriptorSets(descriptorPool: IMgDescriptorPool
    //   , pDescriptorSets: Array<IMgDescriptorSet>) : MgResult;

		// updateDescriptorSets(
    //   pDescriptorWrites: Array<MgWriteDescriptorSet>
    //   , pDescriptorCopies: Array<MgCopyDescriptorSet>) : void;

		// createFramebuffer(pCreateInfo: MgFramebufferCreateInfo
    //   , allocator: IMgAllocationCallbacks
    //   , out: { pFramebuffer: IMgFramebuffer }) : MgResult;

		// createRenderPass(pCreateInfo: MgRenderPassCreateInfo
    //   , allocator: IMgAllocationCallbacks
    //   , out: { pRenderPass: IMgRenderPass }) : MgResult;

		// createCommandPool(pCreateInfo: MgCommandPoolCreateInfo
    //   , allocator: IMgAllocationCallbacks
    //   , out: { pCommandPool: IMgCommandPool }) : MgResult;

		// allocateCommandBuffers(pAllocateInfo: MgCommandBufferAllocateInfo
    //   , pCommandBuffers: Array<IMgCommandBuffer>) : MgResult;

		// freeCommandBuffers(commandPool: IMgCommandPool
    //   , pCommandBuffers: Array<IMgCommandBuffer>) : void;

		// createSwapchainKHR(pCreateInfo: MgSwapchainCreateInfoKHR
    //   , allocator: IMgAllocationCallbacks
    //   , out: { pSwapchain : IMgSwapchainKHR }) : MgResult;

		// getSwapchainImagesKHR(swapchain: IMgSwapchainKHR
    //   , out: { pSwapchainImages: Array<IMgImage>} ) : MgResult;

    // // WARN: timeout requires UInt64
		// acquireNextImageKHR(swapchain: IMgSwapchainKHR
    //   , timeout: number, semaphore: IMgSemaphore, fence: IMgFence
    //   , out: { pImageIndex: number}) : MgResult;

		// createSemaphore(pCreateInfo: MgSemaphoreCreateInfo
    //    , allocator: IMgAllocationCallbacks
    //    , out: { pSemaphore: IMgSemaphore }) : MgResult;     

		// createFence(pCreateInfo: MgFenceCreateInfo
    //   , allocator: IMgAllocationCallbacks
    //   , out: { fence: IMgFence})  : MgResult;

		// resetFences(pFences: Array<IMgFence>) : MgResult;

		// getFenceStatus(fence: IMgFence) : MgResult;

    // // WARN: timeout requires UInt64
		// waitForFences(pFences: Array<IMgFence>
    //   , waitAll: boolean
    //   , timeout: number) : MgResult;
  }
}