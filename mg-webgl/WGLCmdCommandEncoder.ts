namespace Magnesium {
  export interface IWGLCmdBlitEncoder {

  }

  export class WGLCmdCommandEncoder {
    constructor(
      instructions: WGLCmdEncoderContextSorter
      , graphics: IWGLGraphicsEncoder
      , compute: IWGLCmdComputeEncoder
      , blit: IWGLCmdBlitEncoder
    ) {
      this.mInstructions = instructions;
      this.mGraphics = graphics;
      this.mCompute = compute;
      this.mBlit = blit;
    }

    private mInstructions: WGLCmdEncoderContextSorter;
    get instructions(): WGLCmdEncoderContextSorter {
      return this.mInstructions;
    }

    private mGraphics : IWGLGraphicsEncoder;
    get graphics(): IWGLGraphicsEncoder {
      return this.mGraphics;
    }    

    private mCompute: IWGLCmdComputeEncoder;
    get compute(): IWGLCmdComputeEncoder {
      return this.mCompute;
    }

    private mBlit: IWGLCmdBlitEncoder;
    get blit(): IWGLCmdBlitEncoder {
      return this.mBlit;
    }
  }
}