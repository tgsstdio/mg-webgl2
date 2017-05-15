namespace Magnesium {

  export class MgClearDepthStencilValue {
    depth: number;
    stencil: number;

    equals(other: MgClearDepthStencilValue ) {
      const EPSILON: number = 2.2204460492503130808472633361816E-16;

      if (Math.abs(this.depth - other.depth) > EPSILON)
        return false;

      return (Math.abs(this.stencil - other.stencil) <= EPSILON);
    }
  }
}