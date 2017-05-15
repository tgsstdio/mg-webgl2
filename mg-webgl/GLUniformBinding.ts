/// <reference path="../mg/MgDescriptorType.ts" />
/// <reference path="../mg/MgShaderStageFlagBits.ts" />

namespace Magnesium {
  export class GLUniformBinding {
    descriptorCount: number;
    descriptorType: MgDescriptorType;
    binding: number;
    stageFlags: MgShaderStageFlagBits;
  }
}