namespace Magnesium {
  export class WGLCmdCommandEncoder {
    
    private mGraphics : IWGLGraphicsEncoder;
    get graphics(): IWGLGraphicsEncoder {
      return this.mGraphics;
    }
  }
}