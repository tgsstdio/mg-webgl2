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

function getShaderSource (id:string) : string {
  let node = document.getElementById(id)

  if (node && node.textContent) {
    return node.textContent.replace(/^\s+|\s+$/g, '')
  }
  else {
    return ''
  }
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

  let indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

  // let vertexColorLocation = 1  // set with GLSL layout qualifier
  // let colors = new Float32Array([
  //   1.0, 0.5, 0.0,
  //   0.0, 0.5, 1.0
  // ])
  // let vertexColorBuffer = gl.createBuffer()
  // gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer)  
  // gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW)

  let indicesBuffer = new MockWebGLBuffer();
  indicesBuffer.usage = MgBufferUsageFlagBits.INDEX_BUFFER_BIT;
  indicesBuffer.deviceMemory = indexBuffer;


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
  
  let outPool 
    : {pCommandPool:IMgCommandPool|null}
    = {pCommandPool:null};
  let pCreateInfo = new MgCommandPoolCreateInfo();

  device.createCommandPool(pCreateInfo, null, outPool )

  let cmdBufs = new Array<IWGLCommandBuffer>(1);

  let pAllocateInfo = new MgCommandBufferAllocateInfo();
  pAllocateInfo.commandBufferCount = 1;
  pAllocateInfo.commandPool = outPool.pCommandPool as IMgCommandPool;
  pAllocateInfo.level = MgCommandBufferLevel.PRIMARY;
  err = device.allocateCommandBuffers(pAllocateInfo, cmdBufs);

  let cmd = cmdBufs[0];

  let pBeginInfo = new MgCommandBufferBeginInfo();  
  cmd.beginCommandBuffer(pBeginInfo);

  let passBegin = new MgRenderPassBeginInfo();  
  cmd.cmdBeginRenderPass(passBegin, MgSubpassContents.INLINE);
  cmd.cmdBindPipeline(MgPipelineBindPoint.GRAPHICS, graphicsProgram);  
  cmd.cmdBindIndexBuffer(indicesBuffer, 0, MgIndexType.UINT32);

  let vp = new MgViewport();
  vp.x = 0;
  vp.y = 0;
  vp.minDepth = 0;
  vp.maxDepth = 1000;
  vp.width = 640;
  vp.height = 480;
  cmd.cmdSetViewport(0, [vp])

  let scissor = new MgRect2D();
  scissor.extent.width = 640;
  scissor.extent.height = 480;
  cmd.cmdSetScissor(0, [scissor]);

  let vPosBuffer = new MockWebGLBuffer();
  vPosBuffer.usage = MgBufferUsageFlagBits.VERTEX_BUFFER_BIT;
  vPosBuffer.deviceMemory = vertexPosBuffer;
 
  let vertexData = new WGLCmdVertexBufferParameter();    
  vertexData.firstBinding = 0;
  vertexData.pBuffers = [vPosBuffer];
  vertexData.pOffsets = [];

  cmd.cmdBindVertexBuffers(0, [vPosBuffer], null);

  cmd.cmdDrawIndexed(3, 1, 0, 0, 0);
  cmd.cmdEndRenderPass();  

  cmd.endCommandBuffer(); 

  var renderer = new MockCmdStateRenderer(
    backbone.draws,
    backbone.cache
  );  

  var recording = new WGLCmdCommandRecording(
        new WGLCmdComputeRecording(
          cmd.record.computeGrid,
          new WGLCmdComputeEncoder()
        )
        , new WGLCmdGraphicsRecording(cmd.record.graphicsGrid, renderer)
        , new WGLCmdBlitRecording(
            cmd.record.blitGrid,
            new MockWGLCmdBlitOperationEntrypoint()
          )
        );

  let pro = new Promise<Number>(
  (resolve) => {
    for (let context of cmd.record.contexts) {
      for (let i = context.first; i <= context.last; i += 1)
      {
        cmd.record.instructions[i].perform(recording);
      }
    }
    console.log('pipelineTest-START')
    resolve(1);
  });

  pro.then((num) => {
    console.log('pipelineTest5-DONE' + num) 

    // -- Delete WebGL resources
    gl.deleteBuffer(indexBuffer)
  
    gl.deleteBuffer(vertexPosBuffer)
  })
  .catch(() => { console.log('pipelineTest5-FAIL')  })

  //gl.drawElementsInstanced(gl.TRIANGLES, 3, gl.UNSIGNED_INT, 0, 1)


  // gl.deleteBuffer(vertexColorBuffer)
 // gl.deleteVertexArray(va)
}

export default pipelineTest;