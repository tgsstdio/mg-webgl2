/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgImageBlit {
		srcSubresource : MgImageSubresourceLayers;
 	  srcOffsets: [MgOffset3D, MgOffset3D];
		dstSubresource: MgImageSubresourceLayers;
		dstOffsets: [MgOffset3D, MgOffset3D];
	}
}