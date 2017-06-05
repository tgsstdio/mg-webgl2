namespace Magnesium {
  export interface IWGLDeviceMemoryTypeMap {
    determineTypeIndex(
      category: WGLDeviceMemoryTypeFlagBits
    ) : number;
    readonly memoryTypes: Array<WGLDeviceMemoryTypeInfo>;
  }
}