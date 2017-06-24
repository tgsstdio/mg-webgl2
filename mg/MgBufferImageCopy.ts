import {MgImageSubresourceLayers}
	from './MgImageSubresourceLayers';	  
import {MgOffset3D}
	from './MgOffset3D';
import {MgExtent3D}
	from './MgExtent3D';	

export class MgBufferImageCopy {
  // WARN: bufferOffset requires UInt64
  bufferOffset: number;
  bufferRowLength: number;
  bufferImageHeight: number;
  imageSubresource: MgImageSubresourceLayers;
  imageOffset: MgOffset3D;
  imageExtent: MgExtent3D;
}
