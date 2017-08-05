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

  // let vertexColorLocation = 1  // set with GLSL layout qualifier
  // let colors = new Float32Array([
  //   1.0, 0.5, 0.0,
  //   0.0, 0.5, 1.0
  // ])
  // let vertexColorBuffer = gl.createBuffer()
  // gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer)  
  // gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW)

  let vaEncoder = new WGLCmdVertexArrayEncodingSection(backbone.vertexArrays);



  let vPosBuffer = new MockWebGLBuffer();
  vPosBuffer.usage = MgBufferUsageFlagBits.VERTEX_BUFFER_BIT;
  vPosBuffer.deviceMemory = vertexPosBuffer;

  // let vColorBuffer =new MockWebGLBuffer();
  // vColorBuffer.usage = MgBufferUsageFlagBits.VERTEX_BUFFER_BIT;
  // vColorBuffer.deviceMemory = vertexColorBuffer;
  
  let vertexData = new WGLCmdVertexBufferParameter();    
  vertexData.firstBinding = 0;
  vertexData.pBuffers = [vPosBuffer];
  vertexData.pOffsets = [];

  let boundVAO = vaEncoder.generateVBO(graphicsProgram, vertexData);

  // NEED TO TEST generateVBO code here
  // let vertexArray = gl.createVertexArray()
  // gl.bindVertexArray(vertexArray)
  // gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
  // gl.enableVertexAttribArray(vertexPosLocation)
  // gl.vertexAttribPointer(vertexPosLocation, 2, gl.FLOAT, false, 0, 0)
  // gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer)  
  // gl.enableVertexAttribArray(vertexColorLocation)
  // gl.vertexAttribPointer(vertexColorLocation, 3, gl.FLOAT, false, 0, 0)
  // gl.vertexAttribDivisor(vertexColorLocation, 1) // attribute used once per instance
  // gl.bindVertexArray(null)

  let va = boundVAO.vertexArray;

  // -- Render
  gl.clearColor(0.0, 0.0, 1.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.bindVertexArray(va)
  gl.drawArraysInstanced(gl.TRIANGLES, 0, 3, 1)
  // -- Delete WebGL resources
  gl.deleteBuffer(vertexPosBuffer)
  // gl.deleteBuffer(vertexColorBuffer)
  gl.deleteVertexArray(va)
}

export default pipelineTest;