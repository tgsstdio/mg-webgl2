/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgVec4i {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x: number, y: number, z: number, w: number) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    }

		equals (other: MgVec4i) : boolean	{
      const EPSILON: number = 2.2204460492503130808472633361816E-16;

			return Math.abs (this.x - other.x) <= EPSILON
				&& Math.abs (this.y - other.y) <= EPSILON
				&& Math.abs (this.z - other.z) <= EPSILON
				&& Math.abs (this.w - other.w) <= EPSILON;
		}      
  }
}