/// <reference path="IGLGraphicsPipeline.ts" />
/// <reference path="../mg/MgColor4f.ts" />
/// <reference path="GLCmdDepthBiasParameter.ts" />
/// <reference path="GLCmdScissorParameter.ts" />
/// <reference path="GLCmdStencilFunctionInfo.ts" />
/// <reference path="GLCmdDepthBoundsParameter.ts" />
/// <reference path="GLCmdViewportParameter.ts" />

namespace Magnesium {
  export class GLCmdBoundPipelineRecordInfo {
    pipeline: IGLGraphicsPipeline;
    blendConstants: MgColor4f;
    depthBias: GLCmdDepthBiasParameter;
    depthBounds: GLCmdDepthBoundsParameter;
    lineWidth: number;
    scissors: GLCmdScissorParameter;
    viewports: GLCmdViewportParameter;
    backStencilInfo: GLCmdStencilFunctionInfo;
    frontStencilInfo: GLCmdStencilFunctionInfo;
    frontStencilWriteMask: number;
    backStencilWriteMask: number;
  }
}