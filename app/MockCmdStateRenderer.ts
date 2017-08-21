import {IWGLCmdStateRenderer} from '../mg-webgl/renderer/IWGLCmdStateRenderer';
import {WGLCmdBeginRenderpassRecord} from '../mg-webgl/cmdbuf/WGLCmdBeginRenderpassRecord';
import {WGLCmdPipelineStencilWriteInfo} from '../mg-webgl/cmdbuf/WGLCmdPipelineStencilWriteInfo';
import {WGLCmdBoundPipelineRecordInfo} from '../mg-webgl/cmdbuf/WGLCmdBoundPipelineRecordInfo';
import {WGLCmdViewportParameter} from '../mg-webgl/cmdbuf/WGLCmdViewportParameter';
import {MgColor4f} from '../mg/MgColor4f';
import {WGLCmdStencilFunctionInfo} from '../mg-webgl/cmdbuf/WGLCmdStencilFunctionInfo';
import {WGLCmdScissorParameter} from '../mg-webgl/cmdbuf/WGLCmdScissorParameter';
import {WGLCmdDepthBiasParameter} from '../mg-webgl/cmdbuf/WGLCmdDepthBiasParameter';
import {WGLCmdInternalDraw} from  '../mg-webgl/cmdbuf/WGLCmdInternalDraw';
import {WGLCmdInternalDrawIndexed} from '../mg-webgl/cmdbuf/WGLCmdInternalDrawIndexed';
import {WGLCmdInternalDrawIndexedIndirect} from '../mg-webgl/cmdbuf/WGLCmdInternalDrawIndexedIndirect';
import {WGLCmdInternalDrawIndirect} from '../mg-webgl/cmdbuf/WGLCmdInternalDrawIndirect';
import {WGLCmdVertexBufferObject} from '../mg-webgl/cmdbuf/WGLCmdVertexBufferObject';
import {WGLCmdDescriptorSetParameter} from '../mg-webgl/cmdbuf/WGLCmdDescriptorSetParameter';
import {IWGLCmdDrawEntrypoint}
	from '../mg-webgl/entrypoint/IWGLCmdDrawEntrypoint';	
import {IWGLCmdShaderProgramCache}
	from '../mg-webgl/renderer/IWGLCmdShaderProgramCache';	

export class MockCmdStateRenderer implements IWGLCmdStateRenderer {
  private mCache: IWGLCmdShaderProgramCache;  
  private mDraws: IWGLCmdDrawEntrypoint;
  /**
   *
   */
  constructor(
    draws: IWGLCmdDrawEntrypoint,
    cache: IWGLCmdShaderProgramCache
  ) {
    this.mDraws = draws;
    this.mCache = cache;
  }

  // TODO : hide these implementation details
  initialize() : void {

  }
  beginRenderpass(record: WGLCmdBeginRenderpassRecord) : void {

  }

  endRenderpass() : void {

  }
  
  bindPipeline(pipelineInfo: WGLCmdBoundPipelineRecordInfo) : void {

  }

  updateStencilWriteMask(write: WGLCmdPipelineStencilWriteInfo) : void {

  }

  updateViewports(viewports: WGLCmdViewportParameter) : void {

  }

  updateScissors(scissors: WGLCmdScissorParameter) : void {

  }
  // updateDepthBounds(bounds: GLCmdDepthBoundsParameter) : void;
  updateBlendConstants(blendConstants: MgColor4f) : void {

  }
  
  updateDepthBias(nextDepthBias: WGLCmdDepthBiasParameter) : void {

  }

  // updateLineWidth(lineWidth: number) : void;
  updateFrontStencil(stencilInfo: WGLCmdStencilFunctionInfo) : void {

  }

  updateBackStencil(stencilInfo: WGLCmdStencilFunctionInfo) : void { 

  }

  draw(drawItem: WGLCmdInternalDraw) : void {
    this.mDraws.drawArrays(
      drawItem.mode
      , drawItem.firstVertex
      , drawItem.indicesCount
      , drawItem.instanceCount
    );
  }

  drawIndexed(
    drawItem: WGLCmdInternalDrawIndexed
  ) : void {
    this.mDraws.drawIndexed(
      drawItem.mode
      , drawItem.elementCount
      , drawItem.elementType
      , drawItem.indexOffset
      , drawItem.instanceCount
    );
  }

  drawIndirect(
    drawItem: WGLCmdInternalDrawIndirect
  ) : void {
    this.mDraws.drawArraysIndirect(
      drawItem.mode
      , drawItem.indirect 
      , drawItem.drawCount
      , drawItem.offset
      , drawItem.stride
    );
  }

  drawIndexedIndirect(
    drawItem: WGLCmdInternalDrawIndexedIndirect
  ) : void {
    this.mDraws.drawIndexedIndirect(
      drawItem.mode
      , drawItem.topology
      , drawItem.indexType
      , drawItem.elementType
      , drawItem.indexByteSize
      , drawItem.indirect
      , drawItem.drawCount
      , drawItem.offset
      , drawItem.stride
    );
  }

  bindVertexArrays(vao: WGLCmdVertexBufferObject) : void {
    this.mCache.setVAO(vao.vertexArray);
  }

  bindDescriptorSets(ds: WGLCmdDescriptorSetParameter) : void {

  }

  updateBothStencils(item: WGLCmdStencilFunctionInfo) : void {

  }
}