namespace Magnesium {
  export class WGLFenceEntrypoint implements IWGLFenceEntrypoint {
    private mGL: WebGL2RenderingContext;
    constructor(gl: WebGL2RenderingContext) {
      this.mGL = gl;
    }
    
    createFence(): IWGLFence {
      return new WGLFence(this.mGL);
    }
  }
}