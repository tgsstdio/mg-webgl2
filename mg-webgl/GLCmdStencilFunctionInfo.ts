/// <reference path="../mg/MgCompareOp.ts" />

namespace Magnesium {
  export class GLCmdStencilFunctionInfo {
    referenceMask: number;
    stencilFunction: MgCompareOp;
    compareMask: number;

    equals(other: GLCmdStencilFunctionInfo) : boolean
    {
        if (this.stencilFunction != other.stencilFunction)
            return false;

        if (this.referenceMask != other.referenceMask)
            return false;

        return (this.compareMask == other.compareMask);
    }    
  }
}