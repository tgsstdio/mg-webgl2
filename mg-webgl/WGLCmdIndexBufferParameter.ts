namespace Magnesium {
  export class WGLCmdIndexBufferParameter {
		indexType: MgIndexType;
    // WARN: offset requires ulong
		offset: number;
    // WARN: buffer requires IGLBuffer
	  buffer: any;
	}
}
