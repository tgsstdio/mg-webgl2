/// <reference path="MgStencilOp.ts" />
/// <reference path="MgCompareOp.ts" />

namespace Magnesium {
  export class MgStencilOpState	{
    failOp : MgStencilOp;
    passOp : MgStencilOp;
    depthFailOp : MgStencilOp;
    compareOp : MgCompareOp;
    compareMask : number;
    writeMask : number;
    reference : number;
	}
}