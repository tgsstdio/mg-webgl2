/// <reference path="GLCmdVertexBufferObject.ts" />
/// <reference path="GLCmdInternalDrawIndexed.ts" />
/// <reference path="WGLCmdScissorParameter.ts" />
/// <reference path="WGLCmdBeginRenderpassRecord.ts" />
/// <reference path="WGLCmdDescriptorSetParameter.ts" />
/// <reference path="GLCmdInternalDrawIndirect.ts" />
/// <reference path="WGLCmdViewportParameter.ts" />
/// <reference path="../mg/MgColor4f.ts" />
/// <reference path="WGLCmdStencilFunctionInfo.ts" />
/// <reference path="WGLCmdPipelineStencilWriteInfo.ts" />
/// <reference path="WGLCmdInternalDraw.ts" />
/// <reference path="WGLCmdDepthBiasParameter.ts" />
/// <reference path="WGLCmdBoundPipelineRecordInfo.ts" />
/// <reference path="GLCmdInternalDrawIndexedIndirect.ts" />

namespace Magnesium {
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
    vertexArrays: Array<GLCmdVertexBufferObject>;
    stencilFunctions: Array<WGLCmdStencilFunctionInfo>;
    draws: Array<WGLCmdInternalDraw>;
    drawIndexeds: Array<GLCmdInternalDrawIndexed>;
    drawIndirects: Array<GLCmdInternalDrawIndirect>;
    drawIndexedIndirects: Array<GLCmdInternalDrawIndexedIndirect>;
    descriptorSets: Array<WGLCmdDescriptorSetParameter>;
  }
}