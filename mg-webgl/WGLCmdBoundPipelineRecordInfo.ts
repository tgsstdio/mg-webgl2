/// <reference path="IWGLGraphicsPipeline.ts" />
/// <reference path="../mg/MgColor4f.ts" />
/// <reference path="WGLCmdDepthBiasParameter.ts" />
/// <reference path="WGLCmdScissorParameter.ts" />
/// <reference path="WGLCmdStencilFunctionInfo.ts" />
/// <reference path="WGLCmdViewportParameter.ts" />

namespace Magnesium {
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
}