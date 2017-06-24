export interface IMgDevice {
  destroyDevice(allocator : IMgAllocationCallbacks|null) : void;

  getDeviceQueue(queueFamilyIndex : number
    , queueIndex : number
    , out : {pQueue: IMgQueue | null } ) : void;

  allocateMemory(pAllocateInfo : MgMemoryAllocateInfo
    , allocator : IMgAllocationCallbacks|null
    , out : { pMemory : IMgDeviceMemory|null } ) : MgResult;

  createImage(pCreateInfo: MgImageCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pImage: IMgImage|null } ) : MgResult;
  
  getImageSubresourceLayout(image: IMgImage
    , pSubresource: MgImageSubresource
    , out: { pLayout: MgSubresourceLayout }) : void;

  createImageView(pCreateInfo: MgImageViewCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pView: IMgImageView|null } ) : MgResult;

  createShaderModule(pCreateInfo: MgShaderModuleCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pShaderModule: IMgShaderModule|null } ) : MgResult;

  createGraphicsPipelines(
    pipelineCache: IMgPipelineCache|null
    , pCreateInfos: Array<MgGraphicsPipelineCreateInfo>
    , allocator: IMgAllocationCallbacks|null
    , out: { pPipelines: Array<IMgPipeline>|null }) : MgResult;

  createComputePipelines(pipelineCache: IMgPipelineCache
    , pCreateInfos: Array<MgComputePipelineCreateInfo>
    , allocator: IMgAllocationCallbacks|null
    , out: { pPipelines: Array<IMgPipeline>|null } ) : MgResult;

  createPipelineLayout(pCreateInfo: MgPipelineLayoutCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pPipelineLayout: IMgPipelineLayout|null }) : MgResult;

  createSampler(pCreateInfo: MgSamplerCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pSampler: IMgSampler|null } ) : MgResult;

  createDescriptorSetLayout(pCreateInfo: MgDescriptorSetLayoutCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pSetLayout: IMgDescriptorSetLayout|null }) : MgResult;

  createDescriptorPool(pCreateInfo: MgDescriptorPoolCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pDescriptorPool: IMgDescriptorPool|null }) : MgResult;

  allocateDescriptorSets(pAllocateInfo: MgDescriptorSetAllocateInfo
    , out: { pDescriptorSets: Array<IMgDescriptorSet> } ) : MgResult;

  freeDescriptorSets(descriptorPool: IMgDescriptorPool
    , pDescriptorSets: Array<IMgDescriptorSet>) : MgResult;

  updateDescriptorSets(
    pDescriptorWrites: Array<MgWriteDescriptorSet>|null
    , pDescriptorCopies: Array<MgCopyDescriptorSet>|null) : void;

  createFramebuffer(pCreateInfo: MgFramebufferCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pFramebuffer: IMgFramebuffer|null }) : MgResult;

  createRenderPass(pCreateInfo: MgRenderPassCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pRenderPass: IMgRenderPass }) : MgResult;

  createCommandPool(pCreateInfo: MgCommandPoolCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pCommandPool: IMgCommandPool|null }) : MgResult;

  allocateCommandBuffers(pAllocateInfo: MgCommandBufferAllocateInfo
    , pCommandBuffers: Array<IMgCommandBuffer>) : MgResult;

  freeCommandBuffers(commandPool: IMgCommandPool
    , pCommandBuffers: Array<IMgCommandBuffer>) : void;

  createSwapchainKHR(pCreateInfo: MgSwapchainCreateInfoKHR
    , allocator: IMgAllocationCallbacks|null
    , out: { pSwapchain : IMgSwapchainKHR|null }) : MgResult;

  getSwapchainImagesKHR(swapchain: IMgSwapchainKHR
    , out: { pSwapchainImages: Array<IMgImage>|null} ) : MgResult;

  // WARN: timeout requires UInt64
  acquireNextImageKHR(
    swapchain: IMgSwapchainKHR
    , timeout: number
    , semaphore: IMgSemaphore|null
    , fence: IMgFence|null
    , out: { pImageIndex: number}) : MgResult;

  createSemaphore(pCreateInfo: MgSemaphoreCreateInfo
      , allocator: IMgAllocationCallbacks|null
      , out: { pSemaphore: IMgSemaphore|null }) : MgResult;     

  createFence(pCreateInfo: MgFenceCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { fence: IMgFence|null})  : MgResult;

  resetFences(pFences: Array<IMgFence>) : MgResult;

  getFenceStatus(fence: IMgFence) : MgResult;

  // WARN: timeout requires UInt64
  waitForFences(pFences: Array<IMgFence>
    , waitAll: boolean
    , timeout: number) : MgResult;

  getBufferMemoryRequirements (
    buffer: IMgBuffer
    , out: { pMemoryRequirements: MgMemoryRequirements|null}
  ) : void;

  createBuffer(
    pCreateInfo: MgBufferCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pBuffer:IMgBuffer|null}
  ) : MgResult;
}
