export class WGLClientMappedMemory {
  private mBuffer: ArrayBuffer;
  private mView: Uint8Array;
  private mSrcOffset: number;
  private mDstOffset: number;
  private mSize: number;
  constructor(
    buffer: ArrayBuffer         
    , srcOffset: number
    , dstOffset: number
    , size: number
    , view: Uint8Array
  ) {
    this.mBuffer = buffer;
    this.mSrcOffset = srcOffset;
    this.mDstOffset = dstOffset;
    this.mSize = size;
    this.mView = view;
  }

  get buffer(): ArrayBuffer {
    return this.mBuffer;
  }

  get view(): Uint8Array {
    return this.mView;
  }

  get srcOffset(): number {
    return this.mSrcOffset;
  }

  get dstOffset(): number {
    return this.mDstOffset;
  }  

  get size(): number {
    return this.mSize;
  }
}
