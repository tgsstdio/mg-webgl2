/// <reference path="MgResult.ts" />
/// <reference path="IMgQueue.ts" />
/// <reference path="IMgImage.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />
/// <reference path="IMgDeviceMemory.ts" />
/// <reference path="MgMemoryAllocateInfo.ts" />
/// <reference path="MgImageCreateInfo.ts" />
/// <reference path="MgImageSubresource.ts" />
/// <reference path="IMgImageView.ts" />
/// <reference path="MgShaderModuleCreateInfo.ts" />
/// <reference path="IMgShaderModule.ts" />
/// <reference path="IMgPipelineCache.ts" />
/// <reference path="MgGraphicsPipelineCreateInfo.ts" />
/// <reference path="MgComputePipelineCreateInfo.ts" />
/// <reference path="IMgPipeline.ts" />
/// <reference path="MgPipelineLayoutCreateInfo.ts" />
/// <reference path="IMgPipelineLayout.ts" />
/// <reference path="MgSamplerCreateInfo.ts" />
/// <reference path="IMgSampler.ts" />
/// <reference path="MgDescriptorSetLayoutCreateInfo.ts" />
/// <reference path="IMgDescriptorSetLayout.ts" />
/// <reference path="MgDescriptorPoolCreateInfo.ts" />
/// <reference path="IMgDescriptorPool.ts" />
/// <reference path="MgSubresourceLayout.ts" />
/// <reference path="MgImageViewCreateInfo.ts" />
/// <reference path="MgDescriptorSetAllocateInfo.ts" />
/// <reference path="IMgDescriptorSet.ts" />
/// <reference path="MgCopyDescriptorSet.ts" />
/// <reference path="MgFramebufferCreateInfo.ts" />
/// <reference path="IMgFramebuffer.ts" />
/// <reference path="MgRenderPassCreateInfo.ts" />
/// <reference path="IMgRenderPass.ts" />
/// <reference path="MgCommandPoolCreateInfo.ts" />
/// <reference path="IMgCommandPool.ts" />
/// <reference path="IMgCommandBuffer.ts" />
/// <reference path="MgSwapchainCreateInfoKHR.ts" />
/// <reference path="IMgSwapchainKHR.ts" />
/// <reference path="IMgSemaphore.ts" />
/// <reference path="MgSemaphoreCreateInfo.ts" />
/// <reference path="MgFenceCreateInfo.ts" />
/// <reference path="MgCommandBufferAllocateInfo.ts" />

namespace Magnesium {
  export interface IMgDevice {
    destroyDevice(allocator : IMgAllocationCallbacks) : void;

    getDeviceQueue(queueFamilyIndex : number
      , queueIndex : number
      , out : {pQueue: IMgQueue} ) : void;

    allocateMemory(pAllocateInfo : MgMemoryAllocateInfo
      , allocator : IMgAllocationCallbacks
      , out : { pMemory : IMgDeviceMemory } ) : MgResult;

		createImage(pCreateInfo: MgImageCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { pImage: IMgImage } ) : MgResult;
		
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