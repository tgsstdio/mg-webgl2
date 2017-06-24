import {WGLCmdBeginRenderpassRecord} from './WGLCmdBeginRenderpassRecord';
import {WGLCmdPipelineStencilWriteInfo} from './WGLCmdPipelineStencilWriteInfo';
import {WGLCmdBoundPipelineRecordInfo} from './WGLCmdBoundPipelineRecordInfo';
import {WGLCmdViewportParameter} from './WGLCmdViewportParameter';
import {MgColor4f} from '../mg/MgColor4f';
import {WGLCmdStencilFunctionInfo} from './WGLCmdStencilFunctionInfo';
import {WGLCmdScissorParameter} from './WGLCmdScissorParameter';
import {WGLCmdDepthBiasParameter} from './WGLCmdDepthBiasParameter';
import {WGLCmdInternalDraw} from  './WGLCmdInternalDraw';
import {WGLCmdInternalDrawIndexed} from './WGLCmdInternalDrawIndexed';
import {WGLCmdInternalDrawIndexedIndirect} from './WGLCmdInternalDrawIndexedIndirect';
import {WGLCmdInternalDrawIndirect} from './WGLCmdInternalDrawIndirect';
import {WGLCmdVertexBufferObject} from './WGLCmdVertexBufferObject';
import {WGLCmdDescriptorSetParameter} from './WGLCmdDescriptorSetParameter';

export interface IWGLCmdStateRenderer {
  // TODO : hide these implementation details
  initialize() : void;
  beginRenderpass(record: WGLCmdBeginRenderpassRecord) : void;
  endRenderpass() : void;
  bindPipeline(pipelineInfo: WGLCmdBoundPipelineRecordInfo) : void;
  updateStencilWriteMask(write: WGLCmdPipelineStencilWriteInfo) : void;
  updateViewports(viewports: WGLCmdViewportParameter) : void;
  updateScissors(scissors: WGLCmdScissorParameter) : void;
  // updateDepthBounds(bounds: GLCmdDepthBoundsParameter) : void;
  updateBlendConstants(blendConstants: MgColor4f) : void;
  updateDepthBias(nextDepthBias: WGLCmdDepthBiasParameter) : void;
  // updateLineWidth(lineWidth: number) : void;
  updateFrontStencil(stencilInfo: WGLCmdStencilFunctionInfo) : void;
  updateBackStencil(stencilInfo: WGLCmdStencilFunctionInfo) : void;

  draw(drawItem: WGLCmdInternalDraw) : void;
  drawIndexed(drawItem: WGLCmdInternalDrawIndexed) : void;
  drawIndexedIndirect(drawItem: WGLCmdInternalDrawIndexedIndirect) : void;
  drawIndirect(drawItem: WGLCmdInternalDrawIndirect) : void;
  bindVertexArrays(vao: WGLCmdVertexBufferObject) : void;
  bindDescriptorSets(ds: WGLCmdDescriptorSetParameter) : void;
  updateBothStencils(item: WGLCmdStencilFunctionInfo) : void;
}
