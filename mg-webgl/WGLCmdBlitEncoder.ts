namespace Magnesium {
  export class WGLCmdBlitEncoder implements IWGLCmdBlitEncoder {
    private mInstructions: WGLCmdEncoderContextSorter;
    private mBag: WGLCmdBlitBag;
    private mImageFormat: IWGLImageFormatEntrypoint;

    constructor(
      sorter: WGLCmdEncoderContextSorter
      , bag: WGLCmdBlitBag
      , imageFormat: IWGLImageFormatEntrypoint
    ) {
      this.mInstructions = sorter;
      this.mBag = bag;
      this.mImageFormat = imageFormat;
    }    

    clear(): void {
      this.mBag.clear();
    }

    asGrid() : WGLCmdBlitGrid {
      let grid = new WGLCmdBlitGrid();
      grid.copyBuffers = this.mBag.copyBuffers.toArray();
      grid.loadImageOps = this.mBag.loadImageOps.toArray();
      return grid;
    }
  }
}