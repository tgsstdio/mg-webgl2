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
    memory: Magnesium.IMgDeviceMemory|null;
    buffer: Magnesium.IMgBuffer|null;
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
      this.uniformDataVS.buffer = outBuffer.pBuffer;

      // Prepare and initialize a uniform buffer block containing shader uniforms
      // Single uniforms like in OpenGL are no longer present in Vulkan. All Shader uniforms are passed via uniform buffer blocks
      Magnesium.MgMemoryRequirements memReqs;

      // Get memory requirements including size, alignment and memory type 
      this.mConfiguration.device.getBufferMemoryRequirements(uniformDataVS.buffer, out memReqs);


      // Get the memory type index that supports host visibile memory access
      // Most implementations offer multiple memory types and selecting the correct one to allocate memory from is crucial
      // We also want the buffer to be host coherent so we don't have to flush (or sync after every update.
      // Note: This may affect performance so you might not want to do this in a real world application that updates buffers on a regular base
      uint typeIndex;
      let isValid = this.mConfiguration.Partition.GetMemoryType(memReqs.MemoryTypeBits, Magnesium.MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT | Magnesium.MgMemoryPropertyFlagBits.HOST_COHERENT_BIT, out typeIndex);
      Debug.Assert(isValid);

      Magnesium.MgMemoryAllocateInfo allocInfo = new Magnesium.MgMemoryAllocateInfo
      {
          AllocationSize = memReqs.Size,
          MemoryTypeIndex = typeIndex,
      };

      // Allocate memory for the uniform buffer
      err = this.mConfiguration.Device.AllocateMemory(allocInfo, null, out uniformDataVS.memory);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      // Bind memory to buffer
      err = uniformDataVS.buffer.BindBufferMemory(this.mConfiguration.Device, uniformDataVS.memory, 0);
      if (err != Magnesium.MgResult.SUCCESS) {
        throw new Error(err.toString());
      }

      // Store information in the uniform's descriptor that is used by the descriptor set
      uniformDataVS.descriptor = new Magnesium.MgDescriptorBufferInfo
      {
          Buffer = uniformDataVS.buffer,
          Offset = 0,
          Range = structSize,
      };

      this.updateUniformBuffers();
  }


        void setupDescriptorSetLayout()
        {
            // Setup layout of descriptors used in this example
            // Basically connects the different shader stages to descriptors for binding uniform buffers, image samplers, etc.
            // So every shader binding should map to one descriptor set layout binding
            let descriptorLayout = new Magnesium.MgDescriptorSetLayoutCreateInfo
            {
                Bindings = new[]
                {
                    // Binding 0: Uniform buffer (Vertex shader)
                    new Magnesium.MgDescriptorSetLayoutBinding
                    {
                        DescriptorCount = 1,
                        StageFlags = Magnesium.MgShaderStageFlagBits.VERTEX_BIT,
                        ImmutableSamplers = null,
                        DescriptorType = Magnesium.MgDescriptorType.UNIFORM_BUFFER,
                        Binding = 0,                         
                    }
                },
            };

            let err = this.mConfiguration.Device.CreateDescriptorSetLayout(descriptorLayout, null, out mDescriptorSetLayout);
            Debug.Assert(err == Result.SUCCESS);

            // Create the pipeline layout that is used to generate the rendering pipelines that are based on this descriptor set layout
            // In a more complex scenario you would have different pipeline layouts for different descriptor set layouts that could be reused
            let pPipelineLayoutCreateInfo = new Magnesium.MgPipelineLayoutCreateInfo
            {
                 SetLayouts = new Magnesium.IMgDescriptorSetLayout[]
                 {
                     mDescriptorSetLayout,
                 }
            };

            err = this.mConfiguration.Device.CreatePipelineLayout(pPipelineLayoutCreateInfo, null, out mPipelineLayout);
            Debug.Assert(err == Result.SUCCESS);
        }

        void preparePipelines()
        {
            // System.IO.File.OpenRead("shaders/triangle.vert.spv")
            using (let vertFs = mTrianglePath.OpenVertexShader())
            // System.IO.File.OpenRead("shaders/triangle.frag.spv")
            using (let fragFs = mTrianglePath.OpenFragmentShader())
            {
                // Load shaders
                // Vulkan loads it's shaders from an immediate binary representation called SPIR-V
                // Shaders are compiled offline from e.g. GLSL using the reference glslang compiler

                Magnesium.IMgShaderModule vsModule;
                {
                    let vsCreateInfo = new Magnesium.MgShaderModuleCreateInfo
                    {
                        Code = vertFs,
                        CodeSize = new UIntPtr((ulong)vertFs.Length),
                    };
                    //  shaderStages[0] = loadShader(getAssetPath() + "shaders/triangle.vert.spv", VK_SHADER_STAGE_VERTEX_BIT);
                    this.mConfiguration.Device.CreateShaderModule(vsCreateInfo, null, out vsModule);
                }

                Magnesium.IMgShaderModule fsModule;
                {
                    let fsCreateInfo = new Magnesium.MgShaderModuleCreateInfo
                    {
                        Code = fragFs,
                        CodeSize = new UIntPtr((ulong)fragFs.Length),
                    };
                    // shaderStages[1] = loadShader(getAssetPath() + "shaders/triangle.frag.spv", VK_SHADER_STAGE_FRAGMENT_BIT);
                    this.mConfiguration.Device.CreateShaderModule(fsCreateInfo, null, out fsModule);
                }

                // Create the graphics pipeline used in this example
                // Vulkan uses the concept of rendering pipelines to encapsulate fixed states, replacing OpenGL's complex state machine
                // A pipeline is then stored and hashed on the GPU making pipeline changes very fast
                // Note: There are still a few dynamic states that are not directly part of the pipeline (but the info that they are used is)

                let pipelineCreateInfo = new Magnesium.MgGraphicsPipelineCreateInfo
                {

                    Stages = new Magnesium.MgPipelineShaderStageCreateInfo[]
                    {
                        new Magnesium.MgPipelineShaderStageCreateInfo
                        {
                            Stage = Magnesium.MgShaderStageFlagBits.VERTEX_BIT,
                            Module = vsModule,
                            Name = "vertFunc",
                        },
                        new Magnesium.MgPipelineShaderStageCreateInfo
                        {
                            Stage = Magnesium.MgShaderStageFlagBits.FRAGMENT_BIT,
                            Module = fsModule,
                            Name = "fragFunc",
                        },
                    },

                    VertexInputState = vertices.inputState,

                    // Construct the differnent states making up the pipeline
                    InputAssemblyState = new Magnesium.MgPipelineInputAssemblyStateCreateInfo
                    {
                        // Input assembly state describes how primitives are assembled
                        // This pipeline will assemble vertex data as a triangle lists (though we only use one triangle)
                        Topology = Magnesium.MgPrimitiveTopology.TRIANGLE_LIST,
                    },

                    // Rasterization state
                    RasterizationState = new Magnesium.MgPipelineRasterizationStateCreateInfo
                    {
                        PolygonMode = Magnesium.MgPolygonMode.FILL,
                        CullMode = Magnesium.MgCullModeFlagBits.NONE,
                        FrontFace = Magnesium.MgFrontFace.COUNTER_CLOCKWISE,
                        DepthClampEnable = false,
                        RasterizerDiscardEnable = false,
                        DepthBiasEnable = false,
                        LineWidth = 1.0f,
                    },


                    // Color blend state describes how blend factors are calculated (if used)
                    // We need one blend attachment state per color attachment (even if blending is not used
                    ColorBlendState = new Magnesium.MgPipelineColorBlendStateCreateInfo
                    {
                        Attachments = new Magnesium.MgPipelineColorBlendAttachmentState[]
                        {
                        new Magnesium.MgPipelineColorBlendAttachmentState
                        {
                            ColorWriteMask =  Magnesium.MgColorComponentFlagBits.R_BIT | Magnesium.MgColorComponentFlagBits.G_BIT | Magnesium.MgColorComponentFlagBits.B_BIT | Magnesium.MgColorComponentFlagBits.A_BIT,
                            BlendEnable = false,
                        }
                        },
                    },

                    // Multi sampling state
                    // This example does not make use fo multi sampling (for anti-aliasing), the state must still be set and passed to the pipeline
                    MultisampleState = new Magnesium.MgPipelineMultisampleStateCreateInfo
                    {
                        RasterizationSamples = Magnesium.MgSampleCountFlagBits.COUNT_1_BIT,
                        SampleMask = null,
                    },


                    // The layout used for this pipeline (can be shared among multiple pipelines using the same layout)
                    Layout = mPipelineLayout,

                    // Renderpass this pipeline is attached to
                    RenderPass = Magnesium.MgraphicsDevice.Renderpass,

                    // Viewport state sets the number of viewports and scissor used in this pipeline
                    // Note: This is actually overriden by the dynamic states (see below)
                    ViewportState = null,

                    // Depth and stencil state containing depth and stencil compare and test operations
                    // We only use depth tests and want depth tests and writes to be enabled and compare with less or equal
                    DepthStencilState = new Magnesium.MgPipelineDepthStencilStateCreateInfo
                    {
                        DepthTestEnable = true,
                        DepthWriteEnable = true,
                        DepthCompareOp = Magnesium.MgCompareOp.LESS_OR_EQUAL,
                        DepthBoundsTestEnable = false,
                        Back = new Magnesium.MgStencilOpState
                        {
                            FailOp = Magnesium.MgStencilOp.KEEP,
                            PassOp = Magnesium.MgStencilOp.KEEP,
                            CompareOp = Magnesium.MgCompareOp.ALWAYS,
                        },
                        StencilTestEnable = false,
                        Front = new Magnesium.MgStencilOpState
                        {
                            FailOp = Magnesium.MgStencilOp.KEEP,
                            PassOp = Magnesium.MgStencilOp.KEEP,
                            CompareOp = Magnesium.MgCompareOp.ALWAYS,
                        },
                    },

                    // Enable dynamic states
                    // Most states are baked into the pipeline, but there are still a few dynamic states that can be changed within a command buffer
                    // To be able to change these we need do specify which dynamic states will be changed using this pipeline. Their actual states are set later on in the command buffer.
                    // For this example we will set the viewport and scissor using dynamic states

                    DynamicState = new Magnesium.MgPipelineDynamicStateCreateInfo
                    {
                        DynamicStates = new[]
                        {
                            Magnesium.MgDynamicState.VIEWPORT,
                            Magnesium.MgDynamicState.SCISSOR,
                        }
                    },
                };

                Magnesium.IMgPipeline[] pipelines;
                // Create rendering pipeline using the specified states
                let err = mConfiguration.Device.CreateGraphicsPipelines(null, new[] { pipelineCreateInfo }, null, out pipelines);
                Debug.Assert(err == Result.SUCCESS);

                vsModule.DestroyShaderModule(this.mConfiguration.device, null);
                fsModule.DestroyShaderModule(this.mConfiguration.device, null);

                mPipeline = pipelines[0];
            }

        }

        void setupDescriptorPool()
        {
            // Create the global descriptor pool
            // All descriptors used in this example are allocated from this pool
            let descriptorPoolInfo = new Magnesium.MgDescriptorPoolCreateInfo
            {
                // We need to tell the API the number of max. requested descriptors per type
                PoolSizes = new Magnesium.MgDescriptorPoolSize[]
                {
                    new Magnesium.MgDescriptorPoolSize
                    {
                        // This example only uses one descriptor type (uniform buffer) and only requests one descriptor of this type
                        Type = Magnesium.MgDescriptorType.UNIFORM_BUFFER,
                        DescriptorCount = 1,
                    },
                    // For additional types you need to add new entries in the type count list
                    // E.g. for two combined image samplers :
                    // typeCounts[1].type = VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER;
                    // typeCounts[1].descriptorCount = 2;
                },
                // Set the max. number of descriptor sets that can be requested from this pool (requesting beyond this limit will result in an error)
                MaxSets = 1,
            };
            let err = this.mConfiguration.Device.CreateDescriptorPool(descriptorPoolInfo, null, out mDescriptorPool);
            Debug.Assert(err == Result.SUCCESS);
        }

        void setupDescriptorSet()
        {
            // Allocate a new descriptor set from the global descriptor pool
            let allocInfo = new Magnesium.MgDescriptorSetAllocateInfo
            {
                DescriptorPool = mDescriptorPool,
                DescriptorSetCount = 1,
                SetLayouts = new[] { mDescriptorSetLayout },
            };

            Magnesium.IMgDescriptorSet[] dSets;
            let err = this.mConfiguration.Device.AllocateDescriptorSets(allocInfo, out dSets);
            mDescriptorSet = dSets[0];

            Debug.Assert(err == Result.SUCCESS);

            // Update the descriptor set determining the shader binding points
            // For every binding point used in a shader there needs to be one
            // descriptor set matching that binding point
            this.mConfiguration.Device.UpdateDescriptorSets(
                new []
                {
                    // Binding 0 : Uniform buffer
                    new Magnesium.MgWriteDescriptorSet
                    {
                        DstSet = mDescriptorSet,
                        DescriptorCount = 1,
                        DescriptorType =  Magnesium.MgDescriptorType.UNIFORM_BUFFER,
                        BufferInfo = new Magnesium.MgDescriptorBufferInfo[]
                        {
                            uniformDataVS.descriptor,
                        },
                        // Binds this uniform buffer to binding point 0
                        DstBinding = 0,
                    },
                }, null);
        }

        Magnesium.IMgCommandBuffer[] drawCmdBuffers;

        void createCommandBuffers()
        {
            // Create one command buffer per frame buffer
            // in the swap chain
            // Command buffers store a reference to the
            // frame buffer inside their render pass info
            // so for static usage withouth having to rebuild
            // them each frame, we use one per frame buffer
            drawCmdBuffers = new Magnesium.IMgCommandBuffer[mGraphicsDevice.Framebuffers.Length];

            {
                let cmdBufAllocateInfo = new Magnesium.MgCommandBufferAllocateInfo
                {
                    CommandBufferCount = this.mGraphicsDevice.framebuffers.Length,
                    CommandPool = this.mConfiguration.partition.commandPool,
                    Level = Magnesium.MgCommandBufferLevel.PRIMARY,
                };

                let err = this.mConfiguration.Device.AllocateCommandBuffers(cmdBufAllocateInfo, drawCmdBuffers);
                Debug.Assert(err == Result.SUCCESS);
            }

            // Command buffers for submitting present barriers
            {
                let cmdBufAllocateInfo = new Magnesium.MgCommandBufferAllocateInfo
                {
                    CommandBufferCount = 2,
                    CommandPool = this.mConfiguration.partition.commandPool,
                    Level = Magnesium.MgCommandBufferLevel.PRIMARY,
                };
  
                let presentBuffers = new Magnesium.IMgCommandBuffer[2];
                let err = this.mConfiguration.Device.AllocateCommandBuffers(cmdBufAllocateInfo, presentBuffers);
                Debug.Assert(err == Result.SUCCESS);

                // Pre present
                mPrePresentCmdBuffer = presentBuffers[0];

                // Post present
                mPostPresentCmdBuffer = presentBuffers[1];
            }
        }

        // Build separate command buffers for every framebuffer image
        // Unlike in OpenGL all rendering commands are recorded once into command buffers that are then resubmitted to the queue
        // This allows to generate work upfront and from multiple threads, one of the biggest advantages of Vulkan
        void buildCommandBuffers()
        {
            let renderPassBeginInfo = new Magnesium.MgRenderPassBeginInfo {
                RenderPass = Magnesium.MgraphicsDevice.Renderpass,
                RenderArea = new Magnesium.MgRect2D
                {
                    Offset = new Magnesium.MgOffset2D {  X = 0, Y = 0 },
                    Extent = new Magnesium.MgExtent2D { Width = mWidth, Height = mHeight },
                },
                // Set clear values for all framebuffer attachments with loadOp set to clear
                // We use two attachments (color and depth) that are cleared at the start of the subpass and as such we need to set clear values for both
                ClearValues = new Magnesium.MgClearValue[]
                {
                    Magnesium.MgClearValue.FromColorAndFormat(mSwapchains.Format, new Magnesium.MgColor4f(0f, 0f, 0f, 0f)),                    
                    new Magnesium.MgClearValue { DepthStencil = new Magnesium.MgClearDepthStencilValue( 1.0f, 0) },
                },
            };
            
            for (let i = 0; i < drawCmdBuffers.Length; ++i)
            {
                // Set target frame buffer
                renderPassBeginInfo.Framebuffer = Magnesium.MgraphicsDevice.Framebuffers[i];

                let cmdBuf = drawCmdBuffers[i];

                let cmdBufInfo = new Magnesium.MgCommandBufferBeginInfo { };
                let err = cmdBuf.BeginCommandBuffer(cmdBufInfo);
                Debug.Assert(err == Result.SUCCESS);

                // Start the first sub pass specified in our default render pass setup by the base class
                // This will clear the color and depth attachment
                cmdBuf.CmdBeginRenderPass(renderPassBeginInfo, Magnesium.MgSubpassContents.INLINE);

                // Update dynamic viewport state

                cmdBuf.CmdSetViewport(0, 
                    new[] {
                        new Magnesium.MgViewport {
                            Height = (float) mHeight,
                            Width = (float) mWidth,
                            MinDepth = 0.0f,
                            MaxDepth = 1.0f,
                        }
                    }
                );

                // Update dynamic scissor state
                cmdBuf.CmdSetScissor(0,
                    new[] {
                        new Magnesium.MgRect2D {
                            Extent = new Magnesium.MgExtent2D { Width = mWidth, Height = mHeight },
                            Offset = new Magnesium.MgOffset2D { X = 0, Y = 0 },
                        }
                    }
                );

                // Bind descriptor sets describing shader binding points
                cmdBuf.CmdBindDescriptorSets( Magnesium.MgPipelineBindPoint.GRAPHICS, mPipelineLayout, 0, 1, new[] { mDescriptorSet }, null);

                // Bind the rendering pipeline
                // The pipeline (state object) contains all states of the rendering pipeline, binding it will set all the states specified at pipeline creation time
                cmdBuf.CmdBindPipeline(MgPipelineBindPoint.GRAPHICS, mPipeline);

                // Bind triangle vertex buffer (contains position and colors)
                cmdBuf.CmdBindVertexBuffers(0, new[] { vertices.buffer }, new [] { 0UL });

                // Bind triangle index buffer
                cmdBuf.CmdBindIndexBuffer(indices.buffer, 0, Magnesium.MgIndexType.UINT32);

                // Draw indexed triangle
                cmdBuf.CmdDrawIndexed(indices.count, 1, 0, 0, 1);

                cmdBuf.CmdEndRenderPass();

                // Ending the render pass will add an implicit barrier transitioning the frame buffer color attachment to 
                // VK_IMAGE_LAYOUT_PRESENT_SRC_KHR for presenting it to the windowing system

                err = cmdBuf.EndCommandBuffer();
                Debug.Assert(err == Result.SUCCESS);
            }
        }

        #endregion

        /// <summary>
        /// Convert degrees to radians
        /// </summary>
        /// <param name="degrees">An angle in degrees</param>
        /// <returns>The angle expressed in radians</returns>
        public static float DegreesToRadians(float degrees)
        {
            const double degToRad = System.Math.PI / 180.0;
            return (float) (degrees * degToRad);
        }

        void updateUniformBuffers()
        {
            // Update matrices
            uboVS.projectionMatrix = Matrix4.CreatePerspectiveFieldOfView(
                DegreesToRadians(60.0f), 
                (mWidth / mHeight), 
                1.0f,
                256.0f);

            const float ZOOM = -2.5f;

            uboVS.viewMatrix = Matrix4.CreateTranslation(0, 0, ZOOM);

            // TODO : track down rotation
            uboVS.modelMatrix = Matrix4.Identity;
            //uboVS.modelMatrix = glm::rotate(uboVS.modelMatrix, glm::radians(rotation.x), glm::vec3(1.0f, 0.0f, 0.0f));
            //uboVS.modelMatrix = glm::rotate(uboVS.modelMatrix, glm::radians(rotation.y), glm::vec3(0.0f, 1.0f, 0.0f));
            //uboVS.modelMatrix = glm::rotate(uboVS.modelMatrix, glm::radians(rotation.z), glm::vec3(0.0f, 0.0f, 1.0f));


            let structSize = (ulong) Marshal.SizeOf(typeof(UniformBufferObject));

            // Map uniform buffer and update it
            IntPtr pData;

            let err = uniformDataVS.memory.MapMemory(mConfiguration.Device,  0, structSize, 0, out pData);

            Marshal.StructureToPtr(uboVS, pData, false);
            // Unmap after data has been copied
            // Note: Since we requested a host coherent memory type for the uniform buffer, the write is instantly visible to the GPU
            uniformDataVS.memory.UnmapMemory(mConfiguration.Device);
        }

        renderLoop(): void {
            render();
        }

        private render(): void {
            if (!mPrepared)
                return;
            draw();
        }

        draw() : void {
            // Get next image in the swap chain (back/front buffer)
            let currentBufferIndex = mPresentationLayer.BeginDraw(mPostPresentCmdBuffer, mPresentCompleteSemaphore);

            // Use a fence to wait until the command buffer has finished execution before using it again
            let fence = mWaitFences[(int) currentBufferIndex];
            let err = mConfiguration.Device.WaitForFences(new[] { fence } , true, ulong.MaxValue);
            Debug.Assert(err == Result.SUCCESS);

            err = mConfiguration.Device.ResetFences(new[] { fence });

            // Pipeline stage at which the queue submission will wait (via pWaitSemaphores)
            let submitInfos = new Magnesium.MgSubmitInfo[]
            {
                // The submit info structure specifices a command buffer queue submission batch
                new Magnesium.MgSubmitInfo
                {
                    WaitSemaphores = new []
                    {
                        // One wait semaphore
                        new Magnesium.MgSubmitInfoWaitSemaphoreInfo
                        {
                             // Pointer to the list of pipeline stages that the semaphore waits will occur at
                            WaitDstStageMask =  Magnesium.MgPipelineStageFlagBits.COLOR_ATTACHMENT_OUTPUT_BIT,
                            // Semaphore(s) to wait upon before the submitted command buffer starts executing
                            WaitSemaphore = mPresentCompleteSemaphore,
                        }
                    },
                     // One command buffer
                    CommandBuffers = new []
                    {
                        // Command buffers(s) to execute in this batch (submission)
                        drawCmdBuffers[currentBufferIndex]
                    },
                    // One signal semaphore
                    SignalSemaphores = new []
                    {
                        // Semaphore(s) to be signaled when command buffers have completed
                        mRenderCompleteSemaphore
                    },                    
                }
            };                                        

            // Submit to the graphics queue passing a wait fence
            err = mConfiguration.Queue.QueueSubmit(submitInfos, fence);
            Debug.Assert(err == Result.SUCCESS);

            // Present the current buffer to the swap chain
            // Pass the semaphore signaled by the command buffer submission from the submit info as the wait semaphore for swap chain presentation
            // This ensures that the image is not presented to the windowing system until all commands have been submitted

            mPresentationLayer.EndDraw([currentBufferIndex], mPrePresentCmdBuffer, [ mRenderCompleteSemaphore ]);
        }

        private viewChanged(): void
        {
            // This function is called by the base example class each time the view is changed by user input
            updateUniformBuffers();
        }

        private mIsDisposed: boolean = false; // To detect redundant calls
        private ITriangleDemoShaderPath mTrianglePath;

        dispose(disposing: boolean) : void {
            if (this.mIsDisposed)
            {
                return;
            }

            ReleaseUnmanagedResources();

            if (disposing)
            {  
                ReleaseManagedResources();
            }

            mIsDisposed = true;            
        }

        private releaseManagedResources(): void {
           
        }

        private releaseUnmanagedResources(): void {
            let device = this.mConfiguration.device;
            if (device != null)
            {

                // Clean up used Vulkan resources 
                // Note: Inherited destructor cleans up resources stored in base class
                if (mPipeline != null)
                    mPipeline.DestroyPipeline(device, null);

                if (mPipelineLayout != null)
                    mPipelineLayout.DestroyPipelineLayout(device, null);

                if (mDescriptorSetLayout != null)
                    mDescriptorSetLayout.DestroyDescriptorSetLayout(device, null);

                if (vertices.buffer != null)
                    vertices.buffer.DestroyBuffer(device, null);

                if (vertices.memory != null)
                    vertices.memory.FreeMemory(device, null);

                if (indices.buffer != null)
                  indices.buffer.destroyBuffer(device, null);

                if (indices.memory != null)
                  indices.memory.dreeMemory(device, null);

                if (uniformDataVS.buffer != null)
                  uniformDataVS.buffer.destroyBuffer(device, null);

                if (uniformDataVS.memory != null)
                  this.uniformDataVS.memory.freeMemory(device, null);

                if (mPresentCompleteSemaphore != null)
                  this.mPresentCompleteSemaphore.destroySemaphore(device, null);


                if (mRenderCompleteSemaphore != null)
                  this.mRenderCompleteSemaphore.destroySemaphore(device, null);

                for (let fence of this.mWaitFences) {
                  fence.destroyFence(device, null);
                }

                if (this.mDescriptorPool != null)
                  this.mDescriptorPool.DestroyDescriptorPool(device, null);

                if (this.drawCmdBuffers != null) {
                  this.mConfiguration.Device.FreeCommandBuffers(
                    this.mConfiguration.partition.commandPool
                    , drawCmdBuffers);
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