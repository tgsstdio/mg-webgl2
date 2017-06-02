namespace Magnesium {
  export interface IWGLCmdDrawEncodingSection {
    draw(
      pipeline: IWGLGraphicsPipeline
      , bag: WGLCmdGraphicsBag
      , instructions: WGLCmdEncoderContextSorter
      , vertexCount: number
      , instanceCount: number
      , firstVertex: number
      , firstInstance: number
    ): void;

    drawIndirect(
      pipeline: IWGLGraphicsPipeline
      , bag: WGLCmdGraphicsBag
      , instructions: WGLCmdEncoderContextSorter
      , buffer: IMgBuffer
      , offset: number
      , drawCount: number
      , stride: number            
    ) : void;

    drawIndexed(
      pipeline: IWGLGraphicsPipeline
      , indexBuffer: WGLCmdIndexBufferParameter
      , bag: WGLCmdGraphicsBag
      , instructions: WGLCmdEncoderContextSorter
      , indexCount: number
      , instanceCount: number
      , firstIndex: number
      , vertexOffset: number
      , firstInstance: number      
    ) : void;    

    drawIndexedIndirect(
      pipeline: IWGLGraphicsPipeline
      , indexBuffer: WGLCmdIndexBufferParameter
      , bag: WGLCmdGraphicsBag
      , instructions: WGLCmdEncoderContextSorter
      , buffer: IMgBuffer
      , offset: number
      , drawCount: number
      , stride: number      
    ): void;
  }
}