/// <reference path="IGLDescriptorSet.ts" />
/// <reference path="../mg/MgPipelineBindPoint.ts" />
/// <reference path="IGLPipelineLayout.ts" />

namespace Magnesium {
  export class GLCmdDescriptorSetParameter {
    descriptorSet: IGLDescriptorSet;
    layout: IGLPipelineLayout;
    dynamicOffsets: Array<number>;
    bindpoint: MgPipelineBindPoint;
  }
}