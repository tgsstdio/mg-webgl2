import {IWGLCommandBuffer}
	from './IWGLCommandBuffer';	
import {WGLCmdCommandEncoder}
	from './WGLCmdCommandEncoder';
import {WGLCmdCommandBufferRecord}
	from './WGLCmdCommandBufferRecord';	  	
import {MgCommandBufferUsageFlagBits}
	from '../../mg/MgCommandBufferUsageFlagBits';	   
import {MgResult}
	from '../../mg/MgResult';
import {MgCommandBufferBeginInfo}
	from '../../mg/MgCommandBufferBeginInfo';  
import {MgPipelineBindPoint}
	from '../../mg/MgPipelineBindPoint';  
import {IMgPipeline}
	from '../../mg/IMgPipeline';  
import {MgViewport}
	from '../../mg/MgViewport';  
import {MgRect2D}
	from '../../mg/MgRect2D';  
import {MgColor4f}
	from '../../mg/MgColor4f';     
import {MgStencilFaceFlagBits}
	from '../../mg/MgStencilFaceFlagBits'; 
import {IMgPipelineLayout}
	from '../../mg/IMgPipelineLayout';      
import {IMgDescriptorSet}
	from '../../mg/IMgDescriptorSet';  
import {IMgBuffer}
	from '../../mg/IMgBuffer';     
import {IMgImage}
	from '../../mg/IMgImage';  
import {MgBufferCopy}
	from '../../mg/MgBufferCopy';  
import {MgIndexType}
	from '../../mg/MgIndexType';       
import {MgImageLayout}
	from '../../mg/MgImageLayout';   
import {MgImageCopy}
	from '../../mg/MgImageCopy';   
import {MgImageBlit}
	from '../../mg/MgImageBlit';   
 import {MgFilter}
	from '../../mg/MgFilter';   
import {MgBufferImageCopy}
	from '../../mg/MgBufferImageCopy';   
import {MgClearColorValue}
	from '../../mg/MgClearColorValue';
import {MgImageSubresourceRange}
	from '../../mg/MgImageSubresourceRange';
import {MgClearDepthStencilValue}
	from '../../mg/MgClearDepthStencilValue';
import {MgClearAttachment}
	from '../../mg/MgClearAttachment';    
import {MgClearRect}
	from '../../mg/MgClearRect'; 
import {MgImageResolve}
	from '../../mg/MgImageResolve';   
import {IMgEvent}
	from '../../mg/IMgEvent';   
import {MgPipelineStageFlagBits}
	from '../../mg/MgPipelineStageFlagBits';       
import {MgMemoryBarrier}
	from '../../mg/MgMemoryBarrier';  
import {MgBufferMemoryBarrier}
	from '../../mg/MgBufferMemoryBarrier';      
import {MgImageMemoryBarrier}
	from '../../mg/MgImageMemoryBarrier';      
import {MgDependencyFlagBits}
	from '../../mg/MgDependencyFlagBits';      
import {IMgQueryPool}
	from '../../mg/IMgQueryPool';      
import {MgQueryControlFlagBits}
	from '../../mg/MgQueryControlFlagBits';  
import {MgQueryResultFlagBits}
	from '../../mg/MgQueryResultFlagBits';
import {MgShaderStageFlagBits}
	from '../../mg/MgShaderStageFlagBits';
import {MgRenderPassBeginInfo}
	from '../../mg/MgRenderPassBeginInfo';
import {MgSubpassContents}
	from '../../mg/MgSubpassContents';  
import {IMgCommandBuffer}
	from '../../mg/IMgCommandBuffer'; 
import {MgCommandBufferResetFlagBits}
	from '../../mg/MgCommandBufferResetFlagBits'; 

export class WGLCmdCommandBuffer implements IWGLCommandBuffer {
  private mManuallyResettable: boolean;
  private mCommandEncoder: WGLCmdCommandEncoder;

  constructor(
    canBeManuallyReset: boolean
    , encoder: WGLCmdCommandEncoder
  ) {
    this.mIsRecording = false;
    this.mManuallyResettable = canBeManuallyReset;
    this.mCommandEncoder = encoder;
    this.mRecord = new WGLCmdCommandBufferRecord();
  }

  isQueueReady: boolean;

  private mSubmissionRule: MgCommandBufferUsageFlagBits;
  get submissionRule(): MgCommandBufferUsageFlagBits {
    return this.mSubmissionRule;
  }

  resetAllData(): void {
    //
    // if (this.mRecord != null)
    // {
    //     Debug.Assert(Record.GraphicsGrid != null);
    //     Record.GraphicsGrid.Dispose();
    // }   

    this.mCommandEncoder.clear();

    this.mRecord = this.mCommandEncoder.asRecord();
  }

  resetCommandBuffer(
    flags: MgCommandBufferResetFlagBits
  ) : MgResult {
    if (this.mManuallyResettable)	{
      this.resetAllData();
      // OTHERWISE WAIT FOR BULK RESET VIA COMMAND POOL
    }
    return MgResult.SUCCESS;
  }    

  private mRecord: WGLCmdCommandBufferRecord;
  get record(): WGLCmdCommandBufferRecord {
    return this.mRecord;
  }

  // IMgCommandBuffer implementation
  private mIsRecording: boolean = false;
  beginCommandBuffer(
    pBeginInfo: MgCommandBufferBeginInfo
  ) : MgResult {
    this.mSubmissionRule = pBeginInfo.flags;
    this.isQueueReady = true;

    this.mIsRecording = true;

    if ((pBeginInfo.flags & MgCommandBufferUsageFlagBits.RENDER_PASS_CONTINUE_BIT)
        != MgCommandBufferUsageFlagBits.RENDER_PASS_CONTINUE_BIT)
    {
      this.resetAllData();
    }

    return MgResult.SUCCESS;
  }

  private mIsExecutable: boolean = false;
  endCommandBuffer() : MgResult	{
    this.mIsRecording = false;
    this.mIsExecutable = true;                   
    this.mRecord = this.mCommandEncoder.asRecord();
    return MgResult.SUCCESS;
  }    

  cmdBindPipeline(
    pipelineBindPoint: MgPipelineBindPoint
    , pipeline: IMgPipeline
  ): void {
    if (pipeline == null) {
      throw new Error('ERROR: pipeline is null');
    }

    if (pipelineBindPoint == MgPipelineBindPoint.COMPUTE) {
      this.mCommandEncoder.compute.bindPipeline(pipeline);
    }
    else {
      this.mCommandEncoder.graphics.bindPipeline(pipeline);
    }
  }

  cmdSetViewport(
    firstViewport: number
    , pViewports: Array<MgViewport>
  ): void {
    this.mCommandEncoder.graphics.setViewport(firstViewport, pViewports);
  }

  cmdSetScissor(
    firstScissor: number
    , pScissors: Array<MgRect2D>
  ) : void {
    this.mCommandEncoder.graphics.setScissor(firstScissor, pScissors);
  }

  cmdSetLineWidth(
    lineWidth: number
  ) : never {
    //this.mCommandEncoder.graphics.setLineWidth(lineWidth);
    throw new Error('ERROR: not implemented');
  }    

  cmdSetDepthBias(
    depthBiasConstantFactor: number
    , depthBiasClamp: number
    , depthBiasSlopeFactor: number
  ) : void {
    this.mCommandEncoder.graphics.setDepthBias(
      depthBiasConstantFactor,
      depthBiasClamp,
      depthBiasSlopeFactor);
  }

  cmdSetBlendConstants(blendConstants: MgColor4f) : void {
    this.mCommandEncoder.graphics.setBlendConstants(blendConstants);
  }

  cmdSetDepthBounds(
    minDepthBounds: number
    , maxDepthBounds: number
  ) : never {
    throw new Error('ERROR: not implemented');  
  }

  cmdSetStencilCompareMask(
    faceMask: MgStencilFaceFlagBits
    , compareMask: number
  ) : void {
    this.mCommandEncoder.graphics.setStencilCompareMask(
      faceMask
      , compareMask);
  }

  cmdSetStencilWriteMask(
    faceMask: MgStencilFaceFlagBits
    , writeMask: number
  ) : void {
    this.mCommandEncoder.graphics.setStencilWriteMask(
      faceMask
      , writeMask);
  }

  cmdSetStencilReference(
    faceMask: MgStencilFaceFlagBits
    , reference: number
  ) : void {
    this.mCommandEncoder.graphics.setStencilReference(
      faceMask
      , reference);
  }

  cmdBindDescriptorSets(
    pipelineBindPoint: MgPipelineBindPoint
    , layout: IMgPipelineLayout
    , firstSet: number
    , descriptorSetCount: number
    , pDescriptorSets: Array<IMgDescriptorSet>
    , pDynamicOffsets: Array<number>
  ) : void {
    if (pipelineBindPoint == MgPipelineBindPoint.GRAPHICS)
    {
      this.mCommandEncoder.graphics.bindDescriptorSets(
        layout
        ,	firstSet
        ,	descriptorSetCount
        ,	pDescriptorSets
        ,	pDynamicOffsets);
    }
  }

  // WARN: offset requires UInt64
  cmdBindIndexBuffer(
    buffer: IMgBuffer
    , offset: number
    , indexType: MgIndexType
  ) : void {
    this.mCommandEncoder.graphics.bindIndexBuffer(
      buffer
      , offset
      , indexType);
  }

  // WARN: pOffsets requires UInt64
  cmdBindVertexBuffers(
    firstBinding: number
    , pBuffers: Array<IMgBuffer>
    , pOffsets: Array<number>
  ) : void {
    this.mCommandEncoder.graphics.bindVertexBuffers(
      firstBinding
      , pBuffers
      , pOffsets);
  }

  cmdDraw(vertexCount: number
    , instanceCount: number
    , firstVertex: number
    , firstInstance: number
  ) : void {
    this.mCommandEncoder.graphics.draw(
      vertexCount
      , instanceCount
      , firstVertex
      , firstInstance);
  }

  cmdDrawIndexed(indexCount: number
    , instanceCount: number
    , firstIndex: number
    , vertexOffset: number
    , firstInstance: number
  ) : void {

  }

  // WARN: offset requires UInt64
  cmdDrawIndirect(
    buffer : IMgBuffer
    , offset: number
    , drawCount: number
    , stride: number
  ) : void {
    if (buffer == null) {
      throw new Error('ERROR: buffer is null');
    }      

    this.mCommandEncoder.graphics.drawIndirect(
      buffer
      , offset
      , drawCount
      , stride);
  }

  // WARN: offset requires UInt64
  cmdDrawIndexedIndirect(
    buffer: IMgBuffer
    , offset: number
    , drawCount: number
    , stride: number
  ) : void {
    if (buffer == null) {
      throw new Error('ERROR: buffer is null');
    }

    this.mCommandEncoder.graphics.drawIndexedIndirect(
      buffer
      , offset
      , drawCount
      , stride);
  }

  cmdDispatch(
    x: number
    , y: number
    , z: number
  ) : void {
    this.mCommandEncoder.compute.dispatch(x, y, z);
  }

  // WARN: offset requires UInt64
  cmdDispatchIndirect(
    buffer: IMgBuffer
    , offset: number
  ) : void {
    if (buffer == null) {
      throw new Error('ERROR: buffer is null');
    }

    this.mCommandEncoder.compute.dispatchIndirect(
      buffer
      , offset);
  }

  cmdCopyBuffer(
    srcBuffer: IMgBuffer
    , dstBuffer: IMgBuffer
    , pRegions: Array<MgBufferCopy>
  ) : void {
    this.mCommandEncoder.blit.copyBuffer(
      srcBuffer
      , dstBuffer
      , pRegions);
  }

  cmdCopyImage(srcImage: IMgImage
    , srcImageLayout: MgImageLayout
    , dstImage: IMgImage
    , dstImageLayout: MgImageLayout
    , pRegions: Array<MgImageCopy>
  ) : void {
    this.mCommandEncoder.blit.copyImage(
      srcImage
      , srcImageLayout
      , dstImage
      , dstImageLayout
      , pRegions);
  }

  cmdBlitImage(srcImage: IMgImage
    , srcImageLayout: MgImageLayout
    , dstImage: IMgImage
    , dstImageLayout: MgImageLayout
    , pRegions: Array<MgImageBlit>
    , filter: MgFilter
  ) : void {
    throw new Error('ERROR: not implemented');
  }

  cmdCopyBufferToImage(srcBuffer: IMgBuffer
    , dstImage: IMgImage
    , dstImageLayout: MgImageLayout
    , pRegions: Array<MgBufferImageCopy>
  ) : void {
    this.mCommandEncoder.blit.copyBufferToImage(
      srcBuffer
      , dstImage
      , dstImageLayout
      , pRegions);
  }

  cmdCopyImageToBuffer(srcImage: IMgImage
    , srcImageLayout: MgImageLayout
    , dstBuffer: IMgBuffer
    , pRegions: Array<MgBufferImageCopy>
  ) : void {
    this.mCommandEncoder.blit.copyImageToBuffer(
      srcImage
      , srcImageLayout
      , dstBuffer
      , pRegions);
  }

  // WARN: dstOffset requires UInt64
  // WARN: dataSize requires UInt64
  // WARN: pData requires IntPtr
  cmdUpdateBuffer(dstBuffer: IMgBuffer
    , dstOffset: number
    , dataSize: number
    , pData: any
  ) : never {
    throw new Error('ERROR: not implemented');
  }

  // WARN: dstOffset requires UInt64
  // WARN: size requires UInt64      
  cmdFillBuffer(dstBuffer: IMgBuffer
    , dstOffset: number
    , size: number
    , data: number
  ): never {
    throw new Error('ERROR: not implemented');
  }

  cmdClearColorImage(image: IMgImage
    , imageLayout: MgImageLayout
    , pColor: MgClearColorValue
    , pRanges: Array<MgImageSubresourceRange>
  ) : never {
    throw new Error('ERROR: not implemented');
  }

  cmdClearDepthStencilImage(image: IMgImage
    , imageLayout: MgImageLayout
    , pDepthStencil: MgClearDepthStencilValue
    , pRanges: Array<MgImageSubresourceRange>
  ) : never {
    throw new Error('ERROR: not implemented');
  }

  cmdClearAttachments(
    pAttachments: Array<MgClearAttachment>
    , pRects: Array<MgClearRect>
  ) : never {
    throw new Error('ERROR: not implemented');
  }

  cmdResolveImage(srcImage: IMgImage
    , srcImageLayout: MgImageLayout
    , dstImage: IMgImage
    , dstImageLayout: MgImageLayout
    , pRegions: Array<MgImageResolve>
  ) : never {
    throw new Error('ERROR: not implemented');
  }

  cmdSetEvent(
    event: IMgEvent
    , stageMask: MgPipelineStageFlagBits
  ) : never {
    throw new Error('ERROR: not implemented');      
  }
  
  cmdResetEvent(
    event: IMgEvent
    , stageMask: MgPipelineStageFlagBits
  ) : never {
    throw new Error('ERROR: not implemented');
  }

  cmdWaitEvents(pEvents: Array<IMgEvent>
    , srcStageMask: MgPipelineStageFlagBits
    , dstStageMask: MgPipelineStageFlagBits
    , pMemoryBarriers: Array<MgMemoryBarrier>
    , pBufferMemoryBarriers: Array<MgBufferMemoryBarrier>
    , pImageMemoryBarriers: Array<MgImageMemoryBarrier>
  ) : never {
    throw new Error('ERROR: not implemented');      
  }

  cmdPipelineBarrier(
    srcStageMask: MgPipelineStageFlagBits
    , dstStageMask: MgPipelineStageFlagBits
    , dependencyFlags: MgDependencyFlagBits
    , pMemoryBarriers: Array<MgMemoryBarrier>|null
    , pBufferMemoryBarriers: Array<MgBufferMemoryBarrier>|null
    , pImageMemoryBarriers: Array<MgImageMemoryBarrier>|null
  ) : void {
    if (pImageMemoryBarriers != null) {
      let barriers = pImageMemoryBarriers as  Array<MgImageMemoryBarrier>;
      this.mCommandEncoder.blit.loadImageData(barriers);
    }
  }

  cmdBeginQuery(
    queryPool: IMgQueryPool
    , query: number
    , flags: MgQueryControlFlagBits
  ) : void {
    throw new Error('ERROR: not implemented'); 
  }

  cmdEndQuery(
    queryPool: IMgQueryPool
    , query: number
  ) : void {
    throw new Error('ERROR: not implemented');         
  }

  cmdResetQueryPool(
    queryPool: IMgQueryPool
    , firstQuery: number
    , queryCount: number
  ) : void {
      throw new Error('ERROR: not implemented'); 
  }

  cmdWriteTimestamp(
    pipelineStage: MgPipelineStageFlagBits
    , queryPool: IMgQueryPool
    , query: number
  ) : void {
    throw new Error('ERROR: not implemented');       
  }
  // WARN: dstOffset requires UInt64  
  // WARN: stride requires UInt64 
  cmdCopyQueryPoolResults(queryPool: IMgQueryPool
    , firstQuery: number
    , queryCount: number
    , dstBuffer: IMgBuffer
    , dstOffset: number
    , stride: number
    , flags: MgQueryResultFlagBits
  ) : void {
    throw new Error('ERROR: not implemented'); 
  }

  // WARN: pValues requires IntPtr 
  cmdPushConstants(
    layout: IMgPipelineLayout
    , stageFlags: MgShaderStageFlagBits
    , offset: number
    , size: number
    , pValues: any
  ) : void {
    throw new Error('ERROR: not implemented');         
  }

  cmdBeginRenderPass(
    pRenderPassBegin: MgRenderPassBeginInfo
    , contents: MgSubpassContents
  ) : void {
    this.mCommandEncoder.graphics.beginRenderPass(
      pRenderPassBegin
      , contents);
  }

  cmdNextSubpass(contents: MgSubpassContents) : void {
    this.mCommandEncoder.graphics.nextSubpass(contents);
  }

  cmdEndRenderPass() : void {
    this.mCommandEncoder.graphics.endRenderPass ();
  }

  cmdExecuteCommands(
    pCommandBuffers: Array<IMgCommandBuffer>
  ) : void {
    throw new Error('ERROR: not implemented');         
  }    
}
