/// <reference path="MgFormat.ts" />
/// <reference path="MgFormatFeatureFlagBits.ts" />

namespace Magnesium {
  export class MgFormatProperties {
    linearTilingFeatures: MgFormatFeatureFlagBits;
    optimalTilingFeatures: MgFormatFeatureFlagBits;
    bufferFeatures: MgFormatFeatureFlagBits;
    format: MgFormat;
  }
}