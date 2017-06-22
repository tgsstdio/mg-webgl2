import {MgImageAspectFlagBits} from './MgImageAspectFlagBits'
import {MgExtent3D} from './MgExtent3D'
import {MgSparseImageFormatFlagBits} from './MgSparseImageFormatFlagBits'

export class MgSparseImageFormatProperties {
  aspectMask: MgImageAspectFlagBits;
  imageGranularity: MgExtent3D;
  flags: MgSparseImageFormatFlagBits;
}
