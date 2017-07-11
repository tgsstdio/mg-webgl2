import {WGLCmdBeginRenderpassRecord} from '../cmdbuf/WGLCmdBeginRenderpassRecord';
import {WGLCmdPipelineStencilWriteInfo} from '../cmdbuf/WGLCmdPipelineStencilWriteInfo';
import {WGLCmdBoundPipelineRecordInfo} from '../cmdbuf/WGLCmdBoundPipelineRecordInfo';
import {WGLCmdViewportParameter} from '../cmdbuf/WGLCmdViewportParameter';
import {MgColor4f} from '../../mg/MgColor4f';
import {WGLCmdStencilFunctionInfo} from '../cmdbuf/WGLCmdStencilFunctionInfo';
import {WGLCmdScissorParameter} from '../cmdbuf/WGLCmdScissorParameter';
import {WGLCmdDepthBiasParameter} from '../cmdbuf/WGLCmdDepthBiasParameter';
import {WGLCmdInternalDraw} from  '../cmdbuf/WGLCmdInternalDraw';
import {WGLCmdInternalDrawIndexed} from '../cmdbuf/WGLCmdInternalDrawIndexed';
import {WGLCmdInternalDrawIndexedIndirect} from '../cmdbuf/WGLCmdInternalDrawIndexedIndirect';
import {WGLCmdInternalDrawIndirect} from '../cmdbuf/WGLCmdInternalDrawIndirect';
import {WGLCmdVertexBufferObject} from '../cmdbuf/WGLCmdVertexBufferObject';
import {WGLCmdDescriptorSetParameter} from '../cmdbuf/WGLCmdDescriptorSetParameter';

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
