namespace Magnesium {
  export interface IWGLCmdDrawEntrypoint {
	  drawIndexed (
      mode: number
      , elementCount: number
      , elementType: number
      , indexOffset: number
      , instanceCount: number
    ): void;

		drawArraysIndirect (
      mode: number
      , indirect: ArrayBuffer
      , count: number
      , stride: number) : void;

		drawIndexedIndirect (
      topology: MgPrimitiveTopology
      , indexType: MgIndexType
      , indirect: any
      , count: number
      , stride: number): void;

		drawArrays (
      mode: number
      , firstIndex: number
      , indicesCount: number
      , instanceCount: number
    ) : void;
	}

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
      , indirect: ArrayBuffer
      , count: number
      , stride: number
    ) : void {

      let byteOffset = 0;
      for(let i = 0; i < count; i += 1) {
        let indirectArray = new Uint32Array(
          indirect
          , byteOffset
          , indirect.byteLength);

        if (indirectArray.byteLength % 16 != 0) {
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

		drawIndexedIndirect (
      topology: MgPrimitiveTopology
      , indexType: MgIndexType
      , indirect: any
      , count: number
      , stride: number
    ): void {

      let byteOffset = 0;
      for(let i = 0; i < count; i += 1) {
        let indirectArray = new Uint32Array(
          indirect
          , byteOffset
          , indirect.byteLength);

        if (indirectArray.byteLength % 20 != 0)
          throw new Error("byteLength not multiple of sizeof(VkDrawIndexedIndirectCommand)/20");
        
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

      let mode = this.getPrimitiveType(topology);
      let elementType = this.getIndexBufferType(indexType);
      let stride = this.getIndexBufferStride(indexType);
      let indexOffset = firstIndex * stride;
      let elementCount = this.getPrimitiveTypeElements(topology, indexCount);

      this.mGL.drawElementsInstanced(
        mode
        , elementCount
        , elementType
        , indexOffset
        , instanceCount
      );

        }
    }

    private getIndexBufferType(
      indexType: MgIndexType
    ) : number {
			switch (indexType)
			{
			case MgIndexType.UINT16:
				return this.mGL.UNSIGNED_SHORT;
			case MgIndexType.UINT32:
				return this.mGL.UNSIGNED_INT;	
			default:
				throw new Error ("not supported");
			}
		}

    private getIndexBufferStride(
      indexType: MgIndexType
    ) : number {
			switch (indexType)
			{
			case MgIndexType.UINT16:
				return 2;
			case MgIndexType.UINT32:
				return 4;	
			default:
				throw new Error ("not supported");
			}
		}    

		private getPrimitiveTypeElements(
      topology: MgPrimitiveTopology
      , count: number    
    ) : number {
			switch (topology)	{
        case MgPrimitiveTopology.LINE_LIST:
          return count / 2;
        case MgPrimitiveTopology.POINT_LIST:
          return count;
        case MgPrimitiveTopology.TRIANGLE_LIST:
          return count / 3;
        case MgPrimitiveTopology.LINE_STRIP:
          return count - 1;
        case MgPrimitiveTopology.TRIANGLE_FAN:
          return count - 2;
        default:
          throw new Error ("not supported");
			}
		}

		private getPrimitiveType(
      topology: MgPrimitiveTopology
    ) : number {
			switch (topology)	{
        case MgPrimitiveTopology.LINE_LIST:
          return this.mGL.LINES;
        case MgPrimitiveTopology.POINT_LIST:
          return this.mGL.POINTS;
        case MgPrimitiveTopology.TRIANGLE_LIST:
          return this.mGL.TRIANGLES;
        case MgPrimitiveTopology.LINE_STRIP:
          return this.mGL.LINE_STRIP;
        case MgPrimitiveTopology.TRIANGLE_FAN:
          return this.mGL.TRIANGLE_FAN;
        default:
          throw new Error ("not supported");
			}
		}
  }
}