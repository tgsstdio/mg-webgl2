import { MgFormatFeatureFlagBits } from './MgFormatFeatureFlagBits'
import { MgFormat } from './MgFormat'

export class MgFormatProperties {
  linearTilingFeatures: MgFormatFeatureFlagBits;
  optimalTilingFeatures: MgFormatFeatureFlagBits;
  bufferFeatures: MgFormatFeatureFlagBits;
  format: MgFormat;
}
