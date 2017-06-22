import {MgImageAspectFlagBits} from './MgImageAspectFlagBits'

export class MgImageSubresourceLayers {
  aspectMask: MgImageAspectFlagBits;
  mipLevel: number;
  baseArrayLayer: number;
  layerCount: number;
}
