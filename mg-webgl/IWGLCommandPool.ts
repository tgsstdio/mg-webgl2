namespace Magnesium {
  export interface IWGLCommandPool extends IMgCommandPool {
    readonly flags: MgCommandPoolCreateFlagBits;
    readonly buffers: Array<IGLCommandBuffer>;
  }
}