import {IMgPipeline} from '../mg/IMgPipeline';
import {MgGraphicsPipelineCreateInfo} from '../mg/MgGraphicsPipelineCreateInfo';
import {MgPipelineLayoutCreateInfo} from '../mg/MgPipelineLayoutCreateInfo';
import {IMgPipelineLayout} from '../mg/IMgPipelineLayout';
import {MgResult} from '../mg/MgResult';
import {MgShaderModuleCreateInfo} from '../mg/MgShaderModuleCreateInfo';
import {IMgShaderModule} from '../mg/IMgShaderModule';
import {MgPipelineShaderStageCreateInfo} from '../mg/MgPipelineShaderStageCreateInfo';
import {MgShaderStageFlagBits} from '../mg/MgShaderStageFlagBits';
import {MgPipelineInputAssemblyStateCreateInfo} from '../mg/MgPipelineInputAssemblyStateCreateInfo';
import {MgPrimitiveTopology} from '../mg/MgPrimitiveTopology';
import {MgPipelineRasterizationStateCreateInfo} from '../mg/MgPipelineRasterizationStateCreateInfo';
import {MgPolygonMode} from '../mg/MgPolygonMode';
import {MgCullModeFlagBits} from '../mg/MgCullModeFlagBits';
import {MgFrontFace} from '../mg/MgFrontFace';
import {MgPipelineColorBlendAttachmentState} from '../mg/MgPipelineColorBlendAttachmentState';
import {MgColorComponentFlagBits} from '../mg/MgColorComponentFlagBits';
import {MgPipelineVertexInputStateCreateInfo} from '../mg/MgPipelineVertexInputStateCreateInfo';
import {MgPipelineColorBlendStateCreateInfo} from '../mg/MgPipelineColorBlendStateCreateInfo';
import {MgPipelineMultisampleStateCreateInfo} from '../mg/MgPipelineMultisampleStateCreateInfo';
import {MgSampleCountFlagBits} from '../mg/MgSampleCountFlagBits';
import {IMgRenderPass} from '../mg/IMgRenderPass';
import {MgRenderPassCreateInfo} from '../mg/MgRenderPassCreateInfo';
import {MgPipelineDepthStencilStateCreateInfo} from '../mg/MgPipelineDepthStencilStateCreateInfo';
import {MgCompareOp} from '../mg/MgCompareOp';
import {MgStencilOp} from '../mg/MgStencilOp';
import {MgStencilOpState} from '../mg/MgStencilOpState';
import {IWGLGraphicsPipeline} from '../mg-webgl/pipeline/IWGLGraphicsPipeline';
import {IMgDevice} from '../mg/IMgDevice';
import {MgBackbone} from './MgBackbone';
import {MgVertexInputBindingDescription} from '../mg/MgVertexInputBindingDescription';
import {MgVertexInputAttributeDescription} from '../mg/MgVertexInputAttributeDescription';
import {MgVertexInputRate} from '../mg/MgVertexInputRate';
import {MgFormat} from '../mg/MgFormat';
import {WGLCmdVertexArrayEncodingSection} from '../mg-webgl/cmdbuf/WGLCmdVertexArrayEncodingSection';
import {WGLCmdVertexBufferParameter} from '../mg-webgl/cmdbuf/WGLCmdVertexBufferParameter';
import {MockWebGLBuffer} from './MockWebGLBuffer';
import {MgBufferUsageFlagBits} from '../mg/MgBufferUsageFlagBits';
import {MgIndexType} from '../mg/MgIndexType';
import {WGLCmdDrawEncodingSection} from '../mg-webgl/cmdbuf/WGLCmdDrawEncodingSection';
import {WGLCmdGraphicsBag} from '../mg-webgl/cmdbuf/WGLCmdGraphicsBag';
import {WGLCmdEncoderContextSorter} from '../mg-webgl/cmdbuf/WGLCmdEncoderContextSorter';
import {WGLCmdIndexBufferParameter} from '../mg-webgl/cmdbuf/WGLCmdIndexBufferParameter';
import {WGLCmdCommandRecording} from '../mg-webgl/cmdbuf/WGLCmdCommandRecording';
import {WGLCmdComputeRecording} from '../mg-webgl/cmdbuf/WGLCmdComputeRecording';
import {WGLCmdGraphicsRecording} from '../mg-webgl/cmdbuf/WGLCmdGraphicsRecording';
import {WGLCmdBlitRecording} from '../mg-webgl/cmdbuf/WGLCmdBlitRecording';

import {WGLCmdComputeGrid} from '../mg-webgl/cmdbuf/WGLCmdComputeGrid';
import {WGLCmdComputeEncoder} from '../mg-webgl/cmdbuf/WGLCmdComputeEncoder';
import {WGLCmdBlitGrid} from '../mg-webgl/cmdbuf/WGLCmdBlitGrid';
import {MockWGLCmdBlitOperationEntrypoint} from './MockWGLCmdBlitOperationEntrypoint';
import {WGLCmdGraphicsGrid} from '../mg-webgl/cmdbuf/WGLCmdGraphicsGrid';
import {MockCmdStateRenderer} from './MockCmdStateRenderer';
import {WGLCmdDrawEntrypoint} from '../mg-webgl/entrypoint/WGLCmdDrawEntrypoint';
import {WGLCmdGraphicsEncoder} from '../mg-webgl/cmdbuf/WGLCmdGraphicsEncoder';
import {MockWGLCmdDescriptorSetEncodingSection} from './MockWGLCmdDescriptorSetEncodingSection';
import {MgSubpassContents} from '../mg/MgSubpassContents';
import {MgRenderPassBeginInfo} from '../mg/MgRenderPassBeginInfo';
import {MgRect2D} from '../mg/MgRect2D';
import {MgViewport} from '../mg/MgViewport';
import {IMgCommandBuffer} from '../mg/IMgCommandBuffer';
import {MgCommandBufferAllocateInfo} from '../mg/MgCommandBufferAllocateInfo';
import {MgCommandPoolCreateInfo} from '../mg/MgCommandPoolCreateInfo';
import {IMgCommandPool} from '../mg/IMgCommandPool';
import {MgCommandBufferLevel} from '../mg/MgCommandBufferLevel';
import {MgCommandBufferBeginInfo} from '../mg/MgCommandBufferBeginInfo';
import {MgPipelineBindPoint} from '../mg/MgPipelineBindPoint';
import {IWGLCommandBuffer} from '../mg-webgl/cmdbuf/IWGLCommandBuffer';
import {StagingBuffer} from './StagingBuffer';
import {MgBufferCreateInfo} from '../mg/MgBufferCreateInfo';
import {IMgBuffer} from '../mg/IMgBuffer';
import {MgMemoryRequirements} from '../mg/MgMemoryRequirements';
import {MgMemoryAllocateInfo} from '../mg/MgMemoryAllocateInfo';
import {IMgDeviceMemory} from '../mg/IMgDeviceMemory';
import {MgMemoryPropertyFlagBits} from '../mg/MgMemoryPropertyFlagBits';
import {IMgThreadPartition} from '../mg/IMgThreadPartition';
import {MgBufferCopy} from '../mg/MgBufferCopy';

function getShaderSource (id:string) : string {
  let node = document.getElementById(id)

  if (node && node.textContent) {
    return node.textContent.replace(/^\s+|\s+$/g, '')
  }
  else {
    return ''
  }
}

  // HOST_VISIBLE Index buffer
  function prepareStagingIndices(
    device: IMgDevice
    , partition: IMgThreadPartition
    , indices:Uint32Array
    , indexBufferSize: number
  ) : StagingBuffer {
    let indexbufferInfo = new MgBufferCreateInfo();
    indexbufferInfo.size = indexBufferSize;
    // DEV: WebGL cannot copy internal gl buffer data between element array data and non element array data
    indexbufferInfo.usage = MgBufferUsageFlagBits.TRANSFER_SRC_BIT;    

    // Copy index data to a buffer visible to the host (staging buffer)
    let outBuffer 
      : {pBuffer:IMgBuffer|null}
      = {pBuffer:null};
    let err = device.createBuffer(
      indexbufferInfo
      , null
      , outBuffer);
    if (err != MgResult.SUCCESS) {
      throw new Error(err.toString());
    }

    let sb = new StagingBuffer();
    sb.buffer = outBuffer.pBuffer as IMgBuffer;

    let outMemReqs
      : {pMemoryRequirements:MgMemoryRequirements|null}
      = {pMemoryRequirements:null};
    device.getBufferMemoryRequirements(
        sb.buffer
      , outMemReqs);
    let memReqs = outMemReqs.pMemoryRequirements as MgMemoryRequirements;

    let outTypeIndex
      : {typeIndex:number}
      = {typeIndex:0};
    let isValid = partition.getMemoryType(
      memReqs.memoryTypeBits
      , MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT
        | MgMemoryPropertyFlagBits.HOST_COHERENT_BIT
      ,outTypeIndex);
    if (!isValid) {
      throw new Error('getMemoryType');
    }

    let memAlloc = new MgMemoryAllocateInfo();
    memAlloc.allocationSize = memReqs.size;
    memAlloc.memoryTypeIndex = outTypeIndex.typeIndex;

    let outMemory
      : {pMemory:IMgDeviceMemory|null}         
      = {pMemory:null};
    err = device.allocateMemory(
      memAlloc
      , null
      , outMemory);
    if (err != MgResult.SUCCESS) {
      throw new Error(err.toString());
    }
    sb.memory = outMemory.pMemory as IMgDeviceMemory;

    let outData
      : {ppData: Uint8Array|null}
      = {ppData: null};
    err = sb.memory.mapMemory(
      device
      , 0
      , indexBufferSize
      , 0
      , outData);
    if (err != MgResult.SUCCESS) {
      throw new Error(err.toString());
    }

    let data = outData.ppData as Uint8Array;
    
    // JS : THIS IS DUMB
    let input = new DataView(data.buffer, data.byteOffset);
    
    let offset = 0;    
    for (let i = 0; i < indices.length; i += 1) {
      input.setUint32(offset, indices[i], true);
      offset += indices.BYTES_PER_ELEMENT;
    }

    sb.memory.unmapMemory(device);

    err = sb.buffer.bindBufferMemory(
      device
      , sb.memory
      , 0);
    if (err != MgResult.SUCCESS) {
      throw new Error(err.toString());
    }

    return sb;
  }

  // DEVICE_LOCAL index buffer
  function setupDeviceLocalIndices(
    device: IMgDevice
    , partition: IMgThreadPartition    
    , indexBufferSize: number
  ) : StagingBuffer {
    let result = new StagingBuffer();

    // Create destination buffer with device only visibility
    let indexbufferInfo = new MgBufferCreateInfo();
    indexbufferInfo.size = indexBufferSize;
    indexbufferInfo.usage = 
      MgBufferUsageFlagBits.INDEX_BUFFER_BIT
      | MgBufferUsageFlagBits.TRANSFER_DST_BIT;

    let outBuffer
      : {pBuffer:IMgBuffer|null}
      = {pBuffer:null};
    let err = device.createBuffer(
      indexbufferInfo
      , null
      , outBuffer);
    if (err != MgResult.SUCCESS) {
      throw new Error(err.toString());
    }
    result.buffer = outBuffer.pBuffer as IMgBuffer;

    let outMemReqs
      : {pMemoryRequirements:MgMemoryRequirements|null}
      = {pMemoryRequirements:null};
    device.getBufferMemoryRequirements(
      result.buffer
      , outMemReqs);

    let memReqs
      = outMemReqs.pMemoryRequirements as MgMemoryRequirements;
    let outTypeIndex
      : {typeIndex:number}
      = {typeIndex:0};
    let isValid = partition.getMemoryType(
      memReqs.memoryTypeBits
      , MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
      , outTypeIndex);
    if (!isValid) {
      throw new Error('getMemoryType');
    }

    let memAlloc = new MgMemoryAllocateInfo();
    memAlloc.allocationSize = memReqs.size;
    memAlloc.memoryTypeIndex = outTypeIndex.typeIndex;

    let outMemory
      : {pMemory:IMgDeviceMemory|null}
      = {pMemory:null};
    err = device.allocateMemory(
      memAlloc
      , null
      , outMemory);
    if (err != MgResult.SUCCESS) {
      throw new Error(err.toString());
    }
    result.memory
      = outMemory.pMemory as IMgDeviceMemory;

    err = result.buffer.bindBufferMemory(
      device
      , result.memory
      , 0);
    if (err != MgResult.SUCCESS) {
      throw new Error(err.toString());
    }

    return result;
  }

export function pipelineTest (backbone: MgBackbone) {
  let device = backbone.configuration.device;

  let pPipelineLayoutCreateInfo = new MgPipelineLayoutCreateInfo();
  pPipelineLayoutCreateInfo.setLayouts = [];

  let outPipelineLayout: {pPipelineLayout:IMgPipelineLayout|null} = {pPipelineLayout:null};

  let err = device.createPipelineLayout(
      pPipelineLayoutCreateInfo
    , null
    , outPipelineLayout);
  if (err != MgResult.SUCCESS) {
    throw new Error(err.toString());
  }

  let pipelineLayout = outPipelineLayout.pPipelineLayout as IMgPipelineLayout;
  
  let vsCreateInfo = new MgShaderModuleCreateInfo();
  vsCreateInfo.code = getShaderSource('vs');
  vsCreateInfo.codeSize = vsCreateInfo.code.length;

  let outVsModule: {pShaderModule:IMgShaderModule|null} = {pShaderModule:null};
  err = device.createShaderModule(vsCreateInfo, null, outVsModule);
  if (err != MgResult.SUCCESS) {
    throw new Error(err.toString());
  }

  let fs = getShaderSource('fs');

  let fsCreateInfo = new MgShaderModuleCreateInfo();
  fsCreateInfo.code = fs;
  fsCreateInfo.codeSize = fs.length;

  let outFsModule: {pShaderModule:IMgShaderModule|null} = {pShaderModule:null};

  err = device.createShaderModule(fsCreateInfo, null, outFsModule);
  if (err != MgResult.SUCCESS) {
    throw new Error(err.toString());
  }
     
  let createInfo = new MgGraphicsPipelineCreateInfo();
      
  let vsStage = new MgPipelineShaderStageCreateInfo();
  vsStage.stage = MgShaderStageFlagBits.VERTEX_BIT;

  let vsModule = outVsModule.pShaderModule as IMgShaderModule;
  vsStage.module = vsModule;
  vsStage.name = "vertFunc";

  let fsStage = new MgPipelineShaderStageCreateInfo();
  fsStage.stage = MgShaderStageFlagBits.FRAGMENT_BIT;

  let fsModule = outFsModule.pShaderModule as IMgShaderModule;
  fsStage.module = fsModule;
  fsStage.name = "fragFunc";

  // Input assembly state describes how primitives are assembled
  // This pipeline will assemble vertex data as a triangle lists (though we only use one triangle)
  let iaState = new MgPipelineInputAssemblyStateCreateInfo();
  iaState.topology = MgPrimitiveTopology.TRIANGLE_LIST;

  // Rasterization state
  let rasterState
    = new MgPipelineRasterizationStateCreateInfo();       
  rasterState.polygonMode = MgPolygonMode.FILL;
  rasterState.cullMode = MgCullModeFlagBits.NONE;
  rasterState.frontFace = MgFrontFace.COUNTER_CLOCKWISE;
  rasterState.depthClampEnable = false;
  rasterState.rasterizerDiscardEnable = false;
  rasterState.depthBiasEnable = false;   

  createInfo.stages = [vsStage, fsStage];

  let vertInputState = new MgPipelineVertexInputStateCreateInfo();  

  // HERE is where we test the code

  let positionBinding = new MgVertexInputBindingDescription();
  positionBinding.binding = 0;
  positionBinding.stride = 4 * 6;
  positionBinding.inputRate = MgVertexInputRate.VERTEX;

  let positionAttribute = new MgVertexInputAttributeDescription();
  positionAttribute.binding = 0;
  positionAttribute.format = MgFormat.R32G32B32_SFLOAT;
  positionAttribute.location = 0;
  positionAttribute.offset = 0;

  let colorAttribute = new MgVertexInputAttributeDescription();  
  colorAttribute.binding = 0;
  colorAttribute.format = MgFormat.R32G32B32_SFLOAT;
  colorAttribute.location = 1;
  colorAttribute.offset = 12;

  vertInputState.vertexBindingDescriptions = [positionBinding];
  vertInputState.vertexAttributeDescriptions = [positionAttribute, colorAttribute];
  createInfo.vertexInputState = vertInputState;

  createInfo.inputAssemblyState = iaState;
  createInfo.rasterizationState = rasterState;

  let attachment = new MgPipelineColorBlendAttachmentState();
  attachment.colorWriteMask 
    = MgColorComponentFlagBits.R_BIT
    | MgColorComponentFlagBits.G_BIT
    | MgColorComponentFlagBits.B_BIT
    | MgColorComponentFlagBits.A_BIT;
  attachment.blendEnable = false;

  let cbState = new MgPipelineColorBlendStateCreateInfo(); 
  cbState.attachments = [attachment];
  createInfo.colorBlendState = cbState;

  let msState = new MgPipelineMultisampleStateCreateInfo();
  msState.rasterizationSamples = MgSampleCountFlagBits.COUNT_1_BIT;
  msState.sampleMask = null;
  createInfo.multisampleState = msState;

  createInfo.layout = pipelineLayout;
  createInfo.renderPass = backbone.graphicsDevice.renderpass;
  
  createInfo.viewportState = null;

  let dssState = new MgPipelineDepthStencilStateCreateInfo();
  dssState.depthTestEnable = true;
  dssState.depthWriteEnable = true;
  dssState.depthCompareOp = MgCompareOp.LESS_OR_EQUAL;
  dssState.depthBoundsTestEnable = false;

  let dsBack = new MgStencilOpState();
  dsBack.failOp = MgStencilOp.KEEP;
  dsBack.passOp = MgStencilOp.KEEP;
  dsBack.compareOp = MgCompareOp.ALWAYS;
  dssState.back = dsBack;

  dssState.stencilTestEnable = false;

  let dsFront = new MgStencilOpState();
  dsFront.failOp = MgStencilOp.KEEP;
  dsFront.passOp = MgStencilOp.KEEP;
  dsFront.compareOp = MgCompareOp.ALWAYS;
  dssState.front = dsFront;

  createInfo.depthStencilState = dssState;

  createInfo.dynamicState = null;

  let out
    : {pPipelines:Array<IMgPipeline>|null}
    = {pPipelines:null};

  // Create rendering pipeline using the specified states
  err = device.createGraphicsPipelines(
    null
    , [createInfo]
    , null
    , out);

  if (err != MgResult.SUCCESS) {
    throw new Error(err.toString());
  }

  vsModule.destroyShaderModule(device, null);
  fsModule.destroyShaderModule(device, null);

  let pipelines = out.pPipelines as Array<IMgPipeline>;
  let graphicsProgram = pipelines[0] as IWGLGraphicsPipeline;

  let gl = backbone.gl;

  gl.useProgram(graphicsProgram.programID)
  // -- Init Vertex Array

  // -- Init Buffers
  let vertexPosLocation = 0  // set with GLSL layout qualifier
  
  let vertices = new Float32Array([
    1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
    -1.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    0.0, -1.0, 0.0, 0.0, 0.0, 1.0,
  ])

  let vertexPosBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  let indices = new Uint32Array([0, 1, 2]);

  let indexBufferSize = indices.byteLength;
  let stagingIndices = prepareStagingIndices(device, backbone.configuration.partition, indices, indices.byteLength);

  let deviceIndices = setupDeviceLocalIndices(
    device,
    backbone.configuration.partition,
    indices.byteLength
  );

  let indexRegion = new MgBufferCopy();
  indexRegion.size = indexBufferSize;
  // Index buffer

  let outPool 
  : {pCommandPool:IMgCommandPool|null}
  = {pCommandPool:null};
  let pCreateInfo = new MgCommandPoolCreateInfo();

  device.createCommandPool(pCreateInfo, null, outPool )

  let cmdBufs = new Array<IWGLCommandBuffer>(2);

  let pAllocateInfo = new MgCommandBufferAllocateInfo();
  pAllocateInfo.commandBufferCount = 2;
  pAllocateInfo.commandPool = outPool.pCommandPool as IMgCommandPool;
  pAllocateInfo.level = MgCommandBufferLevel.PRIMARY;
  err = device.allocateCommandBuffers(pAllocateInfo, cmdBufs);

  let drawCmd = cmdBufs[0];  
  let copyCmd = cmdBufs[1];

  let cpBeginInfo = new MgCommandBufferBeginInfo();  
  copyCmd.beginCommandBuffer(cpBeginInfo);
  copyCmd.cmdCopyBuffer(
    stagingIndices.buffer
    , deviceIndices.buffer
    , [indexRegion]);
  copyCmd.cmdEndRenderPass();    
  copyCmd.endCommandBuffer(); 

  runCommands(copyCmd, backbone);

  let vaEncoder = new WGLCmdVertexArrayEncodingSection(backbone.vertexArrays);

  var draw = new WGLCmdDrawEncodingSection();
  var bag = new WGLCmdGraphicsBag();
  var sorter = new WGLCmdEncoderContextSorter();

  let dSets = new MockWGLCmdDescriptorSetEncodingSection();
  let gEncoder = new WGLCmdGraphicsEncoder(
    sorter,
    bag,
    dSets,
    vaEncoder,
    draw);
  
  // -- Render
  gl.clearColor(0.0, 0.0, 1.0, 1.0)
  //gl.clear(gl.COLOR_BUFFER_BIT)
  // gl.bindVertexArray(va)
  
  let dcBeginInfo = new MgCommandBufferBeginInfo();  
  drawCmd.beginCommandBuffer(dcBeginInfo);

  let passBegin = new MgRenderPassBeginInfo();  
  drawCmd.cmdBeginRenderPass(passBegin, MgSubpassContents.INLINE);
  drawCmd.cmdBindPipeline(MgPipelineBindPoint.GRAPHICS, graphicsProgram);  
  drawCmd.cmdBindIndexBuffer(deviceIndices.buffer, 0, MgIndexType.UINT32);

  let vp = new MgViewport();
  vp.x = 0;
  vp.y = 0;
  vp.minDepth = 0;
  vp.maxDepth = 1000;
  vp.width = 640;
  vp.height = 480;
  drawCmd.cmdSetViewport(0, [vp])

  let scissor = new MgRect2D();
  scissor.extent.width = 640;
  scissor.extent.height = 480;
  drawCmd.cmdSetScissor(0, [scissor]);

  let vPosBuffer = new MockWebGLBuffer();
  vPosBuffer.usage = MgBufferUsageFlagBits.VERTEX_BUFFER_BIT;
  vPosBuffer.deviceMemory = vertexPosBuffer;
 
  let vertexData = new WGLCmdVertexBufferParameter();    
  vertexData.firstBinding = 0;
  vertexData.pBuffers = [vPosBuffer];
  vertexData.pOffsets = [];

  drawCmd.cmdBindVertexBuffers(0, [vPosBuffer], null);

  drawCmd.cmdDrawIndexed(3, 1, 0, 0, 0);
  drawCmd.cmdEndRenderPass();  

  drawCmd.endCommandBuffer(); 

  runCommands(drawCmd, backbone);

  gl.deleteBuffer(vertexPosBuffer)

}

function runCommands(
  drawCmd: IWGLCommandBuffer
  , backbone:MgBackbone
):void {
  var renderer = new MockCmdStateRenderer(
    backbone.draws,
    backbone.cache
  );  

  var drawRecording = new WGLCmdCommandRecording(
        new WGLCmdComputeRecording(
          drawCmd.record.computeGrid,
          new WGLCmdComputeEncoder()
        )
        , new WGLCmdGraphicsRecording(drawCmd.record.graphicsGrid, renderer)
        , new WGLCmdBlitRecording(
            drawCmd.record.blitGrid,
            backbone.blit
          )
        );

  for (let context of drawCmd.record.contexts) {
    for (let i = context.first; i <= context.last; i += 1)
    {
      drawCmd.record.instructions[i].perform(drawRecording);
    }
  }
}

export default pipelineTest;