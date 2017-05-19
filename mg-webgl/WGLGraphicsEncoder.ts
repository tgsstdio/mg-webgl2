namespace Magnesium {
  class WGLCmdDraw implements WGLCmdAction {
    action(
      arg1: GLCmdCommandRecording
      , arg2: number
    ) : void {

      let context = arg1.graphics;
      if (context == null)
        return;

      let grid = context.grid;
      if (grid == null)
        return;

      let items = grid.draws;
      if (items == null)
        return; 

      let draw = items[arg2];
      if (draw == null)
        return; 

      let renderer = context.stateRenderer;
      if (renderer == null)
        return;       

      renderer.draw(draw);
    }
  }


  export class WGLGraphicsEncoder implements IWGLGraphicsEncoder {

    private mBag: WGLGraphicsBag;
    private mCurrentPipeline : IWGLGraphicsPipeline;
    private mInstructions: WGLCmdEncoderContextSorter;
    private mBoundRenderPass: WGLCmdBeginRenderpassRecord;
    private mBoundIndexBuffer: GLCmdIndexBufferParameter;

    clear(): void {
      
    }

    private storeDrawCommand(): boolean {
      if (this.mCurrentPipeline == null) {
          return false;
      }

      if (this.mBoundRenderPass == null) {
          throw new Error("Command must be made inside a Renderpass. ");
      }      

      this.pushVertexArrayIfRequired();

      this.pushStencilValuesIfRequired();

      // if descriptor sets is missing, generate new one
      this.pushBackDescriptorSetIfRequired();      

      return true;
    }

    private pushVertexArrayIfRequired() : void {

    }

    private pushStencilValuesIfRequired() : void {
      
    }    

    private pushBackDescriptorSetIfRequired() : void {
      
    }     

    draw(vertexCount: number
      , instanceCount: number
      , firstVertex: number
      , firstInstance: number
    ) :void {

      if (this.storeDrawCommand()) {
        let draw = new WGLCmdInternalDraw();
        draw.topology = this.mCurrentPipeline.topology;
        draw.vertexCount = vertexCount;
        draw.instanceCount = instanceCount;
        draw.firstVertex = firstVertex;
        // ALWAYS draw.firstInstance = 0;

        let nextIndex = this.mBag.draws.push(draw);

        let encoding = new WGLCmdEncodingInstruction();
        encoding.category = WGLCmdEncoderCategory.GRAPHICS;
        encoding.index = nextIndex;
        encoding.operation = new WGLCmdDraw();

        this.mInstructions.add(encoding);
      }
    }

    drawIndexed(
      indexCount: number
      , instanceCount: number
      , firstIndex: number
      , vertexOffset: number
      , firstInstance: number
    ): void {
      if (this.storeDrawCommand()) {
        let draw = new GLCmdInternalDrawIndexed();
        draw.topology = this.mCurrentPipeline.topology;
        draw.indexType = this.mBoundIndexBuffer.indexType;
        draw.indexCount = indexCount;
        draw.instanceCount = instanceCount;
        draw.firstIndex = firstIndex;
        draw.vertexOffset = vertexOffset;
        draw.firstInstance = firstInstance;
        // ALWAYS draw.firstInstance = 0;

        let nextIndex = this.mBag.drawIndexeds.push(draw);

        let encoding = new WGLCmdEncodingInstruction();
        encoding.category = WGLCmdEncoderCategory.GRAPHICS;
        encoding.index = nextIndex;
        encoding.operation = new WGLCmdDraw();

        this.mInstructions.add(encoding);
      }
    }
  }
}