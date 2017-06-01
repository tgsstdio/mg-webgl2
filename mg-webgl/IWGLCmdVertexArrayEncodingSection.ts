namespace Magnesium {
  export interface IWGLCmdVertexArrayEncodingSection {
    readonly boundIndexBuffer: WGLCmdIndexBufferParameter|null;

    clear(): void;

    bindVertexBuffers(
      firstBinding: number
      , pBuffers: Array<IMgBuffer>
      , pOffsets: Array<number>|null
    ): void;    

		bindIndexBuffer(
      buffer: IMgBuffer
      , offset: number
      , indexType: MgIndexType
    ) : void;    

    pushIfRequired(
       pipeline: IWGLGraphicsPipeline
      , bag: WGLCmdGraphicsBag
      , instructions: WGLCmdEncoderContextSorter
    ): void;    
  }
}