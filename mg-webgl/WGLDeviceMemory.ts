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
      , deviceMemoryMap: IWGLDeviceMemoryTypeMap            
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
        throw new Error("pAllocateInfo.AllocationSize must be > 0");
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

        let typeIndex = pAllocateInfo.memoryTypeIndex;
        let slotInfo = deviceMemoryMap.memoryTypes[typeIndex];
        let flags = slotInfo.hint; 

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