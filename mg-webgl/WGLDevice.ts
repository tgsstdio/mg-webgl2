import {MgMemoryRequirements}
	from '../mg/MgMemoryRequirements';  
import {IMgBuffer}
	from '../mg/IMgBuffer'; 
import {IMgQueue}
	from '../mg/IMgQueue';  
import {MgMemoryAllocateInfo}
	from '../mg/MgMemoryAllocateInfo';     
import {IWGLDevice}
	from './IWGLDevice';	  
import {IWGLQueue}
	from './queue/IWGLQueue';
import {IWGLDeviceEntrypoint}
	from './entrypoint/IWGLDeviceEntrypoint';	
import {IWGLDeviceMemoryTypeMap}
	from './IWGLDeviceMemoryTypeMap';	  
import {IWGLBuffer}
	from './IWGLBuffer';	
import {IMgDevice}
	from '../mg/IMgDevice';	  
import {MgResult}
	from '../mg/MgResult';	  
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';
import {IMgDeviceMemory}
	from '../mg/IMgDeviceMemory';
import {MgImageCreateInfo}
	from '../mg/MgImageCreateInfo';  
import {IMgImage}
	from '../mg/IMgImage'; 
import {MgImageType}
	from '../mg/MgImageType';  
import {MgImageSubresource}
	from '../mg/MgImageSubresource';
import {MgSubresourceLayout}
	from '../mg/MgSubresourceLayout';  
import {MgImageViewCreateInfo}
	from '../mg/MgImageViewCreateInfo';  
import {IMgImageView}
	from '../mg/IMgImageView';
import {MgShaderModuleCreateInfo}
	from '../mg/MgShaderModuleCreateInfo';  
import {IMgShaderModule}
	from '../mg/IMgShaderModule'; 
import {IMgPipelineCache}
	from '../mg/IMgPipelineCache';  
import {MgGraphicsPipelineCreateInfo}
	from '../mg/MgGraphicsPipelineCreateInfo';           
import {WGLImage}
	from './WGLImage';	  
import {IWGLImage}
	from './IWGLImage';
import {WGLImageView}
	from './WGLImageView';
import {WGLShaderModule}
	from './pipeline/WGLShaderModule';
import {IMgPipeline}
	from '../mg/IMgPipeline';  
import {MgComputePipelineCreateInfo}
	from '../mg/MgComputePipelineCreateInfo';   
import {IWGLPipelineLayout}
	from './pipeline/IWGLPipelineLayout';	  
import {WGLInternalCacheArrayMapper}
	from './pipeline/WGLInternalCacheArrayMapper';
import {WGLInternalBlockCache}
	from './pipeline/WGLInternalBlockCache';	  	  
import {WGLGraphicsPipeline}
	from './pipeline/WGLGraphicsPipeline';
import {MgPipelineLayoutCreateInfo}
	from '../mg/MgPipelineLayoutCreateInfo';  
import {IMgPipelineLayout}
	from '../mg/IMgPipelineLayout';   
import {WGLPipelineLayout}
	from './pipeline/WGLPipelineLayout';	
import {MgSamplerCreateInfo}
	from '../mg/MgSamplerCreateInfo';  
import {IMgSampler}
	from '../mg/IMgSampler';   
import {WGLSampler}
	from './WGLSampler';
import {MgDescriptorSetLayoutCreateInfo}
	from '../mg/MgDescriptorSetLayoutCreateInfo';  
import {IMgDescriptorSetLayout}
	from '../mg/IMgDescriptorSetLayout';   
import {WGLDescriptorSetLayout}
	from './WGLDescriptorSetLayout';
import {MgDescriptorPoolCreateInfo}
	from '../mg/MgDescriptorPoolCreateInfo';  
import {IMgDescriptorPool}
	from '../mg/IMgDescriptorPool';   
import {MgDescriptorSetAllocateInfo}
	from '../mg/MgDescriptorSetAllocateInfo';  
import {IMgDescriptorSet}
	from '../mg/IMgDescriptorSet';   
import {MgWriteDescriptorSet}
	from '../mg/MgWriteDescriptorSet';  
import {MgCopyDescriptorSet}
	from '../mg/MgCopyDescriptorSet';
import {MgFramebufferCreateInfo}
	from '../mg/MgFramebufferCreateInfo';  
import {IMgFramebuffer}
	from '../mg/IMgFramebuffer';   
import {MgRenderPassCreateInfo}
	from '../mg/MgRenderPassCreateInfo';  
import {IMgRenderPass}
	from '../mg/IMgRenderPass';   
import {MgCommandPoolCreateInfo}
	from '../mg/MgCommandPoolCreateInfo';  
import {IMgCommandPool}
	from '../mg/IMgCommandPool';   
import {MgCommandBufferAllocateInfo}
	from '../mg/MgCommandBufferAllocateInfo';  
import {IMgCommandBuffer}
	from '../mg/IMgCommandBuffer';   
import {MgSwapchainCreateInfoKHR}
	from '../mg/MgSwapchainCreateInfoKHR';  
import {IMgSwapchainKHR}
	from '../mg/IMgSwapchainKHR';   
import {IMgSemaphore}
	from '../mg/IMgSemaphore';  
import {IMgFence}
	from '../mg/IMgFence';               
import {WGLFramebuffer}
	from './WGLFramebuffer';	  
import {WGLRenderPass}
	from './WGLRenderPass';
import {WGLCommandPool}
	from './WGLCommandPool';  	  
import {IWGLCommandPool}
	from './IWGLCommandPool';  	  
import {WGLCmdEncoderContextSorter}
	from './cmdbuf/WGLCmdEncoderContextSorter';
import {WGLDescriptorSetBinder}
	from './WGLDescriptorSetBinder';    
import {WGLCmdDescriptorSetEncodingSection}
	from './cmdbuf/WGLCmdDescriptorSetEncodingSection';
import {WGLCmdVertexArrayEncodingSection}
	from './cmdbuf/WGLCmdVertexArrayEncodingSection';
import {WGLCmdDrawEncodingSection}
	from './cmdbuf/WGLCmdDrawEncodingSection';	  
import {WGLCmdGraphicsEncoder}
	from './cmdbuf/WGLCmdGraphicsEncoder';
import {WGLCmdGraphicsBag}
	from './cmdbuf/WGLCmdGraphicsBag';	
import {WGLCmdComputeEncoder}
	from './cmdbuf/WGLCmdComputeEncoder';	  
import {WGLCmdBlitEncoder}
	from './cmdbuf/WGLCmdBlitEncoder';
import {WGLCmdBlitBag}
	from './cmdbuf/WGLCmdBlitBag';
import {WGLCmdCommandEncoder}
	from './cmdbuf/WGLCmdCommandEncoder';	  
import {IWGLCommandBuffer}
	from './cmdbuf/IWGLCommandBuffer';
import {WGLCmdCommandBuffer}
	from './cmdbuf/WGLCmdCommandBuffer';	
import {IWGLSwapchainKHR}
	from './IWGLSwapchainKHR';	  
import {MgSemaphoreCreateInfo}
	from '../mg/MgSemaphoreCreateInfo';  
import {MgFenceCreateInfo}
	from '../mg/MgFenceCreateInfo';   
import {IWGLSynchronizableFence}
	from './IWGLSynchronizableFence';
import {MgBufferCreateInfo}
	from '../mg/MgBufferCreateInfo';  
import {IWGLFenceSynchronizationEntrypoint} 
  from './entrypoint/IWGLFenceSynchronizationEntrypoint';
import {IWGLSyncObject}
	from './IWGLSyncObject';
import {WGLSyncTaskInfo}
	from './WGLSyncTaskInfo';	  	  	        

export class WGLDevice implements IWGLDevice {
  private mGL: WebGL2RenderingContext;
  private mQueue: IWGLQueue;
  private mEntrypoint: IWGLDeviceEntrypoint;
  private mDeviceMemoryMap: IWGLDeviceMemoryTypeMap;
  private mFenceSynchronization: IWGLFenceSynchronizationEntrypoint;

  constructor(
    gl: WebGL2RenderingContext
    ,queue: IWGLQueue
    , entrypoint: IWGLDeviceEntrypoint
    , deviceMemoryMap: IWGLDeviceMemoryTypeMap
    , fenceSynchonization: IWGLFenceSynchronizationEntrypoint
  ) {
    this.mGL = gl;
    this.mQueue = queue;
    this.mEntrypoint = entrypoint;
    this.mDeviceMemoryMap = deviceMemoryMap;
    this.mFenceSynchronization = fenceSynchonization;
  }

  destroyDevice(allocator : IMgAllocationCallbacks|null) : void {

  }

  getBufferMemoryRequirements (
    buffer: IMgBuffer
    , out: { pMemoryRequirements: MgMemoryRequirements|null}
  ) : void {
    if (buffer == null) {
      throw new Error ("pCreateInfo is null");
    }

    let internalBuffer = buffer as IWGLBuffer;

    let result = new MgMemoryRequirements();
    result.size = internalBuffer.requestedSize;
    result.memoryTypeBits
      = this.mDeviceMemoryMap.determineTypeIndex(internalBuffer.memoryType);    
    out.pMemoryRequirements = result; 
  }

  getDeviceQueue(queueFamilyIndex : number
    , queueIndex : number
    , out : {pQueue: IMgQueue}
  ) : void {
    out.pQueue = this.mQueue;
  }

  allocateMemory(pAllocateInfo : MgMemoryAllocateInfo
    , allocator : IMgAllocationCallbacks|null
    , out : { pMemory : IMgDeviceMemory|null }
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
    , out: { pLayout: MgSubresourceLayout|null }
  ) : void
  {
    let internalImage : IWGLImage = image as IWGLImage;

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
    , allocator: IMgAllocationCallbacks|null
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
    , allocator: IMgAllocationCallbacks|null
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

      let internalCache = new WGLInternalBlockCache(bLayout, blocks, arrayMapper);

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
    , allocator: IMgAllocationCallbacks|null
    , out: { pPipelines: Array<IMgPipeline>|null }
  ) : never {
    throw new Error('ERROR: not implemented');
  }

  createPipelineLayout(pCreateInfo: MgPipelineLayoutCreateInfo
    , allocator: IMgAllocationCallbacks|null
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
    , allocator: IMgAllocationCallbacks|null
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
    , allocator: IMgAllocationCallbacks|null
    , out: { pSetLayout: IMgDescriptorSetLayout|null }
  ) : MgResult {
    if (pCreateInfo == null) {
      throw new Error('ERROR: pCreateInfo is null');
    }

    out.pSetLayout  = new WGLDescriptorSetLayout (pCreateInfo); 
    return MgResult.SUCCESS;      
  }

  createDescriptorPool(pCreateInfo: MgDescriptorPoolCreateInfo
    , allocator: IMgAllocationCallbacks|null
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
    , allocator: IMgAllocationCallbacks|null
    , out: { pFramebuffer: IMgFramebuffer|null
    }) : MgResult {
      out.pFramebuffer = new WGLFramebuffer();
      return MgResult.SUCCESS;
    }

  createRenderPass(
    pCreateInfo: MgRenderPassCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pRenderPass: IMgRenderPass|null }
  ) : MgResult {
    if (pCreateInfo == null) {
      throw new Error('ERROR: pCreateInfo is null');
    }

    out.pRenderPass = new WGLRenderPass(pCreateInfo.attachments);
    return MgResult.SUCCESS; 
  }

  createCommandPool(pCreateInfo: MgCommandPoolCreateInfo
    , allocator: IMgAllocationCallbacks|null
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
      let instructions = new WGLCmdEncoderContextSorter();
      let dsBinder = new WGLDescriptorSetBinder();
      let descriptorSets = new WGLCmdDescriptorSetEncodingSection(dsBinder);        
      let vertexArrays = new WGLCmdVertexArrayEncodingSection(this.mEntrypoint.vertexArrays);
      let draws = new WGLCmdDrawEncodingSection(this.mGL);
      let graphics = new WGLCmdGraphicsEncoder(
        instructions
        , new WGLCmdGraphicsBag()          
        , descriptorSets
        , vertexArrays
        , draws);
      let compute = new WGLCmdComputeEncoder();
      let blit = new WGLCmdBlitEncoder(
        instructions
        , new WGLCmdBlitBag()
        , this.mEntrypoint.imageFormat);
      let encoder = new WGLCmdCommandEncoder(instructions, graphics, compute, blit);

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
    , allocator: IMgAllocationCallbacks|null
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

    let sc = swapchain as IWGLSwapchainKHR;
    out.pImageIndex = sc.getNextImage ();
    // TODO : fence stuff
    return MgResult.SUCCESS;
  }

  createSemaphore(pCreateInfo: MgSemaphoreCreateInfo
      , allocator: IMgAllocationCallbacks|null
      , out: { pSemaphore: IMgSemaphore|null }) : MgResult {
    out.pSemaphore = this.mEntrypoint.semaphores.createSemaphore();
    return MgResult.SUCCESS;
  }

  createFence(pCreateInfo: MgFenceCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { fence: IMgFence|null}
  )  : MgResult {
    out.fence = this.mEntrypoint.fences.createFence();
    return MgResult.SUCCESS;        
  }       

  resetFences(pFences: Array<IMgFence>) : MgResult {
    for (let fence of pFences) {
        let bFence = fence as IWGLSynchronizableFence;
        bFence.syncObject.reset();
    }
    return MgResult.SUCCESS; 
  }

  getFenceStatus(
    fence: IMgFence
  ) : MgResult{
      let bFence = fence as IWGLSynchronizableFence;
      return (bFence.syncObject.isSignalled) 
        ? MgResult.SUCCESS 
        : MgResult.NOT_READY;
  }

  // // WARN: timeout requires UInt64
  waitForFences(
    pFences: Array<IMgFence>
    , waitAll:boolean
    , timeout: number
  ) : Promise<MgResult> {
    let syncObjects = Array<IWGLSyncObject>();
    for (let fence of pFences) {
      let item = fence as IWGLSynchronizableFence;
      syncObjects.push(item.syncObject);
    }
    
    return new Promise<MgResult>((resolve) => 
      {	
        let syncTask = new WGLSyncTaskInfo(
          resolve
          , syncObjects
          , waitAll
          , timeout
          , this.mFenceSynchronization.incrementalTimeoutStep
        );
        syncTask.schedule();        
      }
    );
  }    

  createBuffer(
    pCreateInfo: MgBufferCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { pBuffer:IMgBuffer|null}
  ) : MgResult {
    out.pBuffer = this.mEntrypoint.buffers.createBuffer(pCreateInfo);
    return MgResult.SUCCESS;
  }
}
