import {MgImageAspectFlagBits} from './MgImageAspectFlagBits'

export class MgImageSubresource {
  aspectMask : MgImageAspectFlagBits;
  mipLevel : number;
  arrayLayer : number;
}
