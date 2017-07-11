import {IWGLCmdBlitEncoder} from './IWGLCmdBlitEncoder';
import {WGLCmdEncoderContextSorter} from './WGLCmdEncoderContextSorter';
import {WGLCmdBlitBag} from './WGLCmdBlitBag';
import {IWGLImageFormatEntrypoint} from '../entrypoint/IWGLImageFormatEntrypoint';
import {WGLCmdBlitGrid} from './WGLCmdBlitGrid';
import {MgImageMemoryBarrier} from '../../mg/MgImageMemoryBarrier';
import {IMgImage} from '../../mg/IMgImage';
import {MgImageLayout} from '../../mg/MgImageLayout';
import {IMgBuffer} from '../../mg/IMgBuffer';
import {MgBufferCopy} from '../../mg/MgBufferCopy';
import {MgBufferImageCopy} from '../../mg/MgBufferImageCopy';
import {MgImageCopy} from '../../mg/MgImageCopy';
import {IWGLBuffer} from '../IWGLBuffer';
import {WGLCmdCopyBufferRegionRecord}
	from './WGLCmdCopyBufferRegionRecord';
import {WGLCmdCopyBufferRecord}
	from './WGLCmdCopyBufferRecord';
import {WGLCmdEncodingInstruction}
	from './WGLCmdEncodingInstruction';	
import {WGLCmdEncoderCategory}
	from './WGLCmdEncoderCategory';
import {WGLCmdAction}
	from './WGLCmdAction';	  
import {WGLCmdCommandRecording}
	from './WGLCmdCommandRecording'; 	  
import {MgBufferUsageFlagBits}
	from '../../mg/MgBufferUsageFlagBits';  

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
  ) : void {
    if (srcBuffer == null) {
        throw new Error('srcBuffer is null');
    }

    if (dstBuffer == null) {
      throw new Error('dstBuffer is null');
    }

    let bSrcBuffer = srcBuffer as IWGLBuffer;
    let bDstBuffer = dstBuffer as IWGLBuffer;
    if (
      bSrcBuffer.isBufferType 
      && (
        (bSrcBuffer.usage | MgBufferUsageFlagBits.TRANSFER_SRC_BIT)
        == MgBufferUsageFlagBits.TRANSFER_SRC_BIT
      )  
      && bDstBuffer.isBufferType
      && (
        (bDstBuffer.usage | MgBufferUsageFlagBits.TRANSFER_DST_BIT)
        == MgBufferUsageFlagBits.TRANSFER_DST_BIT
      )
    ) {
      let copyParams = new Array<WGLCmdCopyBufferRegionRecord>();
      for (var i = 0; i < pRegions.length; i += 1) {
        let region = pRegions[i];
        const LONG_MAX_VALUE = 2147483647;
        if (region.srcOffset > LONG_MAX_VALUE) {
          throw new Error('pRegions[' +  i + '].srcOffset is greater than ' + LONG_MAX_VALUE);
        }

        if (region.dstOffset > LONG_MAX_VALUE) {
            throw new Error('pRegions[' + i + '].dstOffset is greater than ' + LONG_MAX_VALUE);
        }

        if (region.size > LONG_MAX_VALUE) {
            throw new Error('pRegions[' + i + '].size is greater than ' + LONG_MAX_VALUE);
        }

        let bufferParam = new WGLCmdCopyBufferRegionRecord();
        bufferParam.readOffset = region.srcOffset;
        bufferParam.writeOffset = region.srcOffset;
        bufferParam.size = region.size;        
        copyParams.push(bufferParam);
      }

      let item = new WGLCmdCopyBufferRecord();
      item.source = bSrcBuffer;
      item.destination = bDstBuffer;
      item.regions = copyParams;

      let nextIndex = this.mBag.copyBuffers.push(item);

      let instruction = new WGLCmdEncodingInstruction();
      instruction.category = WGLCmdEncoderCategory.BLIT;
      instruction.index = nextIndex;
      instruction.operation = new WGLCmdCopyBuffer();      

      this.mInstructions.add(instruction);      
    }
  }
}

class WGLCmdCopyBuffer implements WGLCmdAction {
  action(
    arg1: WGLCmdCommandRecording
    , arg2: number
  ) : void {
    let context = arg1.blit;
    if (context == null)
      return;

    let grid = context.grid;
    if (grid == null)
      return;

    let items = grid.copyBuffers;
    if (items == null)
      return; 

    let item = items[arg2];
    if (item == null)
      return; 

    let entrypoint = context.entrypoint;
    if (entrypoint == null)
      return; 

    if (item.regions != null) {
      if (item.regions.length > 0) {
        entrypoint.bindCopySrcBuffer(item.source);
        entrypoint.bindCopyDstBuffer(item.destination);
      }

      for (let region of item.regions) {
        entrypoint.copyBuffer(
          region.readOffset
          , region.writeOffset
          , region.size);
      }
    }
  }
}


