/// <reference path="IGLDescriptorSet.ts" />
/// <reference path="../mg/MgPipelineBindPoint.ts" />
/// <reference path="IWGLPipelineLayout.ts" />

namespace Magnesium {
  export class GLCmdDescriptorSetParameter {
    descriptorSet: IGLDescriptorSet;
    layout: IWGLPipelineLayout;
    dynamicOffsets: Array<number>;
    bindpoint: MgPipelineBindPoint;
  }
}