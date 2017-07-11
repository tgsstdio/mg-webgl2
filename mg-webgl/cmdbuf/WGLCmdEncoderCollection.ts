export class WGLCmdEncoderCollection<TData> {
  private mItems: Array<TData>;
  constructor() {
    this.mItems = new Array<TData>();
  }

  push(item: TData) :number {
    let count = this.mItems.length;
    this.mItems.push(item);
    return count;
  }

  clear() : void {
    this.mItems = new Array<TData>(); 
  }

  toArray() : Array<TData> {
    return this.mItems;
  }
}
