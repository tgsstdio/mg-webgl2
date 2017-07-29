import {IMgDevice}
	from './IMgDevice';	  
import {MgResult}
	from './MgResult';	  
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	
import {IMgQueue}
	from './IMgQueue';	  
import {MgMemoryAllocateInfo}
	from './MgMemoryAllocateInfo';  
import {IMgDeviceMemory}
	from './IMgDeviceMemory';	  
import {MgImageCreateInfo}
	from './MgImageCreateInfo';
import {IMgImage}
	from './IMgImage';	  
import {MgImageSubresource}
	from './MgImageSubresource';	    
import {MgSubresourceLayout}
	from './MgSubresourceLayout';	  
import {MgImageViewCreateInfo}
	from './MgImageViewCreateInfo';
import {IMgImageView}
	from './IMgImageView';	  
import {MgShaderModuleCreateInfo}
	from './MgShaderModuleCreateInfo'; 
import {IMgShaderModule}
	from './IMgShaderModule';	  
import {IMgPipelineCache}
	from './IMgPipelineCache'; 
import {MgGraphicsPipelineCreateInfo}
	from './MgGraphicsPipelineCreateInfo';	  
import {IMgPipeline}
	from './IMgPipeline';    	     	  
import {MgComputePipelineCreateInfo}
	from './MgComputePipelineCreateInfo'; 
import {MgPipelineLayoutCreateInfo}
	from './MgPipelineLayoutCreateInfo';	  
import {IMgPipelineLayout}
	from './IMgPipelineLayout'; 
import {MgSamplerCreateInfo}
	from './MgSamplerCreateInfo'; 
import {IMgSampler}
	from './IMgSampler';	  
import {MgDescriptorSetLayoutCreateInfo}
	from './MgDescriptorSetLayoutCreateInfo';    
import {IMgDescriptorSetLayout}
	from './IMgDescriptorSetLayout'; 
import {MgDescriptorPoolCreateInfo}
	from './MgDescriptorPoolCreateInfo';	  
import {IMgDescriptorPool}
	from './IMgDescriptorPool';
import {MgDescriptorSetAllocateInfo}
	from './MgDescriptorSetAllocateInfo';	  
import {IMgDescriptorSet}
	from './IMgDescriptorSet';	
import {MgWriteDescriptorSet}
	from './MgWriteDescriptorSet';	  
import {MgCopyDescriptorSet}
	from './MgCopyDescriptorSet';	
import {MgFramebufferCreateInfo}
	from './MgFramebufferCreateInfo';	  
import {IMgFramebuffer}
	from './IMgFramebuffer';	
import {MgRenderPassCreateInfo}
	from './MgRenderPassCreateInfo';	  
import {IMgRenderPass}
	from './IMgRenderPass';	
import {MgCommandPoolCreateInfo}
	from './MgCommandPoolCreateInfo';	  
import {IMgCommandPool}
	from './IMgCommandPool';
import {MgCommandBufferAllocateInfo}
	from './MgCommandBufferAllocateInfo';	  
import {IMgCommandBuffer}
	from './IMgCommandBuffer';
import {MgSwapchainCreateInfoKHR}
	from './MgSwapchainCreateInfoKHR';	  
import {IMgSwapchainKHR}
	from './IMgSwapchainKHR';	 
import {IMgSemaphore}
	from './IMgSemaphore';	  
import {IMgFence}
	from './IMgFence';	 
import {MgSemaphoreCreateInfo}
	from './MgSemaphoreCreateInfo';	  
import {MgFenceCreateInfo}
	from './MgFenceCreateInfo';
import {IMgBuffer}
	from './IMgBuffer';	  
import {MgMemoryRequirements}
	from './MgMemoryRequirements';
import {MgBufferCreateInfo}
	from './MgBufferCreateInfo';	        	  	                

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
    , out: { pRenderPass: IMgRenderPass|null }) : MgResult;

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
    , timeout: number) : Promise<MgResult>;

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
