export class MgVec4Ui {
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

  equals (other: MgVec4Ui) : boolean {
    return Math.abs (this.x - other.x) <= Number.EPSILON
      && Math.abs (this.y - other.y) <= Number.EPSILON
      && Math.abs (this.z - other.z) <= Number.EPSILON
      && Math.abs (this.w - other.w) <= Number.EPSILON;
  }      
}
