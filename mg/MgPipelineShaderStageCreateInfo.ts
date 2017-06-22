/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgPipelineShaderStageCreateInfo {
    flags : number;
    stage : MgShaderStageFlagBits;
    module : IMgShaderModule;
    name : string;
    specializationInfo : MgSpecializationInfo;
	}
}