namespace Magnesium {
  export class MgColor4f {
    r : number;
    g : number;
    b : number;
    a : number;

    constructor(r: number, g: number, b: number, a: number) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }      

		equals (other: MgColor4f) : boolean
		{
      const EPSILON: number = 2.2204460492503130808472633361816E-16;

			return Math.abs (this.r - other.r) <= EPSILON
				&& Math.abs (this.g - other.g) <= EPSILON
				&& Math.abs (this.b - other.b) <= EPSILON
				&& Math.abs (this.a - other.a) <= EPSILON;
		}    
  }
}