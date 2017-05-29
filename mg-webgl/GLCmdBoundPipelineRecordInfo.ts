/// <reference path="IWGLGraphicsPipeline.ts" />
/// <reference path="../mg/MgColor4f.ts" />
/// <reference path="GLCmdDepthBiasParameter.ts" />
/// <reference path="WGLCmdScissorParameter.ts" />
/// <reference path="GLCmdStencilFunctionInfo.ts" />
/// <reference path="GLCmdDepthBoundsParameter.ts" />
/// <reference path="WGLCmdViewportParameter.ts" />

namespace Magnesium {
  export class GLCmdBoundPipelineRecordInfo {
    pipeline: IWGLGraphicsPipeline;
    blendConstants: MgColor4f;
    depthBias: GLCmdDepthBiasParameter;
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