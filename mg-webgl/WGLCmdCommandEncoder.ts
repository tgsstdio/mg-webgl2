import {WGLCmdEncoderContextSorter}
	from './WGLCmdEncoderContextSorter';	 
import {IWGLCmdGraphicsEncoder}
	from './IWGLCmdGraphicsEncoder';	 
import {IWGLCmdComputeEncoder}
	from './IWGLCmdComputeEncoder';	 
import {IWGLCmdBlitEncoder}
	from './IWGLCmdBlitEncoder';	     
import {WGLCmdCommandBufferRecord}
	from './WGLCmdCommandBufferRecord';	    

export class WGLCmdCommandEncoder {
  constructor(
    instructions: WGLCmdEncoderContextSorter
    , graphics: IWGLCmdGraphicsEncoder
    , compute: IWGLCmdComputeEncoder
    , blit: IWGLCmdBlitEncoder
  ) {
    this.mInstructions = instructions;
    this.mGraphics = graphics;
    this.mCompute = compute;
    this.mBlit = blit;
  }

  clear(): void {
    this.mGraphics.clear();
    this.mCompute.clear();
    this.mBlit.clear();
    this.mInstructions.clear();
  }

  private mInstructions: WGLCmdEncoderContextSorter;
  get instructions(): WGLCmdEncoderContextSorter {
    return this.mInstructions;
  }

  private mGraphics : IWGLCmdGraphicsEncoder;
  get graphics(): IWGLCmdGraphicsEncoder {
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

  asRecord(): WGLCmdCommandBufferRecord {
    let replay = this.mInstructions.toReplay();
    replay.computeGrid = this.mCompute.asGrid();
    replay.graphicsGrid = this.mGraphics.asGrid();
    replay.blitGrid = this.mBlit.asGrid();
    return replay;
  }
}
