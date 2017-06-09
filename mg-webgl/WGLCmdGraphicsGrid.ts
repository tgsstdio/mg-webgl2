/// <reference path="WGLCmdVertexBufferObject.ts" />
/// <reference path="WGLCmdInternalDrawIndexed.ts" />
/// <reference path="WGLCmdScissorParameter.ts" />
/// <reference path="WGLCmdBeginRenderpassRecord.ts" />
/// <reference path="WGLCmdDescriptorSetParameter.ts" />
/// <reference path="WGLCmdInternalDrawIndirect.ts" />
/// <reference path="WGLCmdViewportParameter.ts" />
/// <reference path="../mg/MgColor4f.ts" />
/// <reference path="WGLCmdStencilFunctionInfo.ts" />
/// <reference path="WGLCmdPipelineStencilWriteInfo.ts" />
/// <reference path="WGLCmdInternalDraw.ts" />
/// <reference path="WGLCmdDepthBiasParameter.ts" />
/// <reference path="WGLCmdBoundPipelineRecordInfo.ts" />
/// <reference path="WGLCmdInternalDrawIndexedIndirect.ts" />

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
    vertexArrays: Array<WGLCmdVertexBufferObject>;
    stencilFunctions: Array<WGLCmdStencilFunctionInfo>;
    draws: Array<WGLCmdInternalDraw>;
    drawIndexeds: Array<WGLCmdInternalDrawIndexed>;
    drawIndirects: Array<WGLCmdInternalDrawIndirect>;
    drawIndexedIndirects: Array<WGLCmdInternalDrawIndexedIndirect>;
    descriptorSets: Array<WGLCmdDescriptorSetParameter>;
  }
}