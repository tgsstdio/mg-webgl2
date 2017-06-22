/// <reference path="Magnesium.ts" />

namespace Magnesium {

  export class MgClearDepthStencilValue {
    depth: number;
    stencil: number;

    equals(other: MgClearDepthStencilValue ) {
      if (Math.abs(this.depth - other.depth) > Number.EPSILON)
        return false;

      return (Math.abs(this.stencil - other.stencil) <= Number.EPSILON);
    }
  }
}