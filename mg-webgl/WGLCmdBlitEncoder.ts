import {IWGLCmdBlitEncoder} from './IWGLCmdBlitEncoder';
import {WGLCmdEncoderContextSorter} from './WGLCmdEncoderContextSorter';
import {WGLCmdBlitBag} from './WGLCmdBlitBag';
import {IWGLImageFormatEntrypoint} from './IWGLImageFormatEntrypoint';
import {WGLCmdBlitGrid} from './WGLCmdBlitGrid';
import {MgImageMemoryBarrier} from '../mg/MgImageMemoryBarrier';
import {IMgImage} from '../mg/IMgImage';
import {MgImageLayout} from '../mg/MgImageLayout';
import {IMgBuffer} from '../mg/IMgBuffer';
import {MgBufferCopy} from '../mg/MgBufferCopy';
import {MgBufferImageCopy} from '../mg/MgBufferImageCopy';
import {MgImageCopy} from '../mg/MgImageCopy';

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

  loadImageData(
    barriers: Array<MgImageMemoryBarrier>
  ) : never {
    throw new Error('not implemented');
  }

  copyImageToBuffer(
    srcImage: IMgImage
    , srcImageLayout: MgImageLayout
    , dstBuffer: IMgBuffer
    , pRegions: Array<MgBufferImageCopy>
  ) : never {
    throw new Error('not implemented');
  }

  copyBufferToImage(srcBuffer: IMgBuffer
    , dstImage: IMgImage
    , dstImageLayout: MgImageLayout
    , pRegions: Array<MgBufferImageCopy>
  ) : never {
    throw new Error('not implemented');
  }

  copyImage(srcImage: IMgImage
    , srcImageLayout: MgImageLayout
    , dstImage: IMgImage
    , dstImageLayout: MgImageLayout
    , pRegions: Array<MgImageCopy>
  ) : never {
    throw new Error('not implemented');
  }

  copyBuffer(
    srcBuffer: IMgBuffer
    , dstBuffer: IMgBuffer
    , pRegions: Array<MgBufferCopy>
  ) : never {
    throw new Error('not implemented');
  }   
}
