/// <reference path="MgShaderStageFlagBits.ts" />

namespace Magnesium {
  export class MgPushConstantRange {
    stageFlags : MgShaderStageFlagBits;
    offset : number;
    size : number;
	}
}