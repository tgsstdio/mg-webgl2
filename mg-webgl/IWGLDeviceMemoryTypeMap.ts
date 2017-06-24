import {WGLDeviceMemoryTypeFlagBits} from './WGLDeviceMemoryTypeFlagBits';
import {WGLDeviceMemoryTypeInfo} from './WGLDeviceMemoryTypeInfo';

export interface IWGLDeviceMemoryTypeMap {
  determineTypeIndex(
    category: WGLDeviceMemoryTypeFlagBits
  ) : number;
  readonly memoryTypes: Array<WGLDeviceMemoryTypeInfo>;
}
