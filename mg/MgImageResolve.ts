import {MgImageSubresourceLayers} from './MgImageSubresourceLayers'
import {MgOffset3D} from './MgOffset3D'
import {MgExtent3D} from './MgExtent3D'

export class MgImageResolve {
  srcSubresource: MgImageSubresourceLayers;
  srcOffset: MgOffset3D;
  dstSubresource: MgImageSubresourceLayers;
  dstOffset: MgOffset3D;
  extent: MgExtent3D;
}
