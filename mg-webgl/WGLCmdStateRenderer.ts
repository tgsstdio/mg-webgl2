namespace Magnesium {
  export class WGLCmdStateRenderer implements IWGLCmdStateRenderer {
    initialize() : void {
      
    }

    // beginRenderpass(record: GLCmdBeginRenderpassRecord) : void;
    // endRenderpass() : void;
    // bindPipeline(pipelineInfo: GLCmdBoundPipelineRecordInfo) : void;
    // updateStencilWriteMask(write: GLCmdPipelineStencilWriteInfo) : void;
    // updateViewports(viewports: GLCmdViewportParameter) : void;
    // updateScissors(scissors: GLCmdScissorParameter) : void;
    // updateDepthBounds(bounds: GLCmdDepthBoundsParameter) : void;
    // updateBlendConstants(blendConstants: MgColor4f) : void;
    // updateDepthBias(nextDepthBias: GLCmdDepthBiasParameter) : void;
    // updateLineWidth(lineWidth: number) : void;
    // updateFrontStencil(stencilInfo: GLCmdStencilFunctionInfo) : void;
    // updateBackStencil(stencilInfo: GLCmdStencilFunctionInfo) : void;
    private mGL : WebGL2RenderingContext;
    draw(drawItem: WGLCmdInternalDraw) : void {
      this.mGL.drawArraysInstanced(
        this.getPrimitiveType(drawItem.topology)
        , drawItem.firstVertex
        , drawItem.vertexCount        
        , drawItem.instanceCount        
      );
    }

		private getPrimitiveType(
      topology: MgPrimitiveTopology
    ): number
		{
      switch(topology) {
        case MgPrimitiveTopology.TRIANGLE_LIST:
          return this.mGL.TRIANGLES;
        case MgPrimitiveTopology.TRIANGLE_FAN:
          return this.mGL.TRIANGLE_FAN;
        case MgPrimitiveTopology.TRIANGLE_STRIP:
          return this.mGL.TRIANGLE_STRIP;
        case MgPrimitiveTopology.POINT_LIST:
          return this.mGL.POINTS;
        case MgPrimitiveTopology.LINE_STRIP:
          return this.mGL.LINE_STRIP;
        case MgPrimitiveTopology.LINE_LIST:
          return this.mGL.LINES;
        default:
          throw new Error('Not supported');
      }
		}

    // drawIndexed(drawItem: GLCmdInternalDrawIndexed) : void {
    //   this.mGL.drawElementsInstanced(
        
    //     );
    // }
    // drawIndexedIndirect(drawItem: GLCmdInternalDrawIndexedIndirect) : void;
    // drawIndirect(drawItem: GLCmdInternalDrawIndirect) : void;
    // bindVertexArrays(vao: GLCmdVertexBufferObject) : void;
    // bindDescriptorSets(ds: GLCmdDescriptorSetParameter) : void;
    // updateBothStencils(item: GLCmdStencilFunctionInfo) : void;
  }
}