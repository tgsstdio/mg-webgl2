namespace Magnesium {
  export enum WGLDeviceMemoryCategoryFlagBits {
    INDIRECT = 1 << 0,
    IMAGE = 1 << 1,
    VERTEX = 1 << 2,
    INDEX = 1 << 3,
    UNIFORM = 1 << 4,
    TRANSFER_SRC = 1 << 5,
    TRANSFER_DST = 1 << 6,    
  }

  export class WGLDeviceMemoryInfo {
    index: number;
    memoryTypeIndex: number;
    propertyFlags: MgMemoryPropertyFlagBits;
    isHosted: boolean;
    hint: number;
  }

  export class WGLDeviceMemoryMap {
    private mGL: WebGL2RenderingContext
    constructor(gl:WebGL2RenderingContext) {
      this.mGL = gl;
    }

    memoryTypes: Array<WGLDeviceMemoryInfo>;
    initialize(): void {
      this.memoryTypes = new Array<WGLDeviceMemoryInfo>(8);

      let index = this.pushIndirectEntries(0);
      index = this.pushImageEntries(index);
      index = this.pushDrawEntries(index);
      index = this.pushReadEntries(index);
    }

    private pushIndirectEntries(
      offset: number
    ) : number {
      const ALL_ON = MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
        | MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT
        | MgMemoryPropertyFlagBits.HOST_COHERENT_BIT
        | MgMemoryPropertyFlagBits.HOST_CACHED_BIT
        | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;

      let info = new WGLDeviceMemoryInfo();
      info.index = offset;
      info.isHosted = true;
      info.memoryTypeIndex = WGLDeviceMemoryCategoryFlagBits.INDIRECT;
      info.propertyFlags = ALL_ON;
      info.hint = 0;
      this.memoryTypes[info.index] = info;

      return offset + 1;
    }

    private pushImageEntries(
      offset: number
    ) : number {
      const ALL_ON = MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
        | MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT
        | MgMemoryPropertyFlagBits.HOST_COHERENT_BIT
        | MgMemoryPropertyFlagBits.HOST_CACHED_BIT
        | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;

      let info = new WGLDeviceMemoryInfo();
      info.index = offset;
      info.isHosted = true;
      info.memoryTypeIndex = WGLDeviceMemoryCategoryFlagBits.IMAGE;
      info.propertyFlags = ALL_ON;
      info.hint = 0;
      this.memoryTypes[info.index] = info;        
    
      return offset + 1;
    }  

    private pushDrawEntries(
      offset: number
    ) : number {
      const SELECTED_TYPE_INDEX = WGLDeviceMemoryCategoryFlagBits.VERTEX
        | WGLDeviceMemoryCategoryFlagBits.INDEX
        | WGLDeviceMemoryCategoryFlagBits.UNIFORM
        | WGLDeviceMemoryCategoryFlagBits.TRANSFER_SRC;

      const ALL_ON = MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
        | MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT
        | MgMemoryPropertyFlagBits.HOST_COHERENT_BIT
        | MgMemoryPropertyFlagBits.HOST_CACHED_BIT
        | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;

      let info_stream = new WGLDeviceMemoryInfo();
      info_stream.memoryTypeIndex = SELECTED_TYPE_INDEX;
      info_stream.index = offset;
      info_stream.isHosted = false;

      info_stream.propertyFlags
        = MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
        | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;

      info_stream.hint = this.mGL.STREAM_DRAW;
      this.memoryTypes[info_stream.index] = info_stream; 

      offset += 1;

      let info_static = new WGLDeviceMemoryInfo();
      info_static.memoryTypeIndex = SELECTED_TYPE_INDEX;
      info_static.index = offset;
      info_static.isHosted = false;

      info_static.propertyFlags
        = MgMemoryPropertyFlagBits.HOST_CACHED_BIT
        | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;
        
      info_static.hint = this.mGL.STATIC_DRAW;
      this.memoryTypes[info_static.index] = info_static; 

      offset += 1;

      let dynamic = new WGLDeviceMemoryInfo();
      dynamic.memoryTypeIndex = SELECTED_TYPE_INDEX;
      dynamic.index = offset;
      dynamic.isHosted = false;
      dynamic.propertyFlags = ALL_ON;
      dynamic.hint = this.mGL.DYNAMIC_DRAW;
      this.memoryTypes[dynamic.index] = dynamic;     

      return offset + 1;      
    }

    pushReadEntries(
      offset: number
    ) : number {
        const SELECTED_TYPE_INDEX = WGLDeviceMemoryCategoryFlagBits.VERTEX
        | WGLDeviceMemoryCategoryFlagBits.INDEX
        | WGLDeviceMemoryCategoryFlagBits.UNIFORM
        | WGLDeviceMemoryCategoryFlagBits.TRANSFER_SRC
        | WGLDeviceMemoryCategoryFlagBits.TRANSFER_SRC;

      const ALL_ON = MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
        | MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT
        | MgMemoryPropertyFlagBits.HOST_COHERENT_BIT
        | MgMemoryPropertyFlagBits.HOST_CACHED_BIT
        | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;

      let info_stream = new WGLDeviceMemoryInfo();
      info_stream.memoryTypeIndex = SELECTED_TYPE_INDEX;
      info_stream.index = offset;
      info_stream.isHosted = false;

      info_stream.propertyFlags
        = MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
        | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;

      info_stream.hint = this.mGL.STREAM_READ;
      this.memoryTypes[info_stream.index] = info_stream; 

      offset += 1;

      let info_static = new WGLDeviceMemoryInfo();
      info_static.memoryTypeIndex = SELECTED_TYPE_INDEX;
      info_static.index = offset;
      info_static.isHosted = false;

      info_static.propertyFlags
        = MgMemoryPropertyFlagBits.HOST_CACHED_BIT
        | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;
        
      info_static.hint = this.mGL.STATIC_READ;
      this.memoryTypes[info_static.index] = info_static; 

      offset += 1;

      let dynamic = new WGLDeviceMemoryInfo();
      dynamic.memoryTypeIndex = SELECTED_TYPE_INDEX;
      dynamic.index = offset;
      dynamic.isHosted = false;
      dynamic.propertyFlags = ALL_ON;
      dynamic.hint = this.mGL.DYNAMIC_READ;
      this.memoryTypes[dynamic.index] = dynamic;  

      return offset + 1;
    }
  }
}