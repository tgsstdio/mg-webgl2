import {MgAccessFlagBits} from './MgAccessFlagBits'
import {MgImageLayout} from './MgImageLayout'
import {IMgImage} from './IMgImage'
import {MgImageSubresourceRange} from './MgImageSubresourceRange'

export class MgImageMemoryBarrier {
  srcAccessMask: MgAccessFlagBits;
  dstAccessMask: MgAccessFlagBits;
  oldLayout: MgImageLayout;
  newLayout: MgImageLayout;
  srcQueueFamilyIndex: number;
  dstQueueFamilyIndex: number;
  image: IMgImage;
  subresourceRange: MgImageSubresourceRange;
}
