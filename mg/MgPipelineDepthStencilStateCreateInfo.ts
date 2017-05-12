/// <reference path="MgCompareOp.ts" />
/// <reference path="MgStencilOpState.ts" />

namespace Magnesium {
  export class MgPipelineDepthStencilStateCreateInfo {
    flags : number;
    depthTestEnable : boolean;
    depthWriteEnable : boolean;
    depthCompareOp : MgCompareOp;
    depthBoundsTestEnable : boolean;
    stencilTestEnable : boolean;
    front : MgStencilOpState;
    back : MgStencilOpState;
    minDepthBounds : number;
    maxDepthBounds : number;
	}
}