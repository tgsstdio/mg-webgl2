/// <reference path="MgDynamicState.ts" />

namespace Magnesium {
  export class MgPipelineDynamicStateCreateInfo {
    flags: number;
    dynamicStates: Array<MgDynamicState>;
  }
}