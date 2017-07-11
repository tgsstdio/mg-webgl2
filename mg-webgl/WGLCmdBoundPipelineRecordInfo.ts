import {MgColor4f} from '../mg/MgColor4f'
import {IWGLGraphicsPipeline} from './IWGLGraphicsPipeline'
import {WGLCmdDepthBiasParameter} from './WGLCmdDepthBiasParameter'
import {WGLCmdScissorParameter} from './WGLCmdScissorParameter'
import {WGLCmdViewportParameter} from './WGLCmdViewportParameter'
import {WGLCmdStencilFunctionInfo} from './WGLCmdStencilFunctionInfo'

export class WGLCmdBoundPipelineRecordInfo {
  constructor() {
    this.blendConstants = new MgColor4f(0.0, 0.0, 0.0, 0.0);
    this.frontStencilWriteMask = 0;
    this.backStencilWriteMask = 0;
    this.scissors = null;
    this.viewports = null;
    this.depthBias = new WGLCmdDepthBiasParameter(); 
  }

  pipeline: IWGLGraphicsPipeline;
  blendConstants: MgColor4f;
  depthBias: WGLCmdDepthBiasParameter;
// depthBounds: GLCmdDepthBoundsParameter;
//  lineWidth: number;
  scissors: WGLCmdScissorParameter|null;
  viewports: WGLCmdViewportParameter|null;
  backStencilInfo: WGLCmdStencilFunctionInfo;
  frontStencilInfo: WGLCmdStencilFunctionInfo;
  frontStencilWriteMask: number;
  backStencilWriteMask: number;
}
