import {MgColor4f} from '../mg/MgColor4f'
import {IWGLGraphicsPipeline} from './IWGLGraphicsPipeline'
import {WGLCmdDepthBiasParameter} from './WGLCmdDepthBiasParameter'
import {WGLCmdScissorParameter} from './WGLCmdScissorParameter'
import {WGLCmdViewportParameter} from './WGLCmdViewportParameter'
import {WGLCmdStencilFunctionInfo} from './WGLCmdStencilFunctionInfo'

export class WGLCmdBoundPipelineRecordInfo {
  pipeline: IWGLGraphicsPipeline;
  blendConstants: MgColor4f;
  depthBias: WGLCmdDepthBiasParameter;
// depthBounds: GLCmdDepthBoundsParameter;
//  lineWidth: number;
  scissors: WGLCmdScissorParameter;
  viewports: WGLCmdViewportParameter;
  backStencilInfo: WGLCmdStencilFunctionInfo;
  frontStencilInfo: WGLCmdStencilFunctionInfo;
  frontStencilWriteMask: number;
  backStencilWriteMask: number;
}
