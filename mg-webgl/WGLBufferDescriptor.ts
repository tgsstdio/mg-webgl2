namespace Magnesium {
  export class WGLBufferDescriptor {
    bufferId: WebGLBuffer|null;
    isDynamic: boolean;
    // WARN: offset requires long
    offset: number;
    size: number;

    destroy() : void {

    }

    reset() : void {
      this.bufferId = null;
			this.isDynamic = false;
			this.offset = 0;
			this.size = 0;
    }
  }
}