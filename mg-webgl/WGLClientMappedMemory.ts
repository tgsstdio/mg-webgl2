namespace Magnesium {
  export class WGLClientMappedMemory {
    private mBuffer: ArrayBuffer;
    private mView: Uint8Array;
    private mOffset: number;
    private mSize: number;
    constructor(
      buffer: ArrayBuffer         
      , offset: number
      , size: number
      , view: Uint8Array
    ) {
      this.mBuffer = buffer;
      this.mOffset = offset;
      this.mSize = size;
      this.mView = view;
    }

    get buffer(): ArrayBuffer {
      return this.mBuffer;
    }

    get view(): Uint8Array {
      return this.mView;
    }

    get offset(): number {
      return this.mOffset;
    }

    get size(): number {
      return this.mSize;
    }
  }
}