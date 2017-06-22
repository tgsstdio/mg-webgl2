import {IMgSampler} from './IMgSampler'
import {IMgImageView} from './IMgImageView'
import {MgImageLayout} from './MgImageLayout'

export class MgDescriptorImageInfo {
  sampler : IMgSampler;
  imageView : IMgImageView;
  imageLayout : MgImageLayout;
}