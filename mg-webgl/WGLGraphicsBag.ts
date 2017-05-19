/// <reference path="WGLCmdEncoderCollection.ts" />

namespace Magnesium {
  export class WGLGraphicsBag {
    private mDraws: WGLCmdEncoderCollection<WGLCmdInternalDraw>;
    constructor() {
      this.mDraws = new WGLCmdEncoderCollection<WGLCmdInternalDraw>();
    }
    
    get draws(): WGLCmdEncoderCollection<WGLCmdInternalDraw> {
      return this.mDraws;
    }

    clear(): void {
      this.mDraws.clear();
    }
  }
}