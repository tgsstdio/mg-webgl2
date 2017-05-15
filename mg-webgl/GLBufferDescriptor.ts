namespace Magnesium {
  export class GLBufferDescriptor {
    bufferId: number;
    isDynamic: boolean;
    // WARN: offset requires long
    offset: number;
    size: number;

    destroy() : void {

    }

    reset() : void {
      this.bufferId = 0;
			this.isDynamic = false;
			this.offset = 0;
			this.size = 0;
    }
  }
}