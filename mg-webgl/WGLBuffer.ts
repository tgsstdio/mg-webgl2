namespace Magnesium {
  export class WGLBuffer implements IWGLBuffer {
    private mHosted: ArrayBuffer;
    get hosted(): ArrayBuffer {
      return this.mHosted;
    }

    private mSource: WebGLBuffer|null;
    get source(): WebGLBuffer|null {
      return this.mSource;
    }

    private mUsage: MgBufferUsageFlagBits;
    get usage(): MgBufferUsageFlagBits {
      return this.mUsage;
    }

    private mRequestedSize: number;
    get requestedSize(): number {
      return this.mRequestedSize;
    }

    private mIsBufferType: boolean;
    get isBufferType(): boolean{
      return this.mIsBufferType;
    }

    private mMemoryType: WGLDeviceMemoryTypeFlagBits;
    get memoryType(): WGLDeviceMemoryTypeFlagBits {
      return this.mMemoryType;
    }

    private mGL: WebGL2RenderingContext;
    constructor(
      gl: WebGL2RenderingContext
      , info: MgBufferCreateInfo
    ) {
      this.mGL = gl;
      this.mIsBufferType = WGLBuffer.determineBufferType(info);
      this.mMemoryType = WGLBuffer.determineMemoryType(info);
      this.mUsage = info.usage;
      this.mRequestedSize = info.size;
    }

    private static determineMemoryType(
      info: MgBufferCreateInfo
    ) : WGLDeviceMemoryTypeFlagBits {
      let flags : WGLDeviceMemoryTypeFlagBits = 0;

      let references: Array<MgBufferUsageFlagBits> = [
        MgBufferUsageFlagBits.INDEX_BUFFER_BIT
        , MgBufferUsageFlagBits.VERTEX_BUFFER_BIT
        , MgBufferUsageFlagBits.INDIRECT_BUFFER_BIT
        , MgBufferUsageFlagBits.UNIFORM_BUFFER_BIT
        , MgBufferUsageFlagBits.TRANSFER_SRC_BIT
        , MgBufferUsageFlagBits.TRANSFER_DST_BIT
      ];

      let toggles: Array<WGLDeviceMemoryTypeFlagBits> = [
        WGLDeviceMemoryTypeFlagBits.INDEX
        , WGLDeviceMemoryTypeFlagBits.VERTEX
        , WGLDeviceMemoryTypeFlagBits.INDIRECT
        , WGLDeviceMemoryTypeFlagBits.UNIFORM
        , WGLDeviceMemoryTypeFlagBits.TRANSFER_SRC
        , WGLDeviceMemoryTypeFlagBits.TRANSFER_DST
      ];

      let count = references.length;

      for( let i = 0; i < count; i += 1) {
        let referenceMask = references[i];
        if ((info.usage & referenceMask) == referenceMask)
        {
          flags |= toggles[i];
        }    
      }

      return flags;  
    }
    

    private static determineBufferType(
      info: MgBufferCreateInfo
    ) : boolean {           
      const IS_BUFFER_TYPE = MgBufferUsageFlagBits.STORAGE_BUFFER_BIT
          | MgBufferUsageFlagBits.TRANSFER_DST_BIT
          | MgBufferUsageFlagBits.TRANSFER_SRC_BIT
          | MgBufferUsageFlagBits.INDEX_BUFFER_BIT
          | MgBufferUsageFlagBits.UNIFORM_BUFFER_BIT
          | MgBufferUsageFlagBits.VERTEX_BUFFER_BIT;

        return ((info.usage & IS_BUFFER_TYPE) != 0);
    } 

    // WARN: memoryOffset requires UInt64
		bindBufferMemory(
        device: IMgDevice
      , memory: IMgDeviceMemory
      , memoryOffset: number
    ) : MgResult {
      // TODO : figure this out
      return MgResult.SUCCESS;
    }

    private mIsDisposed: boolean = false;
		destroyBuffer(
      device: IMgDevice
      , allocator: IMgAllocationCallbacks|null
    ) : void {
			if (this.mIsDisposed)
				return;

      if (this.mIsBufferType) {
        if (this.mSource != null) {
          this.mGL.deleteBuffer(this.mSource);
        }
      }

			this.mIsDisposed = true;
		}    
  }
}