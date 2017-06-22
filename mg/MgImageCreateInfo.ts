import {MgImageCreateFlagBits} from './MgImageCreateFlagBits'
import {MgImageType} from './MgImageType'
import {MgFormat} from './MgFormat'
import {MgExtent3D} from './MgExtent3D'
import {MgSampleCountFlagBits} from './MgSampleCountFlagBits'
import {MgImageTiling} from './MgImageTiling'
import {MgImageUsageFlagBits} from './MgImageUsageFlagBits'
import {MgSharingMode} from './MgSharingMode'
import {MgImageLayout} from './MgImageLayout'

export class MgImageCreateInfo {
  flags : MgImageCreateFlagBits;
  imageType : MgImageType;
  format : MgFormat;
  extent : MgExtent3D;
  mipLevels : number;
  arrayLayers : number;
  samples : MgSampleCountFlagBits;
  tiling : MgImageTiling;
  usage : MgImageUsageFlagBits;
  sharingMode : MgSharingMode;
  queueFamilyIndices : Array<number>;
  initialLayout : MgImageLayout;
}
