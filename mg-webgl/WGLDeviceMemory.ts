import {MgMemoryAllocateInfo}
	from '../mg/MgMemoryAllocateInfo';  
import {IMgDevice}
	from '../mg/IMgDevice';   
import {IWGLDeviceMemory}
	from './IWGLDeviceMemory';	  
import {IWGLDeviceMemoryTypeMap}
	from './IWGLDeviceMemoryTypeMap';
import {WGLDeviceMemoryTypeFlagBits}
	from './WGLDeviceMemoryTypeFlagBits';	  
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';	    
import {WGLClientMappedMemory}
	from './WGLClientMappedMemory';	  
import {MgResult}
	from '../mg/MgResult';	  	  	 

export class WGLDeviceMemory implements IWGLDeviceMemory {
  private mGL: WebGL2RenderingContext;
  private mBufferId: WebGLBuffer|null;
  get bufferId(): WebGLBuffer|null {
    return this.mBufferId;
  }

  private mIsHostCached: boolean;
  get isHostCached(): boolean {
    return this.mIsHostCached;
  }

  private mBufferSize: number;
  get bufferSize(): number {
    return this.mBufferSize;
  }

  private mHandle: ArrayBuffer|null;
  get handle(): ArrayBuffer|null {
    return this.mHandle;
  }

  private mBestTarget: number|null;
  get bestBufferTarget(): number|null {
    return this.mBestTarget;
  }

  constructor(
    gl: WebGL2RenderingContext
    , pAllocateInfo: MgMemoryAllocateInfo
    , deviceMemoryMap: IWGLDeviceMemoryTypeMap            
  ) {
    if (pAllocateInfo.allocationSize > Number.MAX_SAFE_INTEGER) {
      throw new Error("pAllocateInfo.AllocationSize must be <= Number.MAX_SAFE_INTEGER");
    }      

    if (pAllocateInfo.allocationSize < 0) {
      throw new Error("pAllocateInfo.AllocationSize must be > 0");
    }

    this.mGL = gl;
    
    let typeIndex = pAllocateInfo.memoryTypeIndex;
    let slotInfo = deviceMemoryMap.memoryTypes[typeIndex];

    // IF BUFFER IS USED FOR MULTIPLE TARGETS ???
      // HOPEFULLY INDIRECT AND IMAGE ARE ISOLATED BUFFER
    const IS_HOSTED = WGLDeviceMemoryTypeFlagBits.INDIRECT 
      | WGLDeviceMemoryTypeFlagBits.IMAGE;

    this.mBestTarget = this.getEstimatedBufferTarget(slotInfo.memoryTypeIndex);
    this.mBufferSize = pAllocateInfo.allocationSize;
    this.mIsHostCached = (typeIndex & IS_HOSTED) == IS_HOSTED;

    if (this.mIsHostCached) {
      this.mHandle = new ArrayBuffer(this.mBufferSize);
      this.mBufferId = null;
    }
    else if (this.mBestTarget != null) {
      this.mBufferId = this.mGL.createBuffer();

      let target = this.mBestTarget as number;
      this.mGL.bindBuffer(target, this.mBufferId);

      let flags = slotInfo.hint; 

      this.mGL.bufferData(target, this.mBufferSize, flags);

      // ONE TARGET AT A TIME 
      this.mGL.bindBuffer(target, null);

      this.mHandle = null;
    }
  }
  
  private getEstimatedBufferTarget(
    flags: number
  ) : number|null {

    let mask = WGLDeviceMemoryTypeFlagBits.INDEX;
    if ((flags & mask) == mask) 
      return this.mGL.ELEMENT_ARRAY_BUFFER;

    mask = WGLDeviceMemoryTypeFlagBits.TRANSFER_SRC;
    if ((flags & mask) == mask)
      return this.mGL.COPY_READ_BUFFER;

    mask = WGLDeviceMemoryTypeFlagBits.TRANSFER_DST;
    if ((flags & mask) == mask)        
      return this.mGL.COPY_WRITE_BUFFER;        

    mask = WGLDeviceMemoryTypeFlagBits.VERTEX;
    if ((flags & mask) == mask)        
      return this.mGL.ARRAY_BUFFER;

    mask = WGLDeviceMemoryTypeFlagBits.UNIFORM;
    if ((flags & mask) == mask)        
      return this.mGL.UNIFORM_BUFFER;

    return null;		
  }    

  private mIsDisposed: boolean = false;
  freeMemory(
    device : IMgDevice
    , allocator : IMgAllocationCallbacks|null
  ) : void {
    if (this.mIsDisposed)
      return;

    if (this.mIsHostCached) {	
      this.mHandle = null;
    }
    else {        
      this.mGL.deleteBuffer(this.mBufferId);
    }

    this.mIsDisposed = true;
  }
  // WARN : offset requires UInt64
  // WARN : size requires UInt64
  private mMappedCache: WGLClientMappedMemory|null = null;
  mapMemory(
    device : IMgDevice
    , offset : number
    , size: number
    , flags: number
    , out : { ppData : Uint8Array|null } 
  ) : MgResult {
    let buffer : ArrayBuffer =
      (this.mIsHostCached) 
        ? this.mHandle as ArrayBuffer
        : new ArrayBuffer(size);
    let viewOffset = (this.mIsHostCached)
      ? offset
      : 0;
    let view = new Uint8Array(buffer, viewOffset, size);
    this.mMappedCache
      = new WGLClientMappedMemory(
        buffer
        , offset
        , size          
        , view);

    out.ppData = view;
    return MgResult.SUCCESS;
  }    

  unmapMemory(device : IMgDevice) : void {      
    if (this.mMappedCache != null) {

      if (!this.mIsHostCached) {
        let target = this.mBestTarget as number;
        let cache = this.mMappedCache as WGLClientMappedMemory;
        this.mGL.bindBuffer(target, this.mBufferId);
        this.mGL.bufferSubData(target, cache.offset, cache.view, cache.size);
        // ONE TARGET AT A TIME 
        this.mGL.bindBuffer(target, null);
      }

      this.mMappedCache = null;
    }
  }    
}
