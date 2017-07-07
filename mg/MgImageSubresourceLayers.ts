import {MgImageAspectFlagBits} from './MgImageAspectFlagBits'

export class MgImageSubresourceLayers {
  constructor() {
    this.aspectMask = 0;
    this.mipLevel = 0;
    this.baseArrayLayer = 0;
    this.layerCount = 0;
  }

  aspectMask: MgImageAspectFlagBits;
  mipLevel: number;
  baseArrayLayer: number;
  layerCount: number;
}
