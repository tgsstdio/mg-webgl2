/// <reference path="MgSpecializationInfo.ts" />

namespace Magnesium {
  export class MgPipelineShaderStageCreateInfo {
    flags : number;
    stage : MgShaderStageFlagBits;
    module : IMgShaderModule;
    name : string;
    specializationInfo : MgSpecializationInfo;
	}
}