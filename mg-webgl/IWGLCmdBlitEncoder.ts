import {WGLCmdBlitGrid} from './WGLCmdBlitGrid'
import {MgImageMemoryBarrier} from '../mg/MgImageMemoryBarrier'
import {MgImageLayout} from '../mg/MgImageLayout'
import {IMgImage} from '../mg/IMgImage'
import {IMgBuffer} from '../mg/IMgBuffer'
import {MgBufferImageCopy} from '../mg/MgBufferImageCopy'
import {MgImageCopy} from '../mg/MgImageCopy'
import {MgBufferCopy} from '../mg/MgBufferCopy'

export interface IWGLCmdBlitEncoder {
  clear(): void;
  asGrid(): WGLCmdBlitGrid;

  loadImageData(
    barriers: Array<MgImageMemoryBarrier>
  ) : void;

  copyImageToBuffer(
    srcImage: IMgImage
    , srcImageLayout: MgImageLayout
    , dstBuffer: IMgBuffer
    , pRegions: Array<MgBufferImageCopy>
  ) : void;

  copyBufferToImage(srcBuffer: IMgBuffer
    , dstImage: IMgImage
    , dstImageLayout: MgImageLayout
    , pRegions: Array<MgBufferImageCopy>
  ) : void;

  copyImage(srcImage: IMgImage
    , srcImageLayout: MgImageLayout
    , dstImage: IMgImage
    , dstImageLayout: MgImageLayout
    , pRegions: Array<MgImageCopy>
  ) : void;

  copyBuffer(
    srcBuffer: IMgBuffer
    , dstBuffer: IMgBuffer
    , pRegions: Array<MgBufferCopy>
  ) : void            
}
