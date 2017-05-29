/// <reference path="WGLCmdBeginRenderpassRecord.ts" />
/// <reference path="GLCmdPipelineStencilWriteInfo.ts" />
/// <reference path="WGLCmdViewportParameter.ts" />
/// <reference path="../mg/MgColor4f.ts" />
/// <reference path="GLCmdStencilFunctionInfo.ts" />

namespace Magnesium {
  export interface IWGLCmdStateRenderer {
      // TODO : hide these implementation details
      // initialize() : void;
      // beginRenderpass(record: GLCmdBeginRenderpassRecord) : void;
      // endRenderpass() : void;
      bindPipeline(pipelineInfo: GLCmdBoundPipelineRecordInfo) : void;
      updateStencilWriteMask(write: WGLCmdPipelineStencilWriteInfo) : void;
      updateViewports(viewports: WGLCmdViewportParameter) : void;
      updateScissors(scissors: WGLCmdScissorParameter) : void;
      // updateDepthBounds(bounds: GLCmdDepthBoundsParameter) : void;
      updateBlendConstants(blendConstants: MgColor4f) : void;
      updateDepthBias(nextDepthBias: GLCmdDepthBiasParameter) : void;
      // updateLineWidth(lineWidth: number) : void;
      // updateFrontStencil(stencilInfo: GLCmdStencilFunctionInfo) : void;
      // updateBackStencil(stencilInfo: GLCmdStencilFunctionInfo) : void;

      draw(drawItem: WGLCmdInternalDraw) : void;
      // drawIndexed(drawItem: GLCmdInternalDrawIndexed) : void;
      // drawIndexedIndirect(drawItem: GLCmdInternalDrawIndexedIndirect) : void;
      // drawIndirect(drawItem: GLCmdInternalDrawIndirect) : void;
      // bindVertexArrays(vao: GLCmdVertexBufferObject) : void;
      // bindDescriptorSets(ds: GLCmdDescriptorSetParameter) : void;
      // updateBothStencils(item: GLCmdStencilFunctionInfo) : void;
  }
}