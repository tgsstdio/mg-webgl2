/// <reference path="WGLCmdBeginRenderpassRecord.ts" />
/// <reference path="WGLCmdPipelineStencilWriteInfo.ts" />
/// <reference path="WGLCmdViewportParameter.ts" />
/// <reference path="../mg/MgColor4f.ts" />
/// <reference path="WGLCmdStencilFunctionInfo.ts" />

namespace Magnesium {
  export interface IWGLCmdStateRenderer {
      // TODO : hide these implementation details
      initialize() : void;
      beginRenderpass(record: WGLCmdBeginRenderpassRecord) : void;
      endRenderpass() : void;
      bindPipeline(pipelineInfo: WGLCmdBoundPipelineRecordInfo) : void;
      updateStencilWriteMask(write: WGLCmdPipelineStencilWriteInfo) : void;
      updateViewports(viewports: WGLCmdViewportParameter) : void;
      updateScissors(scissors: WGLCmdScissorParameter) : void;
      // updateDepthBounds(bounds: GLCmdDepthBoundsParameter) : void;
      updateBlendConstants(blendConstants: MgColor4f) : void;
      updateDepthBias(nextDepthBias: WGLCmdDepthBiasParameter) : void;
      // updateLineWidth(lineWidth: number) : void;
      updateFrontStencil(stencilInfo: WGLCmdStencilFunctionInfo) : void;
      updateBackStencil(stencilInfo: WGLCmdStencilFunctionInfo) : void;

      draw(drawItem: WGLCmdInternalDraw) : void;
      drawIndexed(drawItem: GLCmdInternalDrawIndexed) : void;
      drawIndexedIndirect(drawItem: GLCmdInternalDrawIndexedIndirect) : void;
      drawIndirect(drawItem: GLCmdInternalDrawIndirect) : void;
      bindVertexArrays(vao: WGLCmdVertexBufferObject) : void;
      bindDescriptorSets(ds: WGLCmdDescriptorSetParameter) : void;
      updateBothStencils(item: WGLCmdStencilFunctionInfo) : void;
  }
}