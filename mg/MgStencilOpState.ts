/// <reference path="Magnesium.ts" />

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