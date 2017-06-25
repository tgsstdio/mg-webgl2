import {MgMemoryPropertyFlagBits}
	from '../mg/MgMemoryPropertyFlagBits';  
import {IWGLDeviceMemoryTypeMap}
	from './IWGLDeviceMemoryTypeMap';	  
import {WGLDeviceMemoryTypeInfo}
	from './WGLDeviceMemoryTypeInfo';	    
import {WGLDeviceMemoryTypeFlagBits}
	from './WGLDeviceMemoryTypeFlagBits';  

export class WGLDeviceMemoryTypeMap implements IWGLDeviceMemoryTypeMap {
  private mGL: WebGL2RenderingContext
  constructor(gl:WebGL2RenderingContext) {
    this.mGL = gl;
    this.initialize();
  }

  private mMemoryTypes: Array<WGLDeviceMemoryTypeInfo>;
  get memoryTypes():  Array<WGLDeviceMemoryTypeInfo> {
    return this.mMemoryTypes;
  }

  private initialize(): void {
    this.mMemoryTypes = new Array<WGLDeviceMemoryTypeInfo>(8);

    let index = this.pushIndirectEntries(0);
    index = this.pushImageEntries(index);
    index = this.pushDrawEntries(index);
    index = this.pushReadEntries(index);
  }

  determineTypeIndex(
    category: WGLDeviceMemoryTypeFlagBits
  ) : number {
    let mask = 0;
    for(let i = 0; i< this.mMemoryTypes.length; i += 1) {
      let entry = this.mMemoryTypes[i];
      if ((entry.memoryTypeIndex & category) == category)
      {
        mask |= 1 << i;
      }
    }
    return mask;
  }

  private pushIndirectEntries(
    offset: number
  ) : number {
    const ALL_ON = MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
      | MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT
      | MgMemoryPropertyFlagBits.HOST_COHERENT_BIT
      | MgMemoryPropertyFlagBits.HOST_CACHED_BIT
      | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;

    let info = new WGLDeviceMemoryTypeInfo();
    info.index = offset;
    info.isHosted = true;
    info.memoryTypeIndex = WGLDeviceMemoryTypeFlagBits.INDIRECT;
    info.propertyFlags = ALL_ON;
    info.hint = 0;
    this.mMemoryTypes[info.index] = info;

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

    let info = new WGLDeviceMemoryTypeInfo();
    info.index = offset;
    info.isHosted = true;
    info.memoryTypeIndex = WGLDeviceMemoryTypeFlagBits.IMAGE;
    info.propertyFlags = ALL_ON;
    info.hint = 0;
    this.mMemoryTypes[info.index] = info;        
  
    return offset + 1;
  }  

  private pushDrawEntries(
    offset: number
  ) : number {
    const SELECTED_TYPE_INDEX = WGLDeviceMemoryTypeFlagBits.VERTEX
      | WGLDeviceMemoryTypeFlagBits.INDEX
      | WGLDeviceMemoryTypeFlagBits.UNIFORM
      | WGLDeviceMemoryTypeFlagBits.TRANSFER_SRC;

    const ALL_ON = MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
      | MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT
      | MgMemoryPropertyFlagBits.HOST_COHERENT_BIT
      | MgMemoryPropertyFlagBits.HOST_CACHED_BIT
      | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;

    let info_stream = new WGLDeviceMemoryTypeInfo();
    info_stream.memoryTypeIndex = SELECTED_TYPE_INDEX;
    info_stream.index = offset;
    info_stream.isHosted = false;

    info_stream.propertyFlags
      = MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
      | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;

    info_stream.hint = this.mGL.STREAM_DRAW;
    this.mMemoryTypes[info_stream.index] = info_stream; 

    offset += 1;

    let info_static = new WGLDeviceMemoryTypeInfo();
    info_static.memoryTypeIndex = SELECTED_TYPE_INDEX;
    info_static.index = offset;
    info_static.isHosted = false;

    info_static.propertyFlags
      = MgMemoryPropertyFlagBits.HOST_CACHED_BIT
      | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;
      
    info_static.hint = this.mGL.STATIC_DRAW;
    this.mMemoryTypes[info_static.index] = info_static; 

    offset += 1;

    let dynamic = new WGLDeviceMemoryTypeInfo();
    dynamic.memoryTypeIndex = SELECTED_TYPE_INDEX;
    dynamic.index = offset;
    dynamic.isHosted = false;
    dynamic.propertyFlags = ALL_ON;
    dynamic.hint = this.mGL.DYNAMIC_DRAW;
    this.mMemoryTypes[dynamic.index] = dynamic;     

    return offset + 1;      
  }

  pushReadEntries(
    offset: number
  ) : number {
      const SELECTED_TYPE_INDEX = WGLDeviceMemoryTypeFlagBits.VERTEX
      | WGLDeviceMemoryTypeFlagBits.INDEX
      | WGLDeviceMemoryTypeFlagBits.UNIFORM
      | WGLDeviceMemoryTypeFlagBits.TRANSFER_SRC
      | WGLDeviceMemoryTypeFlagBits.TRANSFER_DST;

    const ALL_ON = MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
      | MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT
      | MgMemoryPropertyFlagBits.HOST_COHERENT_BIT
      | MgMemoryPropertyFlagBits.HOST_CACHED_BIT
      | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;

    let info_stream = new WGLDeviceMemoryTypeInfo();
    info_stream.memoryTypeIndex = SELECTED_TYPE_INDEX;
    info_stream.index = offset;
    info_stream.isHosted = false;

    info_stream.propertyFlags
      = MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT
      | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;

    info_stream.hint = this.mGL.STREAM_READ;
    this.mMemoryTypes[info_stream.index] = info_stream; 

    offset += 1;

    let info_static = new WGLDeviceMemoryTypeInfo();
    info_static.memoryTypeIndex = SELECTED_TYPE_INDEX;
    info_static.index = offset;
    info_static.isHosted = false;

    info_static.propertyFlags
      = MgMemoryPropertyFlagBits.HOST_CACHED_BIT
      | MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT;
      
    info_static.hint = this.mGL.STATIC_READ;
    this.mMemoryTypes[info_static.index] = info_static; 

    offset += 1;

    let dynamic = new WGLDeviceMemoryTypeInfo();
    dynamic.memoryTypeIndex = SELECTED_TYPE_INDEX;
    dynamic.index = offset;
    dynamic.isHosted = false;
    dynamic.propertyFlags = ALL_ON;
    dynamic.hint = this.mGL.DYNAMIC_READ;
    this.mMemoryTypes[dynamic.index] = dynamic;  

    return offset + 1;
  }
}
