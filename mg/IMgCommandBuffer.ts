import {MgCommandBufferBeginInfo} from './MgCommandBufferBeginInfo'
import {MgResult} from './MgResult'
import {MgCommandBufferResetFlagBits} from './MgCommandBufferResetFlagBits'
import {MgPipelineBindPoint} from './MgPipelineBindPoint'
import {IMgPipeline} from './IMgPipeline'
import {MgViewport} from './MgViewport'
import {MgRect2D} from './MgRect2D'
import {MgColor4f} from './MgColor4f'
import {MgStencilFaceFlagBits} from './MgStencilFaceFlagBits'
import {IMgPipelineLayout} from './IMgPipelineLayout'
import {IMgDescriptorSet} from './IMgDescriptorSet'
import {IMgBuffer} from './IMgBuffer'
import {MgIndexType} from './MgIndexType'
import {MgBufferCopy} from './MgBufferCopy'
import {IMgImage} from './IMgImage'
import {MgImageLayout} from './MgImageLayout'
import {MgImageCopy} from './MgImageCopy'
import {MgImageBlit} from './MgImageBlit'
import {MgBufferImageCopy} from './MgBufferImageCopy'
import {MgClearColorValue} from './MgClearColorValue'
import {MgImageSubresourceRange} from './MgImageSubresourceRange'
import {MgClearDepthStencilValue} from './MgClearDepthStencilValue'
import {MgClearAttachment} from './MgClearAttachment'
import {MgClearRect} from './MgClearRect'
import {MgImageResolve} from './MgImageResolve'
import {IMgEvent} from './IMgEvent'
import {MgPipelineStageFlagBits} from './MgPipelineStageFlagBits'
import {MgMemoryBarrier} from './MgMemoryBarrier'
import {MgBufferMemoryBarrier} from './MgBufferMemoryBarrier'
import {MgImageMemoryBarrier} from './MgImageMemoryBarrier'
import {MgDependencyFlagBits} from './MgDependencyFlagBits'
import {IMgQueryPool} from './IMgQueryPool'
import {MgQueryControlFlagBits} from './MgQueryControlFlagBits'
import {MgQueryResultFlagBits} from './MgQueryResultFlagBits'
import {MgShaderStageFlagBits} from './MgShaderStageFlagBits'
import {MgRenderPassBeginInfo} from './MgRenderPassBeginInfo'
import {MgSubpassContents} from './MgSubpassContents'
import {MgFilter} from './MgFilter'


export interface IMgCommandBuffer	{
  beginCommandBuffer(pBeginInfo: MgCommandBufferBeginInfo) : MgResult;
  endCommandBuffer() : MgResult;
  resetCommandBuffer(flags: MgCommandBufferResetFlagBits) : MgResult;
  cmdBindPipeline(pipelineBindPoint: MgPipelineBindPoint
    , pipeline: IMgPipeline) : void;
  cmdSetViewport(firstViewport: number, pViewports: Array<MgViewport>) : void;
  cmdSetScissor(firstScissor: number, pScissors: Array<MgRect2D>) : void;
  cmdSetLineWidth(lineWidth: number) : void;
  cmdSetDepthBias(depthBiasConstantFactor: number
    , depthBiasClamp: number
    , depthBiasSlopeFactor: number) : void;
  cmdSetBlendConstants(blendConstants: MgColor4f) : void;
  cmdSetDepthBounds(minDepthBounds: number, maxDepthBounds: number) : void;
  cmdSetStencilCompareMask(faceMask: MgStencilFaceFlagBits
    , compareMask: number) : void;
  cmdSetStencilWriteMask(faceMask: MgStencilFaceFlagBits
    , writeMask: number) : void;
  cmdSetStencilReference(faceMask: MgStencilFaceFlagBits
    , reference: number) : void;
  cmdBindDescriptorSets(pipelineBindPoint: MgPipelineBindPoint
    , layout: IMgPipelineLayout
    , firstSet: number
    , descriptorSetCount: number
    , pDescriptorSets: Array<IMgDescriptorSet>
    , pDynamicOffsets: Array<number>|null) : void;
  // WARN: offset requires UInt64
  cmdBindIndexBuffer(buffer: IMgBuffer
    , offset: number
    , indexType: MgIndexType) : void;
  // WARN: pOffsets requires UInt64
  cmdBindVertexBuffers(firstBinding: number
    , pBuffers: Array<IMgBuffer>
    , pOffsets: Array<number>) : void;
  cmdDraw(vertexCount: number
    , instanceCount: number
    , firstVertex: number
    , firstInstance: number) : void;
  cmdDrawIndexed(indexCount: number
    , instanceCount: number
    , firstIndex: number
    , vertexOffset: number
    , firstInstance: number) : void;
  // WARN: offset requires UInt64
  cmdDrawIndirect(buffer : IMgBuffer
    , offset: number
    , drawCount: number
    , stride: number) : void;
  // WARN: offset requires UInt64
  cmdDrawIndexedIndirect(buffer: IMgBuffer
    , offset: number
    , drawCount: number
    , stride: number) : void;
  cmdDispatch(x: number, y: number, z: number) : void;
  // WARN: offset requires UInt64
  cmdDispatchIndirect(buffer: IMgBuffer
    , offset: number) : void;
  cmdCopyBuffer(srcBuffer: IMgBuffer
    , dstBuffer: IMgBuffer
    , pRegions: Array<MgBufferCopy>) : void;
  cmdCopyImage(srcImage: IMgImage
    , srcImageLayout: MgImageLayout
    , dstImage: IMgImage
    , dstImageLayout: MgImageLayout
    , pRegions: Array<MgImageCopy>) : void;
  cmdBlitImage(srcImage: IMgImage
    , srcImageLayout: MgImageLayout
    , dstImage: IMgImage
    , dstImageLayout: MgImageLayout
    , pRegions: Array<MgImageBlit>
    , filter: MgFilter) : void;
  cmdCopyBufferToImage(srcBuffer: IMgBuffer
    , dstImage: IMgImage
    , dstImageLayout: MgImageLayout
    , pRegions: Array<MgBufferImageCopy>) : void;
  cmdCopyImageToBuffer(srcImage: IMgImage
    , srcImageLayout: MgImageLayout
    , dstBuffer: IMgBuffer
    , pRegions: Array<MgBufferImageCopy>) : void;
  // WARN: dstOffset requires UInt64
  // WARN: dataSize requires UInt64
  // WARN: pData requires IntPtr
  cmdUpdateBuffer(dstBuffer: IMgBuffer
    , dstOffset: number
    , dataSize: number
    , pData: any) : void;
  // WARN: dstOffset requires UInt64
  // WARN: size requires UInt64      
  cmdFillBuffer(dstBuffer: IMgBuffer
    , dstOffset: number
    , size: number
    , data: number) : void;
  cmdClearColorImage(image: IMgImage
    , imageLayout: MgImageLayout
    , pColor: MgClearColorValue
    , pRanges: Array<MgImageSubresourceRange>) : void;
  cmdClearDepthStencilImage(image: IMgImage
    , imageLayout: MgImageLayout
    , pDepthStencil: MgClearDepthStencilValue
    , pRanges: Array<MgImageSubresourceRange>) : void;
  cmdClearAttachments(pAttachments: Array<MgClearAttachment>
    , pRects: Array<MgClearRect>) : void;
  cmdResolveImage(srcImage: IMgImage
    , srcImageLayout: MgImageLayout
    , dstImage: IMgImage
    , dstImageLayout: MgImageLayout
    , pRegions: Array<MgImageResolve>) : void;
  cmdSetEvent(event: IMgEvent
    , stageMask: MgPipelineStageFlagBits) : void;
  cmdResetEvent(event: IMgEvent
    , stageMask: MgPipelineStageFlagBits) : void;
  cmdWaitEvents(pEvents: Array<IMgEvent>
    , srcStageMask: MgPipelineStageFlagBits
    , dstStageMask: MgPipelineStageFlagBits
    , pMemoryBarriers: Array<MgMemoryBarrier>
    , pBufferMemoryBarriers: Array<MgBufferMemoryBarrier>
    , pImageMemoryBarriers: Array<MgImageMemoryBarrier>) : void;
  cmdPipelineBarrier(srcStageMask: MgPipelineStageFlagBits
    , dstStageMask: MgPipelineStageFlagBits
    , dependencyFlags: MgDependencyFlagBits
    , pMemoryBarriers: Array<MgMemoryBarrier>
    , pBufferMemoryBarriers: Array<MgBufferMemoryBarrier>
    , pImageMemoryBarriers: Array<MgImageMemoryBarrier>) : void;
  cmdBeginQuery(queryPool: IMgQueryPool
    , query: number
    , flags: MgQueryControlFlagBits) : void;
  cmdEndQuery(queryPool: IMgQueryPool, query: number) : void;
  cmdResetQueryPool(queryPool: IMgQueryPool
    , firstQuery: number, queryCount: number) : void;
  cmdWriteTimestamp(pipelineStage: MgPipelineStageFlagBits
    , queryPool: IMgQueryPool, query: number) : void;
  // WARN: dstOffset requires UInt64  
  // WARN: stride requires UInt64 
  cmdCopyQueryPoolResults(queryPool: IMgQueryPool
    , firstQuery: number
    , queryCount: number
    , dstBuffer: IMgBuffer
    , dstOffset: number
    , stride: number
    , flags: MgQueryResultFlagBits) : void;
  // WARN: pValues requires IntPtr 
  cmdPushConstants(layout: IMgPipelineLayout
    , stageFlags: MgShaderStageFlagBits
    , offset: number
    , size: number
    , pValues: any) : void;
  cmdBeginRenderPass(pRenderPassBegin: MgRenderPassBeginInfo
    , contents: MgSubpassContents) : void;
  cmdNextSubpass(contents: MgSubpassContents) : void;
  cmdEndRenderPass() : void;
  cmdExecuteCommands(pCommandBuffers: Array<IMgCommandBuffer>) : void;
}
