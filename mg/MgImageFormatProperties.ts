import {MgExtent3D} from './MgExtent3D'
import {MgSampleCountFlagBits} from './MgSampleCountFlagBits'

export class MgImageFormatProperties {
  maxExtent: MgExtent3D;
  maxMipLevels: number;
  maxArrayLayers: number;
  sampleCounts: MgSampleCountFlagBits;
  // WARN: maxResourceSize requires UInt64
  maxResourceSize: number;
}
