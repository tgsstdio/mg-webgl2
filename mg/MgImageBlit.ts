import {MgImageSubresourceLayers} from './MgImageSubresourceLayers'
import {MgOffset3D} from './MgOffset3D'

export class MgImageBlit {
	srcSubresource : MgImageSubresourceLayers;
	srcOffsets: [MgOffset3D, MgOffset3D];
	dstSubresource: MgImageSubresourceLayers;
	dstOffsets: [MgOffset3D, MgOffset3D];
}