/// <reference path="IWGLDescriptorSet.ts" />
/// <reference path="../mg/MgPipelineBindPoint.ts" />
/// <reference path="IWGLPipelineLayout.ts" />

namespace Magnesium {
  export class WGLCmdDescriptorSetParameter {
    descriptorSet: IWGLDescriptorSet|null;
    layout: IWGLPipelineLayout|null;
    dynamicOffsets: Array<number>|null;
    bindpoint: MgPipelineBindPoint;
  }
}