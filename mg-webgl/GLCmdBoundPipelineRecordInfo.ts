/// <reference path="IWGLGraphicsPipeline.ts" />
/// <reference path="../mg/MgColor4f.ts" />
/// <reference path="GLCmdDepthBiasParameter.ts" />
/// <reference path="GLCmdScissorParameter.ts" />
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
    backStencilInfo: GLCmdStencilFunctionInfo;
    frontStencilInfo: GLCmdStencilFunctionInfo;
    frontStencilWriteMask: number;
    backStencilWriteMask: number;
  }
}