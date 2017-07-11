import {WGLCmdVertexBufferObject} from './WGLCmdVertexBufferObject'
import {WGLCmdInternalDrawIndexed} from './WGLCmdInternalDrawIndexed'
import {WGLCmdScissorParameter} from './WGLCmdScissorParameter'
import {WGLCmdBeginRenderpassRecord} from './WGLCmdBeginRenderpassRecord'
import {WGLCmdDescriptorSetParameter} from './WGLCmdDescriptorSetParameter'
import {WGLCmdInternalDrawIndirect} from './WGLCmdInternalDrawIndirect'
import {WGLCmdViewportParameter} from './WGLCmdViewportParameter'
import {MgColor4f} from '../../mg/MgColor4f'
import {WGLCmdStencilFunctionInfo} from './WGLCmdStencilFunctionInfo'
import {WGLCmdPipelineStencilWriteInfo}
  from './WGLCmdPipelineStencilWriteInfo'
import {WGLCmdInternalDraw} from './WGLCmdInternalDraw'
import {WGLCmdDepthBiasParameter} from './WGLCmdDepthBiasParameter'
import {WGLCmdBoundPipelineRecordInfo} from './WGLCmdBoundPipelineRecordInfo'
import {WGLCmdInternalDrawIndexedIndirect}
  from './WGLCmdInternalDrawIndexedIndirect'

export class WGLCmdGraphicsGrid {
  renderPasses: Array<WGLCmdBeginRenderpassRecord>;
  pipelines: Array<WGLCmdBoundPipelineRecordInfo>;
  stencilWrites: Array<WGLCmdPipelineStencilWriteInfo>;
  viewports: Array<WGLCmdViewportParameter>;
  scissors: Array<WGLCmdScissorParameter>;
  depthBias: Array<WGLCmdDepthBiasParameter>;
  //lineWidths: Array<number>;
  //depthBounds: Array<GLCmdDepthBoundsParameter>;
  blendConstants: Array<MgColor4f>;
  vertexArrays: Array<WGLCmdVertexBufferObject>;
  stencilFunctions: Array<WGLCmdStencilFunctionInfo>;
  draws: Array<WGLCmdInternalDraw>;
  drawIndexeds: Array<WGLCmdInternalDrawIndexed>;
  drawIndirects: Array<WGLCmdInternalDrawIndirect>;
  drawIndexedIndirects: Array<WGLCmdInternalDrawIndexedIndirect>;
  descriptorSets: Array<WGLCmdDescriptorSetParameter>;
}
