/// <reference path="Magnesium.ts" />

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
    return Math.abs (this.r - other.r) <= Number.EPSILON
      && Math.abs (this.g - other.g) <= Number.EPSILON
      && Math.abs (this.b - other.b) <= Number.EPSILON
      && Math.abs (this.a - other.a) <= Number.EPSILON;
  }    
}
