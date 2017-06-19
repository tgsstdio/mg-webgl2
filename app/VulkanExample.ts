/*
* Translation into C# and Magnesium interface 2016
* Vulkan Example - Basic indexed triangle rendering by 2016 by Copyright (C) Sascha Willems - www.saschawillems.de
*
* This code is licensed under the MIT license (MIT) (http://opensource.org/licenses/MIT)
*/

namespace TriangleDemo {
  // Vertex buffer and attributes
  class VertexBufferInfo {
    memory: Magnesium.IMgDeviceMemory;	// Handle to the device memory for this buffer
    buffer: Magnesium.IMgBuffer; // Handle to the Vulkan buffer object that the memory is bound to
    inputState: Magnesium.MgPipelineVertexInputStateCreateInfo 
    inputBinding: Magnesium.MgVertexInputBindingDescription;
    inputAttributes: Array<Magnesium.MgVertexInputAttributeDescription>;
  }

  class IndicesInfo {
    memory: Magnesium.IMgDeviceMemory;
    buffer: Magnesium.IMgBuffer;
    count: number;
  }

  // Uniform block object
  class UniformData {
    memory: Magnesium.IMgDeviceMemory|null;
    buffer:Magnesium.IMgBuffer|null;
    descriptor: Magnesium.MgDescriptorBufferInfo;
  }

  class UniformBufferObject {
    projectionMatrix: Array<number>;
    modelMatrix: Array<number>;
    viewMatrix: Array<number>;
  }

  class StagingBuffer {
    memory: Magnesium.IMgDeviceMemory;
    buffer: Magnesium.IMgBuffer;
  }

  class TriangleVertex {
    position: Array<number>;
    color: Array<number>;
  }

  interface ITriangleDemoShaderPath {
    openVertexShader(): string;
    openFragmentShader(): string;
  }

  export class VulkanExample {
    vertices: VertexBufferInfo = new VertexBufferInfo();

    indices: IndicesInfo = new IndicesInfo();

    uboVS: UniformBufferObject;

    uniformDataVS: UniformData = new UniformData();

    // The pipeline layout is used by a pipline to access the descriptor sets 
    // It defines interface (without binding any actual data) between the shader stages used by the pipeline and the shader resources
    // A pipeline layout can be shared among multiple pipelines as long as their interfaces match
    mPipelineLayout: Magnesium.IMgPipelineLayout;

    // Pipelines (often called "pipeline state objects") are used to bake all states that affect a pipeline
    // While in OpenGL every state can be changed at (almost) any time, Vulkan requires to layout the graphics (and compute) pipeline states upfront
    // So for each combination of non-dynamic pipeline states you need a new pipeline (there are a few exceptions to this not discussed here)
    // Even though this adds a new dimension of planing ahead, it's a great opportunity for performance optimizations by the driver
    mPipeline: Magnesium.IMgPipeline;

    // The descriptor set layout describes the shader binding layout (without actually referencing descriptor)
    // Like the pipeline layout it's pretty much a blueprint and can be used with different descriptor sets as long as their layout matches
    mDescriptorSetLayout: Magnesium.IMgDescriptorSetLayout;

    // The descriptor set stores the resources bound to the binding points in a shader
    // It connects the binding points of the different shaders with the buffers and images used for those bindings
    mDescriptorSet: Magnesium.IMgDescriptorSet;

    // Synchronization primitives
    // Synchronization is an important concept of Vulkan that OpenGL mostly hid away. Getting this right is crucial to using Vulkan.

    // Semaphores
    // Used to coordinate operations within the graphics queue and ensure correct command ordering
    mPresentCompleteSemaphore: Magnesium.IMgSemaphore;
    mRenderCompleteSemaphore: Magnesium.IMgSemaphore;

    // Fences
    // Used to check the completion of queue operations (e.g. command buffer execution)
    private mWaitFences = new Array<Magnesium.IMgFence>();

    private mWidth: number;
    private mHeight: number;

    private mDescriptorPool: Magnesium.IMgDescriptorPool;
    private mPrePresentCmdBuffer: Magnesium.IMgCommandBuffer;
    private mPostPresentCmdBuffer: Magnesium.IMgCommandBuffer;

    private mConfiguration: Magnesium.IMgGraphicsConfiguration;
    private mSwapchains: Magnesium.IMgSwapchainCollection;
    private mGraphicsDevice: Magnesium.IMgGraphicsDevice;
    private mPresentationLayer: Magnesium.IMgPresentationLayer;
    private mTrianglePath: ITriangleDemoShaderPath;

    constructor (
      configuration: Magnesium.IMgGraphicsConfiguration
      ,swapchains: Magnesium.IMgSwapchainCollection
      ,graphicsDevice: Magnesium.IMgGraphicsDevice
      ,presentationLayer: Magnesium.IMgPresentationLayer
      ,shaderPath: ITriangleDemoShaderPath
    ) {
      this.mConfiguration = configuration;
      this.mSwapchains = swapchains;
      this.mGraphicsDevice = graphicsDevice;
      this.mPresentationLayer = presentationLayer;
      this.mTrianglePath = shaderPath;

      this.mWidth = 1280;
      this.mHeight = 720;

      this.mConfiguration.initialize(this.mWidth, this.mHeight);
      this.initSwapchain(this.mWidth, this.mHeight);
      this.prepare();
    }

    private initSwapchain(
      width:number
      , height:number
    ): void {
      
      const NO_OF_BUFFERS = 1;
      let buffers = new Array<Magnesium.IMgCommandBuffer>(NO_OF_BUFFERS);
      let pAllocateInfo = new Magnesium.MgCommandBufferAllocateInfo();      
      pAllocateInfo.commandBufferCount = NO_OF_BUFFERS;
      pAllocateInfo.commandPool = this.mConfiguration.partition.commandPool;
      pAllocateInfo.level = Magnesium.MgCommandBufferLevel.PRIMARY;      

      this.mConfiguration.device.allocateCommandBuffers(pAllocateInfo, buffers);

      let createInfo = new Magnesium.MgGraphicsDeviceCreateInfo();      
      createInfo.samples = Magnesium.MgSampleCountFlagBits.COUNT_1_BIT;
      createInfo.width = this.mWidth;
      createInfo.height = this.mHeight;      

      let setupCmdBuffer = buffers[0];
      let cmdBufInfo = new Magnesium.MgCommandBufferBeginInfo();

      let err = setupCmdBuffer.beginCommandBuffer(cmdBufInfo);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      this.mGraphicsDevice.create(
        setupCmdBuffer
        , this.mSwapchains
        , createInfo);

      err = setupCmdBuffer.endCommandBuffer();
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      
      let submission = new Array<Magnesium.MgSubmitInfo>(1);
      let submit = new Magnesium.MgSubmitInfo();
      submit.commandBuffers = new Array<Magnesium.IMgCommandBuffer>(1);
      submit.commandBuffers[0] = buffers[0];
      submission[0] = submit;

      err = this.mConfiguration.queue.queueSubmit(submission, null);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      this.mConfiguration.queue.queueWaitIdle();

      this.mConfiguration.device.freeCommandBuffers(
        this.mConfiguration.partition.commandPool, buffers);
    }

    private mPrepared:boolean = false;
    private prepare() : void {
      this.beforePrepare();

      this.prepareSynchronizationPrimitives();
      this.prepareVertices();
      this.prepareUniformBuffers();
      this.setupDescriptorSetLayout();
      this.preparePipelines();
      this.setupDescriptorPool();
      this.setupDescriptorSet();
      this.buildCommandBuffers();
      this.mPrepared = true;
    }

    private beforePrepare(): void {
      this.createCommandBuffers();
    }

    // Create the Vulkan synchronization primitives used in this example
    drawCmdBuffers: Array<Magnesium.IMgCommandBuffer>;

    private prepareSynchronizationPrimitives(): void {
      // Semaphores (Used for correct command ordering)
      let semaphoreCreateInfo = new Magnesium.MgSemaphoreCreateInfo();

      // Semaphore used to ensures that image presentation is complete before starting to submit again
      let outPresentComplete 
        : {pSemaphore:Magnesium.IMgSemaphore|null}
        = { pSemaphore: null };

      let err = this.mConfiguration.device.createSemaphore(
        semaphoreCreateInfo
        , null
        , outPresentComplete);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      this.mPresentCompleteSemaphore = outPresentComplete.pSemaphore as Magnesium.IMgSemaphore;


      // Semaphore used to ensures that all commands submitted have been finished before submitting the image to the queue
      let outRenderComplete 
        : {pSemaphore:Magnesium.IMgSemaphore|null}
        = { pSemaphore: null };

      err = this.mConfiguration.device.createSemaphore(
        semaphoreCreateInfo
        , null
        , outRenderComplete);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      this.mRenderCompleteSemaphore = outRenderComplete.pSemaphore as Magnesium.IMgSemaphore;

      // Fences (Used to check draw command buffer completion)
      let fenceCreateInfo = new Magnesium.MgFenceCreateInfo();
      fenceCreateInfo.flags = Magnesium.MgFenceCreateFlagBits.SIGNALED_BIT;

      // Create in signaled state so we don't wait on first render of each command buffer
      let noOfCommandBuffers = this.drawCmdBuffers.length; // TODO: drawCmdBuffers.Length;
      for (let i = 0; i < noOfCommandBuffers; i += 1) {
        let outFence
          : {fence: Magnesium.IMgFence|null}
          = {fence:null};
        err = this.mConfiguration.device.createFence(fenceCreateInfo, null, outFence);
        if (err != Magnesium.MgResult.SUCCESS) {
          throw new Error(err.toString());
        }
        this.mWaitFences.push(outFence.fence as Magnesium.IMgFence);
      }
    }

    private prepareStagingVertices(
      vertexBuffer: Array<TriangleVertex>
      , vertexBufferSize: number
    ): StagingBuffer {
      // HOST_VISIBLE STAGING Vertex buffer
      
      let vertexBufferInfo = new Magnesium.MgBufferCreateInfo();
      vertexBufferInfo.size = vertexBufferSize;
      // Buffer is used as the copy source
      vertexBufferInfo.usage = Magnesium.MgBufferUsageFlagBits.TRANSFER_SRC_BIT;          

      // Create a host-visible buffer to copy the vertex data to (staging buffer)
      let outBuffer 
        : {pBuffer:Magnesium.IMgBuffer|null}
        = {pBuffer:null};
      let err = this.mConfiguration.device.createBuffer(vertexBufferInfo, null, outBuffer );
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      let sb = new StagingBuffer;
      sb.buffer = outBuffer.pBuffer as Magnesium.IMgBuffer;

      let outMemReq 
        : {pMemoryRequirements:Magnesium.MgMemoryRequirements|null}
        = {pMemoryRequirements:null};
        this.mConfiguration.device.getBufferMemoryRequirements(
          sb.buffer
          , outMemReq);       

      // Request a host visible memory type that can be used to copy our data do
      // Also request it to be coherent, so that writes are visible to the GPU right after unmapping the buffer
      let memReqs = outMemReq.pMemoryRequirements as Magnesium.MgMemoryRequirements;
      let outTypeIndex = {typeIndex:0};
      let isValid: boolean = this.mConfiguration.partition.getMemoryType(
        memReqs.memoryTypeBits
        , Magnesium.MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT
          | Magnesium.MgMemoryPropertyFlagBits.HOST_COHERENT_BIT
        , outTypeIndex);

      if (!isValid) {
        throw new Error('getMemoryType');
      }

      let memAlloc = new Magnesium.MgMemoryAllocateInfo();        
      memAlloc.allocationSize = memReqs.size;
      memAlloc.memoryTypeIndex = outTypeIndex.typeIndex;

      let outMemory 
        : {pMemory:Magnesium.IMgDeviceMemory|null}
        = {pMemory:null};
      err = this.mConfiguration.device.allocateMemory(
        memAlloc
        , null
        , outMemory);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      sb.memory = outMemory.pMemory as Magnesium.IMgDeviceMemory;        

      // Map and copy
      let outData
        : {ppData:ArrayBufferView|null}
        = {ppData:null};
      err = sb.memory.mapMemory(
        this.mConfiguration.device
        , 0
        , memAlloc.allocationSize
        , 0
        , outData);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      // TODO: something here
      // let offset = 0;
      // for (let vertex of vertexBuffer) {
      //   IntPtr dest = IntPtr.Add(data, offset);
      //   Marshal.StructureToPtr(vertex, dest, false);
      //   offset += structSize;
      // }

      sb.memory.unmapMemory(
        this.mConfiguration.device);

      sb.buffer.bindBufferMemory(
        this.mConfiguration.device
        , sb.memory
        , 0);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err);
      }
      return sb;
    }

    // DEVICE_LOCAL Vertex buffer
    private setupDeviceLocalVertices(
      vertexBufferSize: number
    ): void {
      let vertexBufferInfo = new Magnesium.MgBufferCreateInfo();
      vertexBufferInfo.size = vertexBufferSize;
      // Create a device local buffer to which the (host local) vertex data will be copied and which will be used for rendering
      vertexBufferInfo.usage = 
        Magnesium.MgBufferUsageFlagBits.VERTEX_BUFFER_BIT
        | Magnesium.MgBufferUsageFlagBits.TRANSFER_DST_BIT;

      let outVertex
        : { pBuffer:Magnesium.IMgBuffer|null}
        = { pBuffer:null };
      let err = this.mConfiguration.device.createBuffer(
        vertexBufferInfo
        , null
        , outVertex);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      this.vertices.buffer = outVertex.pBuffer as Magnesium.IMgBuffer;

      let outMemReqs
       : {pMemoryRequirements:Magnesium.MgMemoryRequirements|null} 
       = {pMemoryRequirements:null};
      this.mConfiguration.device.getBufferMemoryRequirements(
        this.vertices.buffer, outMemReqs);
      let memReqs = outMemReqs.pMemoryRequirements as Magnesium.MgMemoryRequirements;

      let outTypeIndex 
        : {typeIndex:number}
        = {typeIndex:0};
      let isValid = this.mConfiguration.partition.getMemoryType(
        memReqs.memoryTypeBits
        , Magnesium.MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
        , outTypeIndex);
      if (!isValid) {
        throw new Error('getMemoryType');
      }

      let memAlloc = new Magnesium.MgMemoryAllocateInfo();
      memAlloc.allocationSize = memReqs.size;
      memAlloc.memoryTypeIndex = outTypeIndex.typeIndex;

      let outMemory
        : {pMemory:Magnesium.IMgDeviceMemory|null}
        = {pMemory:null};
      err = this.mConfiguration.device.allocateMemory(
        memAlloc
        , null
        , outMemory);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      this.vertices.memory = outMemory.pMemory as Magnesium.IMgDeviceMemory;

      err = this.vertices.buffer.bindBufferMemory(
        this.mConfiguration.device
        , this.vertices.memory
        , 0);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
    }

    // HOST_VISIBLE Index buffer
    private prepareStagingIndices(
      indexBufferSize: number
    ) : StagingBuffer {
      let indexbufferInfo = new Magnesium.MgBufferCreateInfo();
      indexbufferInfo.size = indexBufferSize;
      indexbufferInfo.usage = Magnesium.MgBufferUsageFlagBits.TRANSFER_SRC_BIT;

      // Copy index data to a buffer visible to the host (staging buffer)
      let outBuffer 
        : {pBuffer:Magnesium.IMgBuffer|null}
        = {pBuffer:null};
      let err = this.mConfiguration.device.createBuffer(
        indexbufferInfo
        , null
        , outBuffer);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      let sb = new StagingBuffer();
      sb.buffer = outBuffer.pBuffer as Magnesium.IMgBuffer;

      let outMemReqs
        : {pMemoryRequirements:Magnesium.MgMemoryRequirements|null}
        = {pMemoryRequirements:null};
      this.mConfiguration.device.getBufferMemoryRequirements(
        sb.buffer
        , outMemReqs);
      let memReqs = outMemReqs.pMemoryRequirements as Magnesium.MgMemoryRequirements;

      let outTypeIndex
        : {typeIndex:number}
        = {typeIndex:0};
      let isValid = this.mConfiguration.partition.getMemoryType(
        memReqs.memoryTypeBits
        , Magnesium.MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT
         | Magnesium.MgMemoryPropertyFlagBits.HOST_COHERENT_BIT
        ,outTypeIndex);
      if (!isValid) {
        throw new Error('getMemoryType');
      }

      let memAlloc = new Magnesium.MgMemoryAllocateInfo();
      memAlloc.allocationSize = memReqs.size;
      memAlloc.memoryTypeIndex = outTypeIndex.typeIndex;

      let outMemory
        : {pMemory:Magnesium.IMgDeviceMemory|null}         
        = {pMemory:null};
      err = this.mConfiguration.device.allocateMemory(
        memAlloc
        , null
        , outMemory);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      sb.memory = outMemory.pMemory as Magnesium.IMgDeviceMemory;

      let outData
        : {ppData: ArrayBufferView|null}
        = {ppData: null};
      err = sb.memory.mapMemory(
        this.mConfiguration.device
        , 0
        , indexBufferSize
        , 0
        , outData);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      let data = outData.ppData as ArrayBufferView;

      let uintBuffer = new Uint8Array(indexBufferSize);

      // TODO: copy here
      // let bufferSize = indexBufferSize;
      // Buffer.BlockCopy(indexBuffer, 0, uintBuffer, 0, bufferSize);
      // Marshal.Copy(uintBuffer, 0, outData, bufferSize);

      sb.memory.unmapMemory(this.mConfiguration.device);

      err = sb.buffer.bindBufferMemory(
        this.mConfiguration.device
        , sb.memory
        , 0);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      return sb;
    }

    // DEVICE_LOCAL index buffer
    private setupDeviceLocalIndices(
      indexBufferSize: number
    ) : void {
      // Create destination buffer with device only visibility
      let indexbufferInfo = new Magnesium.MgBufferCreateInfo();
      indexbufferInfo.size = indexBufferSize;
      indexbufferInfo.usage = 
        Magnesium.MgBufferUsageFlagBits.INDEX_BUFFER_BIT
        | Magnesium.MgBufferUsageFlagBits.TRANSFER_DST_BIT;

      let outBuffer
        : {pBuffer:Magnesium.IMgBuffer|null}
        = {pBuffer:null};
      let err = this.mConfiguration.device.createBuffer(
        indexbufferInfo
        , null
        , outBuffer);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      this.indices.buffer = outBuffer.pBuffer as Magnesium.IMgBuffer;

      let outMemReqs
        : {pMemoryRequirements:Magnesium.MgMemoryRequirements|null}
        = {pMemoryRequirements:null};
      this.mConfiguration.device.getBufferMemoryRequirements(
        this.indices.buffer
        , outMemReqs);

      let memReqs
        = outMemReqs.pMemoryRequirements as Magnesium.MgMemoryRequirements;
      let outTypeIndex
        : {typeIndex:number}
        = {typeIndex:0};
      let isValid = this.mConfiguration.partition.getMemoryType(
        memReqs.memoryTypeBits
        , Magnesium.MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
        , outTypeIndex);
      if (!isValid) {
        throw new Error('getMemoryType');
      }

      let memAlloc = new Magnesium.MgMemoryAllocateInfo();
      memAlloc.allocationSize = memReqs.size;
      memAlloc.memoryTypeIndex = outTypeIndex.typeIndex;

      let outMemory
        : {pMemory:Magnesium.IMgDeviceMemory|null}
        = {pMemory:null};
      err = this.mConfiguration.device.allocateMemory(
        memAlloc
        , null
        , outMemory);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      this.indices.memory
        = outMemory.pMemory as Magnesium.IMgDeviceMemory;

      err = this.indices.buffer.bindBufferMemory(
        this.mConfiguration.device
        , this.indices.memory
        , 0);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
    }

    // Get a new command buffer from the command pool
    // If begin is true, the command buffer is also started so we can start adding commands
    private getCommandBuffer(begin: boolean) : Magnesium.IMgCommandBuffer {
      let buffers = new Array<Magnesium.IMgCommandBuffer>(1);

      let cmdBufAllocateInfo = new Magnesium.MgCommandBufferAllocateInfo();
      cmdBufAllocateInfo.commandPool = this.mConfiguration.partition.commandPool;
      cmdBufAllocateInfo.level =  Magnesium.MgCommandBufferLevel.PRIMARY,
      cmdBufAllocateInfo.commandBufferCount = 1;

      let err = this.mConfiguration.device.allocateCommandBuffers(
        cmdBufAllocateInfo
        , buffers);

      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      let cmdBuf = buffers[0];

      // If requested, also start the new command buffer
      if (begin)
      {
        let cmdBufInfo = new Magnesium.MgCommandBufferBeginInfo();

        err = cmdBuf.beginCommandBuffer(cmdBufInfo);
        if (err != Magnesium.MgResult.SUCCESS) {
          throw new Error(err.toString());
        }
      }

      return cmdBuf;
    }

    private prepareStagingCommandBuffers(
      stagingVertices: StagingBuffer
      , stagingIndices: StagingBuffer
      , vertexSize: number
      , indexBufferSize: number
    ) {
      let cmdBufferBeginInfo = new Magnesium.MgCommandBufferBeginInfo();

      // Buffer copies have to be submitted to a queue, so we need a command buffer for them
      // Note: Some devices offer a dedicated transfer queue (with only the transfer bit set) that may be faster when doing lots of copies
      let copyCmd: Magnesium.IMgCommandBuffer
        = this.getCommandBuffer(true);

      // Put buffer region copies into command buffer

      let vertRegion = new Magnesium.MgBufferCopy();
      vertRegion.size = vertexSize;
      // Vertex buffer
      copyCmd.cmdCopyBuffer(stagingVertices.buffer, this.vertices.buffer, [vertRegion]);

      let indexRegion = new Magnesium.MgBufferCopy();
      indexRegion.size = indexBufferSize;
      // Index buffer
      let dstBuffer = this.indices.buffer as Magnesium.IMgBuffer;
      copyCmd.cmdCopyBuffer(stagingIndices.buffer, dstBuffer, [indexRegion]);

      // Flushing the command buffer will also submit it to the queue and uses a fence to ensure that all commands have been executed before returning
      this.flushCommandBuffer(copyCmd);

      // Destroy staging buffers
      // Note: Staging buffer must not be deleted before the copies have been submitted and executed
      stagingVertices.buffer.destroyBuffer(
        this.mConfiguration.device, null);
      stagingVertices.memory.freeMemory(
        this.mConfiguration.device, null);
      stagingIndices.buffer.destroyBuffer(
        this.mConfiguration.device, null);
      stagingIndices.memory.freeMemory(
        this.mConfiguration.device, null);
    }

    // End the command buffer and submit it to the queue
    // Uses a fence to ensure command buffer has finished executing before deleting it
    flushCommandBuffer(
      commandBuffer: Magnesium.IMgCommandBuffer|null
    ) : void {
      if (commandBuffer == null) {
        return;
      }

      let err = commandBuffer.endCommandBuffer();
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      let submitInfo = new Magnesium.MgSubmitInfo();
      submitInfo.commandBuffers = [commandBuffer];

      // Create fence to ensure that the command buffer has finished executing
      let fenceCreateInfo = new Magnesium.MgFenceCreateInfo();


      let outFence
        : {fence:Magnesium.IMgFence|null} 
        = {fence:null};
      err = this.mConfiguration.device.createFence(fenceCreateInfo, null, outFence);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      // Submit to the queue
      let fence = outFence.fence  as Magnesium.IMgFence;
      err = this.mConfiguration.queue.queueSubmit([submitInfo], fence);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      // Magnesium.Mg.OpenGL
      err = this.mConfiguration.queue.queueWaitIdle();
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      // Wait for the fence to signal that command buffer has finished executing
      const MAX_VALUE = Number.MAX_SAFE_INTEGER;
      err = this.mConfiguration.device.waitForFences(
        [fence]
        , true
        , MAX_VALUE);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      fence.destroyFence(this.mConfiguration.device, null);
      this.mConfiguration.device.freeCommandBuffers(
        this.mConfiguration.partition.commandPool
        , [commandBuffer]);
    }    

    // Prepare vertex and index buffers for an indexed triangle
    // Also uploads them to device local memory using staging and initializes vertex input and attribute binding to match the vertex shader
    private prepareVertices(): void {
      // A note on memory management in Vulkan in general:
      //	This is a very complex topic and while it's fine for an example application to to small individual memory allocations that is not
      //	what should be done a real-world application, where you should allocate large chunkgs of memory at once isntead.

      // Setup vertices
      let vertexBuffer = new Array<TriangleVertex>(3);
      
      vertexBuffer[0] = new TriangleVertex();
      vertexBuffer[0].position = [1.0, 1.0, 0.0];  
      vertexBuffer[0].color = [1.0, 0.0, 0.0];    

      vertexBuffer[1] = new TriangleVertex();
      vertexBuffer[1].position = [-1.0,  1.0, 0.0];  
      vertexBuffer[1].color = [0.0, 1.0, 0.0];

      vertexBuffer[2] = new TriangleVertex();
      vertexBuffer[2].position = [0.0, -1.0, 0.0];  
      vertexBuffer[2].color = [0.0, 0.0, 1.0];

      const F32_MEMBER_SIZE = 4;
      let structSize = 2 * 3 * F32_MEMBER_SIZE; // 2 * (3 * 4 bytes)
      let vertexBufferSize = vertexBuffer.length * structSize;

      // Setup indices      
      let indexBuffer: Uint32Array = new Uint32Array([ 0, 1, 2 ]);
      this.indices.count = indexBuffer.length;
      const UINT32_MEMBER_SIZE = 4;
      let indexBufferSize = this.indices.count * UINT32_MEMBER_SIZE;

      // Static data like vertex and index buffer should be stored on the device memory 
      // for optimal (and fastest) access by the GPU
      //
      // To achieve this we use so-called "staging buffers" :
      // - Create a buffer that's visible to the host (and can be mapped)
      // - Copy the data to this buffer
      // - Create another buffer that's local on the device (VRAM) with the same size
      // - Copy the data from the host to the device using a command buffer
      // - Delete the host visible (staging) buffer
      // - Use the device local buffers for rendering
      let stagingVertices = this.prepareStagingVertices(
        vertexBuffer
        , vertexBufferSize
      );

      this.setupDeviceLocalVertices(vertexBufferSize);

      let stagingIndices = this.prepareStagingIndices(
        indexBufferSize);
      
      this.setupDeviceLocalIndices(indexBufferSize);

      this.prepareStagingCommandBuffers(
        stagingVertices
        , stagingIndices
        , vertexBufferSize
        , indexBufferSize
      );

      // Vertex input binding
      const VERTEX_BUFFER_BIND_ID = 0;

      let inputBinding = new Magnesium.MgVertexInputBindingDescription();
      inputBinding.binding = VERTEX_BUFFER_BIND_ID;
      inputBinding.stride = structSize;
      inputBinding.inputRate = Magnesium.MgVertexInputRate.VERTEX;
      this.vertices.inputBinding = inputBinding;

      // Inpute attribute binding describe shader attribute locations and memory layouts
      // These match the following shader layout (see triangle.vert):
      //	layout (location = 0) in vec3 inPos;
      //	layout (location = 1) in vec3 inColor;

      let vertexSize = 3 * F32_MEMBER_SIZE;

      // Attribute location 0: Position
      let positionAttr = new Magnesium.MgVertexInputAttributeDescription();
      positionAttr.binding = VERTEX_BUFFER_BIND_ID;
      positionAttr.location = 0;
      positionAttr.format =  Magnesium.MgFormat.R32G32B32_SFLOAT;
      positionAttr.offset = 0;

      // Attribute location 1: Color
      let colorAttr = new Magnesium.MgVertexInputAttributeDescription();
      colorAttr.binding = VERTEX_BUFFER_BIND_ID;
      colorAttr.location = 1;
      colorAttr.format =  Magnesium.MgFormat.R32G32B32_SFLOAT;
      // NOTE : OFFSET OF DATA SHOULD BE MULTIPLE OF format
      colorAttr.offset = vertexSize;

      this.vertices.inputAttributes = [positionAttr, colorAttr];

      // Assign to the vertex input state used for pipeline creation
      let inputState = new Magnesium.MgPipelineVertexInputStateCreateInfo();
      inputState.vertexBindingDescriptions = [this.vertices.inputBinding];
      inputState.vertexAttributeDescriptions = this.vertices.inputAttributes;               
      this.vertices.inputState = inputState;
    }

    private prepareUniformBuffers() : void {

      // let structSize = Marshal.SizeOf(typeof(UniformBufferObject));
      let structSize = 3 * 16 * 4;

      // Vertex shader uniform buffer block
      let bufferInfo = new Magnesium.MgBufferCreateInfo();
      bufferInfo.size = structSize;
      // This buffer will be used as a uniform buffer
      bufferInfo.usage = Magnesium.MgBufferUsageFlagBits.UNIFORM_BUFFER_BIT;

      // Create a new buffer
      let outBuffer 
        : {pBuffer:Magnesium.IMgBuffer|null}
        = {pBuffer:null};
      let err = this.mConfiguration.device.createBuffer(
        bufferInfo
        , null
        , outBuffer);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      let buffer = outBuffer.pBuffer as Magnesium.IMgBuffer;

      // Prepare and initialize a uniform buffer block containing shader uniforms
      // Single uniforms like in OpenGL are no longer present in Vulkan. All Shader uniforms are passed via uniform buffer blocks
      let outMemReqs 
        : {pMemoryRequirements:Magnesium.MgMemoryRequirements|null}
        = {pMemoryRequirements:null};      
      // Get memory requirements including size, alignment and memory type 
      this.mConfiguration.device.getBufferMemoryRequirements(
        buffer
        , outMemReqs);
      let memReqs = outMemReqs.pMemoryRequirements as Magnesium.MgMemoryRequirements;

      // Get the memory type index that supports host visibile memory access
      // Most implementations offer multiple memory types and selecting the correct one to allocate memory from is crucial
      // We also want the buffer to be host coherent so we don't have to flush (or sync after every update.
      // Note: This may affect performance so you might not want to do this in a real world application that updates buffers on a regular base
      let outTypeIndex
        : {typeIndex:number}
        = {typeIndex:0};

      let isValid = this.mConfiguration.partition.getMemoryType(
        memReqs.memoryTypeBits
        , Magnesium.MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT
          | Magnesium.MgMemoryPropertyFlagBits.HOST_COHERENT_BIT
        , outTypeIndex);
      if (!isValid) {
        throw new Error('getMemoryType');
      }

      let allocInfo = new Magnesium.MgMemoryAllocateInfo();
      allocInfo.allocationSize = memReqs.size;
      allocInfo.memoryTypeIndex = outTypeIndex.typeIndex;

      // Allocate memory for the uniform buffer
      let outMemory
        : {pMemory:Magnesium.IMgDeviceMemory|null} 
        = {pMemory:null};
      err = this.mConfiguration.device.allocateMemory(
        allocInfo
        , null
        , outMemory);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      let memory = outMemory.pMemory as Magnesium.IMgDeviceMemory;

      // Bind memory to buffer
      err = buffer.bindBufferMemory(
        this.mConfiguration.device
        , memory
        , 0);
        
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      // Store information in the uniform's descriptor that is used by the descriptor set
      let descriptor = new Magnesium.MgDescriptorBufferInfo();
      descriptor.buffer = buffer;
      descriptor.offset = 0;
      descriptor.range = structSize;

      this.uniformDataVS.buffer = buffer;
      this.uniformDataVS.memory = memory;
      this.uniformDataVS.descriptor = descriptor;

      this.updateUniformBuffers();
    }

    private setupDescriptorSetLayout(): void {      
      // Binding 0: Uniform buffer (Vertex shader)
      let binding = new Magnesium.MgDescriptorSetLayoutBinding();
      binding.binding = 0;      
      binding.descriptorCount = 1;
      binding.stageFlags = Magnesium.MgShaderStageFlagBits.VERTEX_BIT;
      binding.immutableSamplers = null;
      binding.descriptorType = Magnesium.MgDescriptorType.UNIFORM_BUFFER;

      // Setup layout of descriptors used in this example
      // Basically connects the different shader stages to descriptors for binding uniform buffers, image samplers, etc.
      // So every shader binding should map to one descriptor set layout binding
      let descriptorLayout
        = new Magnesium.MgDescriptorSetLayoutCreateInfo();
      descriptorLayout.bindings = [binding];

      let outDescriptorSetLayout
        : {pSetLayout:Magnesium.IMgDescriptorSetLayout|null}
        = {pSetLayout:null};
      let err = this.mConfiguration.device.createDescriptorSetLayout(
        descriptorLayout
        , null
        , outDescriptorSetLayout);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      this.mDescriptorSetLayout = outDescriptorSetLayout.pSetLayout as Magnesium.IMgDescriptorSetLayout;

      // Create the pipeline layout that is used to generate the rendering pipelines that are based on this descriptor set layout
      // In a more complex scenario you would have different pipeline layouts for different descriptor set layouts that could be reused
      let pPipelineLayoutCreateInfo
        = new Magnesium.MgPipelineLayoutCreateInfo();
      pPipelineLayoutCreateInfo.setLayouts = [this.mDescriptorSetLayout];

      let outPipelineLayout 
       : {pPipelineLayout:Magnesium.IMgPipelineLayout|null}
       = {pPipelineLayout:null};

      err = this.mConfiguration.device.createPipelineLayout(
        pPipelineLayoutCreateInfo
        , null
        , outPipelineLayout);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      this.mPipelineLayout
       = outPipelineLayout.pPipelineLayout as Magnesium.IMgPipelineLayout;
    }

    private preparePipelines(): void { 
      let modules : {
        frag: Magnesium.IMgShaderModule|null
        ,vert: Magnesium.IMgShaderModule|null
        }
        = { frag:null, vert:null };

      const vsPromise = new Promise<string>(
        (resolve, reject) => {
          return this.mTrianglePath.openVertexShader();
        }
      )

      const fsPromise = new Promise<string>(
        (resolve, reject) => {
          return this.mTrianglePath.openVertexShader();
        }         
      );

      vsPromise
        .then((vs) => {
          let vsCreateInfo = new Magnesium.MgShaderModuleCreateInfo();
          vsCreateInfo.code = vs;
          vsCreateInfo.codeSize = vs.length;
          // shaderStages[1] = loadShader(getAssetPath() 
          // + "shaders/triangle.frag.spv", VK_SHADER_STAGE_FRAGMENT_BIT);
          let outModule
            : {pShaderModule:Magnesium.IMgShaderModule|null}
            = {pShaderModule:null};
          let err = this.mConfiguration.device.createShaderModule(vsCreateInfo, null, outModule);
          if (err != Magnesium.MgResult.SUCCESS) {
            throw new Error(err.toString());
          }
          modules.vert = outModule.pShaderModule;
        })
        .catch((err) => {throw err});        

      fsPromise
        .then((fs) => {
          let fsCreateInfo = new Magnesium.MgShaderModuleCreateInfo();
          fsCreateInfo.code = fs;
          fsCreateInfo.codeSize = fs.length;
          // shaderStages[1] = loadShader(getAssetPath() 
          // + "shaders/triangle.frag.spv", VK_SHADER_STAGE_FRAGMENT_BIT);
          let outModule
            : {pShaderModule:Magnesium.IMgShaderModule|null}
            = {pShaderModule:null};
          let err = this.mConfiguration.device.createShaderModule(fsCreateInfo, null, outModule);
          if (err != Magnesium.MgResult.SUCCESS) {
            throw new Error(err.toString());
          }
          modules.frag = outModule.pShaderModule;
        })
        .catch((err) => {throw err});

        // Create the graphics pipeline used in this example
        // Vulkan uses the concept of rendering pipelines to encapsulate fixed states, replacing OpenGL's complex state machine
        // A pipeline is then stored and hashed on the GPU making pipeline changes very fast
        // Note: There are still a few dynamic states that are not directly part of the pipeline (but the info that they are used is)

        let createInfo
          = new Magnesium.MgGraphicsPipelineCreateInfo();
        
        let vsStage = new Magnesium.MgPipelineShaderStageCreateInfo();
        vsStage.stage = Magnesium.MgShaderStageFlagBits.VERTEX_BIT;

        let vsModule = modules.vert as Magnesium.IMgShaderModule;
        vsStage.module = vsModule;
        vsStage.name = "vertFunc";

        let fsStage = new Magnesium.MgPipelineShaderStageCreateInfo();
        fsStage.stage = Magnesium.MgShaderStageFlagBits.VERTEX_BIT;

        let fsModule = modules.frag as Magnesium.IMgShaderModule;
        fsStage.module = fsModule;
        fsStage.name = "fragFunc";

        // Input assembly state describes how primitives are assembled
        // This pipeline will assemble vertex data as a triangle lists (though we only use one triangle)
        let iaState = new Magnesium.MgPipelineInputAssemblyStateCreateInfo();
        iaState.topology = Magnesium.MgPrimitiveTopology.TRIANGLE_LIST;

        // Rasterization state
        let rasterState
          = new Magnesium.MgPipelineRasterizationStateCreateInfo();       
        rasterState.polygonMode = Magnesium.MgPolygonMode.FILL;
        rasterState.cullMode = Magnesium.MgCullModeFlagBits.NONE;
        rasterState.frontFace = Magnesium.MgFrontFace.COUNTER_CLOCKWISE;
        rasterState.depthClampEnable = false;
        rasterState.rasterizerDiscardEnable = false;
        rasterState.depthBiasEnable = false;
        //rasterState.lineWidth = 1.0;        

        createInfo.stages = [vsStage, fsStage];
        createInfo.vertexInputState = this.vertices.inputState;
        createInfo.inputAssemblyState = iaState;
        createInfo.rasterizationState = rasterState;

        let attachment = new Magnesium.MgPipelineColorBlendAttachmentState();
        attachment.colorWriteMask 
          = Magnesium.MgColorComponentFlagBits.R_BIT
          | Magnesium.MgColorComponentFlagBits.G_BIT
          | Magnesium.MgColorComponentFlagBits.B_BIT
          | Magnesium.MgColorComponentFlagBits.A_BIT;
        attachment.blendEnable = false;

        // Color blend state describes how blend factors are calculated (if used)
        // We need one blend attachment state per color attachment (even if blending is not used
        let cbState = new Magnesium.MgPipelineColorBlendStateCreateInfo(); 
        cbState.attachments = [attachment];
        createInfo.colorBlendState = cbState;

        // Multi sampling state
        // This example does not make use fo multi sampling (for anti-aliasing), the state must still be set and passed to the pipeline
        let msState = new Magnesium.MgPipelineMultisampleStateCreateInfo();
        msState.rasterizationSamples = Magnesium.MgSampleCountFlagBits.COUNT_1_BIT;
        msState.sampleMask = null;
        createInfo.multisampleState = msState;

        // The layout used for this pipeline (can be shared among multiple pipelines using the same layout)
        createInfo.layout = this.mPipelineLayout;

        // Renderpass this pipeline is attached to
        createInfo.renderPass = this.mGraphicsDevice.renderpass;

        // Viewport state sets the number of viewports and scissor used in this pipeline
        // Note: This is actually overriden by the dynamic states (see below)
        createInfo.viewportState = null;

        // Depth and stencil state containing depth and stencil compare and test operations
        // We only use depth tests and want depth tests and writes to be enabled and compare with less or equal

        let dssState = new Magnesium.MgPipelineDepthStencilStateCreateInfo();
        dssState.depthTestEnable = true;
        dssState.depthWriteEnable = true;
        dssState.depthCompareOp = Magnesium.MgCompareOp.LESS_OR_EQUAL;
        dssState.depthBoundsTestEnable = false;

        let dsBack = new Magnesium.MgStencilOpState();
        dsBack.failOp = Magnesium.MgStencilOp.KEEP;
        dsBack.passOp = Magnesium.MgStencilOp.KEEP;
        dsBack.compareOp = Magnesium.MgCompareOp.ALWAYS;
        dssState.back = dsBack;

        dssState.stencilTestEnable = false;

        let dsFront = new Magnesium.MgStencilOpState();
        dsFront.failOp = Magnesium.MgStencilOp.KEEP;
        dsFront.passOp = Magnesium.MgStencilOp.KEEP;
        dsFront.compareOp = Magnesium.MgCompareOp.ALWAYS;
        dssState.front = dsFront;

        createInfo.depthStencilState = dssState;

        // Enable dynamic states
        // Most states are baked into the pipeline, but there are still a few dynamic states that can be changed within a command buffer
        // To be able to change these we need do specify which dynamic states will be changed using this pipeline. Their actual states are set later on in the command buffer.
        // For this example we will set the viewport and scissor using dynamic states        

        let dynamicState = new Magnesium.MgPipelineDynamicStateCreateInfo();
        dynamicState.dynamicStates = [
           Magnesium.MgDynamicState.VIEWPORT
          ,Magnesium.MgDynamicState.SCISSOR
        ];

        createInfo.dynamicState = dynamicState;

        let out
          : {pPipelines:Array<Magnesium.IMgPipeline>|null}
          = {pPipelines:null};

        // Create rendering pipeline using the specified states
        let err = this.mConfiguration.device.createGraphicsPipelines(
          null
          , [createInfo]
          , null
          , out);

        if (err != Magnesium.MgResult.SUCCESS) {
          throw new Error(err.toString());
        }

        vsModule.destroyShaderModule(this.mConfiguration.device, null);
        fsModule.destroyShaderModule(this.mConfiguration.device, null);

        let pipelines = out.pPipelines as Array<Magnesium.IMgPipeline>;
        this.mPipeline = pipelines[0];
    }

    // Create the global descriptor pool
    // All descriptors used in this example are allocated from this pool
    private setupDescriptorPool(): void {
      // We need to tell the API the number of max. requested descriptors per type
      let typeCounts = new Array<Magnesium.MgDescriptorPoolSize>(1);

      // This example only uses one descriptor type (uniform buffer) and only requests one descriptor of this type
      typeCounts[0] = new Magnesium.MgDescriptorPoolSize();
      typeCounts[0].type = Magnesium.MgDescriptorType.UNIFORM_BUFFER;
      typeCounts[0].descriptorCount = 1;              

      // For additional types you need to add new entries in the type count list
      // E.g. for two combined image samplers :
      // typeCounts[1] = new Magnesium.MgDescriptorPoolSize();
      // typeCounts[1].type = Magnesium.MgDescriptorType.COMBINED_IMAGE_SAMPLER;
      // typeCounts[1].descriptorCount = 2;        

      let descriptorPoolInfo = new Magnesium.MgDescriptorPoolCreateInfo();
      descriptorPoolInfo.poolSizes = typeCounts;
      // Set the max. number of descriptor sets that can be requested from this pool (requesting beyond this limit will result in an error)        
      descriptorPoolInfo.maxSets = 1;

      let out
        : {pDescriptorPool:Magnesium.IMgDescriptorPool|null}
        = {pDescriptorPool:null};
      let err = this.mConfiguration.device.createDescriptorPool(descriptorPoolInfo, null, out);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }
      this.mDescriptorPool = out.pDescriptorPool as Magnesium.IMgDescriptorPool;
    }    

    private setupDescriptorSet(): void
    {
      // Allocate a new descriptor set from the global descriptor pool
      let allocInfo = new Magnesium.MgDescriptorSetAllocateInfo();        
      allocInfo.descriptorPool = this.mDescriptorPool;
      allocInfo.descriptorSetCount = 1;
      allocInfo.setLayouts = [ this.mDescriptorSetLayout];        

      let out
        : {pDescriptorSets:Array<Magnesium.IMgDescriptorSet>}
        = {pDescriptorSets:Array<Magnesium.IMgDescriptorSet>(1)};
      let err = this.mConfiguration.device.allocateDescriptorSets(allocInfo, out);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      this.mDescriptorSet = out.pDescriptorSets[0] as Magnesium.IMgDescriptorSet;      

      // Update the descriptor set determining the shader binding points
      // For every binding point used in a shader there needs to be one
      // descriptor set matching that binding point

      // Binding 0 : Uniform buffer
      let writeDescriptor = new Magnesium.MgWriteDescriptorSet();               
      writeDescriptor.dstSet = this.mDescriptorSet;
      writeDescriptor.descriptorCount = 1,
      writeDescriptor.descriptorType =  Magnesium.MgDescriptorType.UNIFORM_BUFFER,
      writeDescriptor.bufferInfo = [this.uniformDataVS.descriptor];
      // Binds this uniform buffer to binding point 0
      writeDescriptor.dstBinding = 0;

      this.mConfiguration.device.updateDescriptorSets(
        [writeDescriptor]
        , null);
    }

    private createCommandBuffers() : void {
      // Create one command buffer per frame buffer
      // in the swap chain
      // Command buffers store a reference to the
      // frame buffer inside their render pass info
      // so for static usage withouth having to rebuild
      // them each frame, we use one per frame buffer
      this.drawCmdBuffers
       = new Array<Magnesium.IMgCommandBuffer>(
         this.mGraphicsDevice.framebuffers.length
        );

      let cmdBufAllocateInfo = new Magnesium.MgCommandBufferAllocateInfo();                
      cmdBufAllocateInfo.commandBufferCount = this.mGraphicsDevice.framebuffers.length;
      cmdBufAllocateInfo.commandPool = this.mConfiguration.partition.commandPool;
      cmdBufAllocateInfo.level = Magnesium.MgCommandBufferLevel.PRIMARY;             

      let err = this.mConfiguration.device.allocateCommandBuffers(
        cmdBufAllocateInfo
        , this.drawCmdBuffers);

      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }      

      // Command buffers for submitting present barriers      
      let presentAllocateInfo = new Magnesium.MgCommandBufferAllocateInfo();          
      presentAllocateInfo.commandBufferCount = 2;
      presentAllocateInfo.commandPool = this.mConfiguration.partition.commandPool;
      presentAllocateInfo.level = Magnesium.MgCommandBufferLevel.PRIMARY;

      let presentBuffers = new Array<Magnesium.IMgCommandBuffer>(2);
      err = this.mConfiguration.device.allocateCommandBuffers(cmdBufAllocateInfo, presentBuffers);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }   

      // Pre present
      this.mPrePresentCmdBuffer = presentBuffers[0];

      // Post present
      this.mPostPresentCmdBuffer = presentBuffers[1];            
    }

    // Build separate command buffers for every framebuffer image
    // Unlike in OpenGL all rendering commands are recorded once into command buffers that are then resubmitted to the queue
    // This allows to generate work upfront and from multiple threads, one of the biggest advantages of Vulkan
    private buildCommandBuffers(): void{
      let beginInfo = new Magnesium.MgRenderPassBeginInfo();
      beginInfo.renderPass = this.mGraphicsDevice.renderpass;
      beginInfo.renderArea = new Magnesium.MgRect2D();
      beginInfo.renderArea.offset = new Magnesium.MgOffset2D();
      beginInfo.renderArea.offset.x = 0;
      beginInfo.renderArea.offset.y = 0;
      beginInfo.renderArea.extent = new Magnesium.MgExtent2D();
      beginInfo.renderArea.extent.width = this.mWidth;
      beginInfo.renderArea.extent.height = this.mHeight;

      // Set clear values for all framebuffer attachments with loadOp set to clear
      // We use two attachments (color and depth) that are cleared at the start of the subpass and as such we need to set clear values for both
      
      let clearColor = new Magnesium.MgColor4f(0, 0, 0, 0);
      let depthStencil = new Magnesium.MgClearDepthStencilValue();
      depthStencil.depth = 1.0;
      depthStencil.stencil = 0;
      let clearDepth = new Magnesium.MgClearValue();
      clearDepth.depthStencil = depthStencil;

      let ClearValues = [                
        Magnesium.MgClearValue.fromColorAndFormat(this.mSwapchains.format, clearColor)
        , clearDepth
      ];
          
      let vp = new Magnesium.MgViewport();
      vp.height = this.mHeight;
      vp.width = this.mWidth;
      vp.minDepth = 0.0;
      vp.maxDepth = 1.0;

      let scissor = new Magnesium.MgRect2D();
      scissor.extent = new Magnesium.MgExtent2D();
      scissor.extent.width = this.mWidth;
      scissor.extent.height = this.mHeight;
      scissor.offset = new Magnesium.MgOffset2D();
      scissor.offset.x = 0;
      scissor.offset.y = 0;
            
      for (let i = 0; i < this.drawCmdBuffers.length; i += 1) {
        // Set target frame buffer
        beginInfo.framebuffer = this.mGraphicsDevice.framebuffers[i];

        let cmdBuf = this.drawCmdBuffers[i];

        let cmdBufInfo = new Magnesium.MgCommandBufferBeginInfo();
        let err = cmdBuf.beginCommandBuffer(cmdBufInfo);
        if (err != Magnesium.MgResult.SUCCESS) {
          throw new Error(err.toString());
        }   

        // Start the first sub pass specified in our default render pass setup by the base class
        // This will clear the color and depth attachment
        cmdBuf.cmdBeginRenderPass(
          beginInfo
          , Magnesium.MgSubpassContents.INLINE);

        // Update dynamic viewport state
        cmdBuf.cmdSetViewport(0, [vp]);            

        // Update dynamic scissor state
        cmdBuf.cmdSetScissor(0, [scissor]);

        // Bind descriptor sets describing shader binding points
        cmdBuf.cmdBindDescriptorSets(
          Magnesium.MgPipelineBindPoint.GRAPHICS
          , this.mPipelineLayout
          , 0
          , 1
          , [this.mDescriptorSet]
          , null);

        // Bind the rendering pipeline
        // The pipeline (state object) contains all states of the rendering pipeline, binding it will set all the states specified at pipeline creation time
        cmdBuf.cmdBindPipeline(
          Magnesium.MgPipelineBindPoint.GRAPHICS
          , this.mPipeline);

        // Bind triangle vertex buffer (contains position and colors)
        cmdBuf.cmdBindVertexBuffers(0, [this.vertices.buffer ], [ 0 ]);

        // Bind triangle index buffer
        cmdBuf.cmdBindIndexBuffer(this.indices.buffer, 0, Magnesium.MgIndexType.UINT32);

        // Draw indexed triangle
        cmdBuf.cmdDrawIndexed(this.indices.count, 1, 0, 0, 1);

        cmdBuf.cmdEndRenderPass();

        // Ending the render pass will add an implicit barrier transitioning the frame buffer color attachment to 
        // VK_IMAGE_LAYOUT_PRESENT_SRC_KHR for presenting it to the windowing system

        err = cmdBuf.endCommandBuffer();
        if (err != Magnesium.MgResult.SUCCESS) {
          throw new Error(err.toString());
        }   
      }
    }

    /// <summary>
    /// Convert degrees to radians
    /// </summary>
    /// <param name="degrees">An angle in degrees</param>
    /// <returns>The angle expressed in radians</returns>
    private degreesToRadians(degrees: number): number
    {
        const DEG_TO_RAD = Math.PI / 180.0;
        return (degrees * DEG_TO_RAD);
    }

    private updateUniformBuffers() : void {
      /** TODO: LATER
      // Update matrices
      uboVS.projectionMatrix = Matrix4.CreatePerspectiveFieldOfView(
        DegreesToRadians(60.0f), 
        (mWidth / mHeight), 
        1.0f,
        256.0f);

        const ZOOM = -2.5;

        uboVS.viewMatrix = Matrix4.CreateTranslation(0, 0, ZOOM);

        // TODO : track down rotation
        uboVS.modelMatrix = Matrix4.Identity;
        //uboVS.modelMatrix = glm::rotate(uboVS.modelMatrix, glm::radians(rotation.x), glm::vec3(1.0f, 0.0f, 0.0f));
        //uboVS.modelMatrix = glm::rotate(uboVS.modelMatrix, glm::radians(rotation.y), glm::vec3(0.0f, 1.0f, 0.0f));
        //uboVS.modelMatrix = glm::rotate(uboVS.modelMatrix, glm::radians(rotation.z), glm::vec3(0.0f, 0.0f, 1.0f));


        let structSize = (ulong) Marshal.SizeOf(typeof(UniformBufferObject));

        // Map uniform buffer and update it
        IntPtr pData;

        let err = this.uniformDataVS.memory.mapMemory(this.mConfiguration.device,  0, structSize, 0, out pData);

        // Marshal.StructureToPtr(uboVS, pData, false);
        // Unmap after data has been copied
        // Note: Since we requested a host coherent memory type for the uniform buffer, the write is instantly visible to the GPU
        this.uniformDataVS.memory.unmapMemory(this.mConfiguration.device);

      **/
    }

    renderLoop(): void {
      this.render();
    }

    private render(): void {
        if (!this.mPrepared)
            return;
        this.draw();
    }

    private draw() : void {
      // Get next image in the swap chain (back/front buffer)
      let currentBufferIndex = this.mPresentationLayer.beginDraw(
        this.mPostPresentCmdBuffer
        , this.mPresentCompleteSemaphore
        , Number.MAX_SAFE_INTEGER);

      // Use a fence to wait until the command buffer has finished execution before using it again
      let fence = this.mWaitFences[currentBufferIndex];
      let err = this.mConfiguration.device.waitForFences([fence] , true, Number.MAX_SAFE_INTEGER);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }  

      err = this.mConfiguration.device.resetFences([ fence ]);

      // The submit info structure specifices a command buffer queue submission batch
      let waitSignal = new Magnesium.MgSubmitInfoWaitSemaphoreInfo();
      // Pointer to the list of pipeline stages that the semaphore waits will occur at      
      waitSignal.waitDstStageMask = Magnesium.MgPipelineStageFlagBits.COLOR_ATTACHMENT_OUTPUT_BIT;
      // Semaphore(s) to wait upon before the submitted command buffer starts executing      
      waitSignal.waitSemaphore = this.mPresentCompleteSemaphore;

      // Pipeline stage at which the queue submission will wait (via pWaitSemaphores)
      let submitInfo = new Magnesium.MgSubmitInfo();
      submitInfo.waitSemaphores = [waitSignal];

      // Command buffers(s) to execute in this batch (submission)      
      submitInfo.commandBuffers = [this.drawCmdBuffers[currentBufferIndex]];
      
      // Semaphore(s) to be signaled when command buffers have completed
      submitInfo.signalSemaphores = [this.mRenderCompleteSemaphore];

      // Submit to the graphics queue passing a wait fence
      err = this.mConfiguration.queue.queueSubmit([submitInfo], fence);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }   

      // Present the current buffer to the swap chain
      // Pass the semaphore signaled by the command buffer submission from the submit info as the wait semaphore for swap chain presentation
      // This ensures that the image is not presented to the windowing system until all commands have been submitted

      this.mPresentationLayer.endDraw(
        [currentBufferIndex]
        , this.mPrePresentCmdBuffer
        , [ this.mRenderCompleteSemaphore ]);
    }

    private viewChanged(): void
    {
        // This function is called by the base example class each time the view is changed by user input
        this.updateUniformBuffers();
    }

    private mIsDisposed: boolean = false; // To detect redundant calls
    dispose(disposing: boolean) : void {
      if (this.mIsDisposed)
      {
        return;
      }

      this.releaseUnmanagedResources();

      if (disposing) {  
        this.releaseManagedResources();
      }

      this.mIsDisposed = true;            
    }

    private releaseManagedResources(): void {
        
    }

    private releaseUnmanagedResources(): void {
      let device = this.mConfiguration.device;
      if (device != null) {

        // Clean up used Vulkan resources 
        // Note: Inherited destructor cleans up resources stored in base class
        if (this.mPipeline != null)
          this.mPipeline.destroyPipeline(device, null);

        if (this.mPipelineLayout != null)
          this.mPipelineLayout.destroyPipelineLayout(device, null);

        if (this.mDescriptorSetLayout != null)
          this.mDescriptorSetLayout.destroyDescriptorSetLayout(device, null);

        if (this.vertices.buffer != null)
          this.vertices.buffer.destroyBuffer(device, null);

        if (this.vertices.memory != null)
          this.vertices.memory.freeMemory(device, null);

        if (this.indices.buffer != null)
          this.indices.buffer.destroyBuffer(device, null);

        if (this.indices.memory != null)
          this.indices.memory.freeMemory(device, null);

        if (this.uniformDataVS.buffer != null)
          this.uniformDataVS.buffer.destroyBuffer(device, null);

        if (this.uniformDataVS.memory != null)
          this.uniformDataVS.memory.freeMemory(device, null);

        if (this.mPresentCompleteSemaphore != null)
          this.mPresentCompleteSemaphore.destroySemaphore(device, null);


        if (this.mRenderCompleteSemaphore != null)
          this.mRenderCompleteSemaphore.destroySemaphore(device, null);

        for (let fence of this.mWaitFences) {
          fence.destroyFence(device, null);
        }

        if (this.mDescriptorPool != null)
          this.mDescriptorPool.destroyDescriptorPool(device, null);

        if (this.drawCmdBuffers != null) {
          this.mConfiguration.device.freeCommandBuffers(
            this.mConfiguration.partition.commandPool
            , this.drawCmdBuffers);
        }

        if (this.mPostPresentCmdBuffer != null) {
          this.mConfiguration.device.freeCommandBuffers(
            this.mConfiguration.partition.commandPool
            , [this.mPostPresentCmdBuffer]);
        }


        if (this.mPrePresentCmdBuffer != null) {
          this.mConfiguration.device.freeCommandBuffers(
            this.mConfiguration.partition.commandPool
            , [this.mPrePresentCmdBuffer]);
        }

        if (this.mGraphicsDevice != null)
          this.mGraphicsDevice.dispose();    
      }    
    }
  }
}