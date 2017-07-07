import {MgImageSubresourceLayers}
	from './MgImageSubresourceLayers';	  
import {MgOffset3D}
	from './MgOffset3D';
import {MgExtent3D}
	from './MgExtent3D';	

export class MgBufferImageCopy {
  constructor() {
    this.bufferOffset = 0;
    this.bufferRowLength = 0;
    this.bufferImageHeight = 0;
    this.imageSubresource = new MgImageSubresourceLayers();
    this.imageOffset = new MgOffset3D();
    this.imageExtent = new MgExtent3D();
  }

  // WARN: bufferOffset requires UInt64
  bufferOffset: number;
  bufferRowLength: number;
  bufferImageHeight: number;
  imageSubresource: MgImageSubresourceLayers;
  imageOffset: MgOffset3D;
  imageExtent: MgExtent3D;
}
