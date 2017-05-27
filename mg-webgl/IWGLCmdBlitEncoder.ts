namespace Magnesium {
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
}