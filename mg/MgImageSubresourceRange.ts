import {MgImageAspectFlagBits} from './MgImageAspectFlagBits'

export class MgImageSubresourceRange {
  aspectMask : MgImageAspectFlagBits;
  baseMipLevel : number;
  levelCount : number;
  baseArrayLayer : number;
  layerCount : number;
}
