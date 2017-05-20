namespace Magnesium {
  export class WGLUniformBlockNameInfo {
    constructor(
      prefix: string
      , x: number
      , y: number
      , z: number
    ) {
      this.prefix = prefix;
      this.x = x;
      this.y = y;
      this.z = z;
    }

    bindingIndex: number;
    prefix: string;
    x: number;
    y: number;
    z: number;
  }
}