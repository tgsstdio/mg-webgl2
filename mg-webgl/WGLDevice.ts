/// <reference path="IWGLQueue.ts" />
/// <reference path="IGLDeviceEntrypoint.ts" />

namespace Magnesium {
  export class WGLDevice implements IWGLDevice {
    private mQueue: IWGLQueue;
    private mEntrypoint: IGLDeviceEntrypoint;

    constructor(queue: IWGLQueue, entrypoint: IGLDeviceEntrypoint) {
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
      , allocator: IMgAllocationCallbacks
      , out: { pImage: IMgImage }
    ) : MgResult {
		
			if (pCreateInfo == null) {
				throw new Error ("pCreateInfo is null");
			}

			// ARB_texture_storage
			let textureId = new Array<number>(1);

			let width = pCreateInfo.extent.width;
			let height = pCreateInfo.extent.height;
			let depth = pCreateInfo.extent.depth;
			let levels = pCreateInfo.mipLevels;
			let arrayLayers = pCreateInfo.arrayLayers;
			//var internalFormat = GetInternalFormat(pCreateInfo.Format);

			let imageType = pCreateInfo.imageType;

			switch (imageType) {
        case MgImageType.TYPE_1D:
  //				GL.CreateTextures (TextureTarget.Texture1D, 1, textureId);
  //				GL.Ext.TextureStorage1D (textureId [0], (ExtDirectStateAccess)All.Texture1D, levels, internalFormat, width);
          textureId[0] = this.mEntrypoint.image.createTextureStorage1D (
            levels
            , pCreateInfo.format
            , width
          );
          break;
        case MgImageType.TYPE_2D:
  //				GL.CreateTextures (TextureTarget.Texture2D, 1, textureId);
  //				GL.Ext.TextureStorage2D (textureId[0], (ExtDirectStateAccess)All.Texture2D, levels, internalFormat, width, height);
          textureId[0] = this.mEntrypoint.image.createTextureStorage2D (
            levels
            , pCreateInfo.format
            , width
            , height
          );
          break;
        case MgImageType.TYPE_3D:
  //				GL.CreateTextures (TextureTarget.Texture3D, 1, textureId);
  //				GL.Ext.TextureStorage3D (textureId [0], (ExtDirectStateAccess)All.Texture3D, levels, internalFormat, width, height, depth);
          textureId [0] = this.mEntrypoint.image.CreateTextureStorage3D (
            levels
            , pCreateInfo.format
            , width
            , height
            , depth);
          break;
        default:				
          throw new Error('MgImageType not supported');
			}

			out.pImage = new GLImage(
        this.mEntrypoint.image
        , textureId[0]
        , imageType
        , pCreateInfo.format
        , width
        , height
        , depth
        , levels
        , arrayLayers);
			return MgResult.SUCCESS;
    }
		
    getImageSubresourceLayout(image: IMgImage
      , pSubresource: MgImageSubresource
      , out: { pLayout: MgSubresourceLayout }) : void;

		createImageView(pCreateInfo: MgImageViewCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pView: IMgImageView } ) : MgResult;

		createShaderModule(pCreateInfo: MgShaderModuleCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pShaderModule: IMgShaderModule } ) : MgResult;

		createGraphicsPipelines(pipelineCache: IMgPipelineCache
      , pCreateInfos: Array<MgGraphicsPipelineCreateInfo>
      , allocator: IMgAllocationCallbacks
      , out: { pPipelines: Array<IMgPipeline> }) : MgResult;

		createComputePipelines(pipelineCache: IMgPipelineCache
      , pCreateInfos: Array<MgComputePipelineCreateInfo>
      , allocator: IMgAllocationCallbacks
      , out: { pPipelines: Array<IMgPipeline> } ) : MgResult;

		createPipelineLayout(pCreateInfo: MgPipelineLayoutCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pPipelineLayout: IMgPipelineLayout }) : MgResult;

		createSampler(pCreateInfo: MgSamplerCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pSampler: IMgSampler } ) : MgResult;

		createDescriptorSetLayout(pCreateInfo: MgDescriptorSetLayoutCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pSetLayout: IMgDescriptorSetLayout }) : MgResult;

		createDescriptorPool(pCreateInfo: MgDescriptorPoolCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pDescriptorPool: IMgDescriptorPool}) : MgResult;

		allocateDescriptorSets(pAllocateInfo: MgDescriptorSetAllocateInfo
      , out: { pDescriptorSets: Array<IMgDescriptorSet> } ) : MgResult;

		freeDescriptorSets(descriptorPool: IMgDescriptorPool
      , pDescriptorSets: Array<IMgDescriptorSet>) : MgResult;

		updateDescriptorSets(
      pDescriptorWrites: Array<MgWriteDescriptorSet>
      , pDescriptorCopies: Array<MgCopyDescriptorSet>) : void;

		createFramebuffer(pCreateInfo: MgFramebufferCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pFramebuffer: IMgFramebuffer }) : MgResult;

		createRenderPass(pCreateInfo: MgRenderPassCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pRenderPass: IMgRenderPass }) : MgResult;

		createCommandPool(pCreateInfo: MgCommandPoolCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pCommandPool: IMgCommandPool }) : MgResult;

		allocateCommandBuffers(pAllocateInfo: MgCommandBufferAllocateInfo
      , pCommandBuffers: Array<IMgCommandBuffer>) : MgResult;

		freeCommandBuffers(commandPool: IMgCommandPool
      , pCommandBuffers: Array<IMgCommandBuffer>) : void;

		createSwapchainKHR(pCreateInfo: MgSwapchainCreateInfoKHR
      , allocator: IMgAllocationCallbacks
      , out: { pSwapchain : IMgSwapchainKHR }) : MgResult;

		getSwapchainImagesKHR(swapchain: IMgSwapchainKHR
      , out: { pSwapchainImages: Array<IMgImage>} ) : MgResult;

    // WARN: timeout requires UInt64
		acquireNextImageKHR(swapchain: IMgSwapchainKHR
      , timeout: number, semaphore: IMgSemaphore, fence: IMgFence
      , out: { pImageIndex: number}) : MgResult;

		createSemaphore(pCreateInfo: MgSemaphoreCreateInfo
       , allocator: IMgAllocationCallbacks
       , out: { pSemaphore: IMgSemaphore }) : MgResult;     

		createFence(pCreateInfo: MgFenceCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { fence: IMgFence})  : MgResult;

		resetFences(pFences: Array<IMgFence>) : MgResult;

		getFenceStatus(fence: IMgFence) : MgResult;

    // WARN: timeout requires UInt64
		waitForFences(pFences: Array<IMgFence>
      , waitAll: boolean
      , timeout: number) : MgResult;
  }
}