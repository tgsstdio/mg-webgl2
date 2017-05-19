namespace Magnesium {
  export class GLCmdIndexBufferParameter {
		indexType: MgIndexType;
    // WARN: offset requires ulong
		offset: number;
    // WARN: buffer requires IGLBuffer
	  buffer: any;
	}
}
