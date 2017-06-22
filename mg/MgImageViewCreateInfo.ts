import {IMgImage} from './IMgImage'
import {MgImageViewType} from './MgImageViewType'
import {MgFormat} from './MgFormat'
import {MgComponentMapping} from './MgComponentMapping'
import {MgImageSubresourceRange} from './MgImageSubresourceRange'

export class MgImageViewCreateInfo {
  flags : number;
  image : IMgImage;
  viewType : MgImageViewType;
  format : MgFormat;
  components : MgComponentMapping;
  subresourceRange : MgImageSubresourceRange;
}
