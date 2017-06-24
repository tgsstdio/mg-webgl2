import {WGLCmdGraphicsGrid} from './WGLCmdGraphicsGrid';
import {IMgPipeline} from '../mg/IMgPipeline';
import {MgViewport} from '../mg/MgViewport';
import {MgRect2D} from '../mg/MgRect2D';
import {MgColor4f} from '../mg/MgColor4f';
import {MgStencilFaceFlagBits} from '../mg/MgStencilFaceFlagBits';
import {MgRenderPassBeginInfo} from '../mg/MgRenderPassBeginInfo';
import {MgSubpassContents} from '../mg/MgSubpassContents';
import {IMgBuffer} from '../mg/IMgBuffer';
import {MgIndexType} from '../mg/MgIndexType';
import {IMgPipelineLayout} from '../mg/IMgPipelineLayout';
import {IMgDescriptorSet} from '../mg/IMgDescriptorSet';

export interface IWGLCmdGraphicsEncoder {
  asGrid(): WGLCmdGraphicsGrid;
  clear(): void;

  bindPipeline(pipeline: IMgPipeline|null) : void;
  setViewport(
    firstViewport: number
    , pViewports: Array<MgViewport>
  ) : void;
  setScissor(
    firstScissor: number
    , pScissors: Array<MgRect2D>
  ) : void;
  setDepthBias(
    depthBiasConstantFactor: number
    , depthBiasClamp: number
    , depthBiasSlopeFactor: number) : void;    
  setBlendConstants(blendConstants: MgColor4f) : void;
  setStencilCompareMask(
    faceMask: MgStencilFaceFlagBits
    , compareMask: number) : void;
  setStencilWriteMask(
    faceMask: MgStencilFaceFlagBits
    , writeMask: number) : void;
  setStencilReference(
    faceMask: MgStencilFaceFlagBits
    , reference: number) : void;
  beginRenderPass(pRenderPassBegin: MgRenderPassBeginInfo
    , contents: MgSubpassContents) : void;
  endRenderPass() : void;
  nextSubpass(contents: MgSubpassContents) : void;
  
  drawIndexed(indexCount: number
    , instanceCount: number
    , firstIndex: number
    , vertexOffset: number
    , firstInstance: number) : void;
  bindIndexBuffer(buffer: IMgBuffer
    , offset: number
    , indexType: MgIndexType) : void;
  // WARN: offset requires UInt64
  drawIndexedIndirect(buffer: IMgBuffer
    , offset: number
    , drawCount: number
    , stride: number) : void;
  draw(vertexCount: number
    , instanceCount: number
    , firstVertex: number
    , firstInstance: number) : void;
  // WARN: offset requires UInt64
  drawIndirect(buffer : IMgBuffer
    , offset: number
    , drawCount: number
    , stride: number) : void;
  // WARN: pOffsets requires UInt64
  bindVertexBuffers(firstBinding: number
    , pBuffers: Array<IMgBuffer>
    , pOffsets: Array<number>) : void;
  bindDescriptorSets(
    layout: IMgPipelineLayout
    , firstSet: number
    , descriptorSetCount: number
    , pDescriptorSets: Array<IMgDescriptorSet>
    , pDynamicOffsets: Array<number>|null) : void;
  // DON'T HAVE THIS IN WEBGL2
  // setDepthBounds(minDepthBounds: number, maxDepthBounds: number) : void;
  // MODERN BROWSERS DON'T USE THIS
  // setLineWidth(lineWidth: number) : void;
}
