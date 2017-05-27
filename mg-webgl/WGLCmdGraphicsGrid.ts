/// <reference path="GLCmdVertexBufferObject.ts" />
/// <reference path="GLCmdInternalDrawIndexed.ts" />
/// <reference path="GLCmdScissorParameter.ts" />
/// <reference path="GLCmdDepthBoundsParameter.ts" />
/// <reference path="WGLCmdBeginRenderpassRecord.ts" />
/// <reference path="GLCmdDescriptorSetParameter.ts" />
/// <reference path="GLCmdInternalDrawIndirect.ts" />
/// <reference path="WGLCmdViewportParameter.ts" />
/// <reference path="../mg/MgColor4f.ts" />
/// <reference path="GLCmdStencilFunctionInfo.ts" />
/// <reference path="GLCmdPipelineStencilWriteInfo.ts" />
/// <reference path="WGLCmdInternalDraw.ts" />
/// <reference path="GLCmdDepthBiasParameter.ts" />
/// <reference path="GLCmdBoundPipelineRecordInfo.ts" />
/// <reference path="GLCmdInternalDrawIndexedIndirect.ts" />

namespace Magnesium {
  export class WGLCmdGraphicsGrid {
    renderpasses: Array<WGLCmdBeginRenderpassRecord>;
    pipelines: Array<GLCmdBoundPipelineRecordInfo>;
    stencilWrites: Array<GLCmdPipelineStencilWriteInfo>;
    viewports: Array<WGLCmdViewportParameter>;
    scissors: Array<WGLCmdScissorParameter>;
    depthBias: Array<GLCmdDepthBiasParameter>;
    //lineWidths: Array<number>;
    //depthBounds: Array<GLCmdDepthBoundsParameter>;
    blendConstants: Array<MgColor4f>;
    vertexArrays: Array<GLCmdVertexBufferObject>;
    stencilFunctions: Array<GLCmdStencilFunctionInfo>;
    draws: Array<WGLCmdInternalDraw>;
    drawIndexeds: Array<GLCmdInternalDrawIndexed>;
    drawIndirects: Array<GLCmdInternalDrawIndirect>;
    drawIndexedIndirects: Array<GLCmdInternalDrawIndexedIndirect>;
    descriptorSets: Array<GLCmdDescriptorSetParameter>;
  }
}