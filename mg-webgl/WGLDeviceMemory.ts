namespace Magnesium {
  export class WGLDeviceMemory implements IWGLDeviceMemory {
    private mGL: WebGL2RenderingContext;
    private mBufferId: WebGLBuffer|null;;
    private mIsHostCached: boolean;
    private mBufferType: GLMemoryBufferType;
    private mBufferSize: number;
    private mHosted: ArrayBuffer|null;
    private mBufferTarget: GLMemoryBufferType|null;
    constructor(
      gl: WebGL2RenderingContext
      , pAllocateInfo: MgMemoryAllocateInfo            
    ) {
      this.mGL = gl;
      this.mBufferType = pAllocateInfo.memoryTypeIndex as GLMemoryBufferType;
      this.mIsHostCached = 
        this.mBufferType == GLMemoryBufferType.INDIRECT
        || this.mBufferType== GLMemoryBufferType.IMAGE;
      
			if (pAllocateInfo.allocationSize > Number.MAX_SAFE_INTEGER) {
				throw new Error("pAllocateInfo.AllocationSize must be <= Number.MAX_SAFE_INTEGER");
			}      

      if (pAllocateInfo.allocationSize < 0) {
        throw new Error("pAllocateInfo.AllocationSize must be = 0");
      }

  		this.mBufferTarget = this.getBufferTarget(this.mBufferType);
      this.mBufferSize = pAllocateInfo.allocationSize;

      if (this.mIsHostCached) {
        this.mHosted = new ArrayBuffer(this.mBufferSize);
        this.mBufferId = null;
      }
      else if (this.mBufferTarget != null) {
        this.mBufferId = this.mGL.createBuffer();

        let target = this.mBufferTarget as number;
        this.mGL.bindBuffer(target, this.mBufferId);
        let flags = 0;

// TODO convert these rules into flags 
// DEVICE_LOCAL_BIT
// gl.STATIC_COPY: Contents of the buffer are likely to be used often and not change often. Contents are neither written or read by the user.
// DEVICE_LOCAL_BIT | HOST_COHERENT_BIT | HOST_VISIBLE_BIT
// gl.STATIC_DRAW: Contents of the buffer are likely to be used often and not change often. Contents are written to the buffer, but not read.
// DEVICE_LOCAL_BIT | HOST_VISIBLE_BIT
// gl.STATIC_READ: Contents of the buffer are likely to be used often and not change often. Contents are read from the buffer, but not written.

// HOST_COHERENT_BIT | HOST_VISIBLE_BIT
// gl.STREAM_DRAW: Contents of the buffer are likely to not be used often. Contents are written to the buffer, but not read.
// HOST_VISIBLE_BIT
// gl.STREAM_READ: Contents of the buffer are likely to not be used often. Contents are read from the buffer, but not written.
// 0
// gl.STREAM_COPY: Contents of the buffer are likely to be used often and not change often. Contents are neither written or read by the user.

// HOST_CACHED_BIT | HOST_VISIBLE_BIT | HOST_COHERENT_BIT 
// gl.DYNAMIC_READ: Contents of the buffer are likely to be used often and change often. Contents are read from the buffer, but not written.
// HOST_CACHED_BIT
// gl.DYNAMIC_COPY: Contents of the buffer are likely to be used often and change often. Contents are neither written or read by the user.
// HOST_CACHED_BIT | HOST_COHERENT_BIT 
// gl.DYNAMIC_DRAW: Contents of the buffer are likely to be used often and change often. Contents are written to the buffer, but not read.        

        this.mGL.bufferData(target, this.mBufferSize, flags);

        this.mHosted = null;
      }
    }

    private getMemoryFlags(
      bufferType: GLMemoryBufferType
    ) : number {
      return 0;
    }
    

		private getBufferTarget(
      bufferType: GLMemoryBufferType
    ) : number|null {
			switch(bufferType)
			{
			case GLMemoryBufferType.INDEX:
				return this.mGL.ELEMENT_ARRAY_BUFFER;
			case GLMemoryBufferType.VERTEX:
				return this.mGL.ARRAY_BUFFER;
      case GLMemoryBufferType.TRANSFER_SRC:
        return this.mGL.COPY_READ_BUFFER;
      case GLMemoryBufferType.TRANSFER_DST:
        return this.mGL.COPY_WRITE_BUFFER;
      case GLMemoryBufferType.UNIFORM:
        return this.mGL.UNIFORM_BUFFER;
      default:
				return null;
			}
		}    

    freeMemory(device : IMgDevice, allocator : IMgAllocationCallbacks|null) : never
    {
      throw new Error('not implemented');
    }
    // WARN : offset requires UInt64
    // WARN : size requires UInt64
		mapMemory(device : IMgDevice, offset : number, size: number, flags: number, out : { ppData : object } 
    ) : never {
      throw new Error('not implemented');
    }    

		unmapMemory(device : IMgDevice) : never {
      throw new Error('not implemented');
    }    
  }
}