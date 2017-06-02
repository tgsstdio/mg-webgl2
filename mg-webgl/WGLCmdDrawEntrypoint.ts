namespace Magnesium {
  export class WGLCmdDrawEntrypoint implements IWGLCmdDrawEntrypoint {
    private mGL: WebGL2RenderingContext;
	  drawIndexed (
      mode: number
      , elementCount: number
      , elementType: number
      , indexOffset: number
      , instanceCount: number
    ): void {
      //let mode = this.getPrimitiveType(topology);
     // let elementType = this.getIndexBufferType(indexType);
      //let stride = this.getIndexBufferStride(indexType);
      //let indexOffset = first * stride;
     // let elementCount = this.getPrimitiveTypeElements(
      //  topology, count);

      this.mGL.drawElementsInstanced(
        mode
        , elementCount
        , elementType
        , indexOffset
        , instanceCount
      );
    }

    drawArrays (
      mode: number
      , firstIndex: number
      , indicesCount: number
      , instanceCount: number
    ) : void {
      //let mode = this.getPrimitiveType(topology);
      this.mGL.drawArraysInstanced(
        mode
        , firstIndex
        , indicesCount
        , instanceCount
      );
    }

		drawArraysIndirect (
      mode: number
      , indirect: IWGLBuffer
      , drawCount: number
      , offset: number
      , stride: number
    ) : void {
      const INDIRECT_BIT = MgBufferUsageFlagBits.INDIRECT_BUFFER_BIT;
      const COMMAND_SIZE = 16; 

      if (
          (
            (indirect.usage & INDIRECT_BIT) == INDIRECT_BIT
          ) 
          // JUST CHECK IF HOST IS NOT NULL
          && indirect.hosted != null
      ) {
        let hosted = indirect.hosted as ArrayBuffer;
        let byteOffset = offset;
        for(let i = 0; i < drawCount; i += 1) {
          let indirectArray = new Uint32Array(
            hosted
            , byteOffset
            , COMMAND_SIZE);

          if (indirectArray.byteLength % COMMAND_SIZE != 0) {
            throw new Error("byteLength not multiple of sizeof(VkDrawIndirectCommand)/16");
          }

          let vertexCount = indirectArray[0];
          let firstInstance = indirectArray[1];
          if (firstInstance != 0)
            throw new Error("firstInstance: Non-zero values not accepted");
          let firstIndex = indirectArray[2];
          let instanceCount = indirectArray[3]; 

          this.mGL.drawArraysInstanced(
            mode
            , firstIndex
            , vertexCount
            , instanceCount
          );

          byteOffset += stride;
        }
      }
    }

		drawIndexedIndirect (
      mode: number
      , topology: MgPrimitiveTopology
      , indexType: MgIndexType
      , elementType: number
      , indexByteSize: number
      , indirect: IWGLBuffer
      , drawCount: number
      , offset: number
      , stride: number
    ): void {
      const INDIRECT_BIT = MgBufferUsageFlagBits.INDIRECT_BUFFER_BIT;
      const COMMAND_SIZE = 20;  

      if (
          (
            (indirect.usage & INDIRECT_BIT) == INDIRECT_BIT
          ) 
          // JUST CHECK IF HOST IS NOT NULL
          && indirect.hosted != null
      ) {
        let hosted = indirect.hosted as ArrayBuffer;
        let startingOffset = offset;

        for(let i = 0; i < drawCount; i += 1) {
        
          let indirectArray = new Uint32Array(
            hosted
            , startingOffset
            , COMMAND_SIZE);

          if (indirectArray.byteLength % COMMAND_SIZE != 0) {
            throw new Error("byteLength not multiple of sizeof(VkDrawIndexedIndirectCommand)/20");
          }
          
          let indexCount = indirectArray[0];
          let instanceCount = indirectArray[1];
          let firstIndex = indirectArray[2];
          //let vertexOffset = indirectArray[3];
          let firstInstance = indirectArray[4]; 

        // uint32_t    indexCount;
        // uint32_t    instanceCount;
        // uint32_t    firstIndex;
        // int32_t     vertexOffset;
        // uint32_t    firstInstance;

          //let mode = this.getPrimitiveType(topology);
          let elementCount = this.getPrimitiveTypeElements(topology, indexCount);
          //let elementType = this.getIndexBufferType(indexType);
          //let indexByteSize = this.getIndexByteSize(indexType);
          let indexOffset = firstIndex * indexByteSize;

          this.mGL.drawElementsInstanced(
            mode
            , elementCount
            , elementType
            , indexOffset
            , instanceCount
          );
          startingOffset += stride;
        }
      }
    }

		private getPrimitiveTypeElements(
      topology: MgPrimitiveTopology
      , vertexCount: number    
    ) : number {
			switch (topology)	{
        case MgPrimitiveTopology.LINE_LIST:
          return vertexCount / 2;
        case MgPrimitiveTopology.POINT_LIST:
          return vertexCount;
        case MgPrimitiveTopology.TRIANGLE_LIST:
          return vertexCount / 3;
        case MgPrimitiveTopology.LINE_STRIP:
          return vertexCount - 1;
        case MgPrimitiveTopology.TRIANGLE_FAN:
          return vertexCount - 2;
        default:
          throw new Error ("not supported");
			}
		}      
  }
}