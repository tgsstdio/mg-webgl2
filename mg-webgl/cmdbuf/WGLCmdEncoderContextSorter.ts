import {WGLCmdEncoderContext} from './WGLCmdEncoderContext';
import {WGLCmdRecordInstruction} from './WGLCmdRecordInstruction';
import {WGLCmdEncodingInstruction} from './WGLCmdEncodingInstruction';
import {WGLCmdCommandBufferRecord} from './WGLCmdCommandBufferRecord';

export class WGLCmdEncoderContextSorter {
  private mCurrentContext: WGLCmdEncoderContext | null;
  private mContexts: Array<WGLCmdEncoderContext>;
  get contexts(): Array<WGLCmdEncoderContext> {
    return this.mContexts;
  }

  private mInstructions: Array<WGLCmdRecordInstruction>;
  get instructions(): Array<WGLCmdRecordInstruction> {
    return this.mInstructions;
  }

  constructor() {
      this.clear();
  }

  clear(): void {
    this.mContexts = new Array<WGLCmdEncoderContext>();
    this.mInstructions = new Array<WGLCmdRecordInstruction>();
    this.mCurrentContext = null;
  }

  add(inst: WGLCmdEncodingInstruction) : void {
    let currentIndex = this.mInstructions.length;
    let record = new WGLCmdEncodingInstruction();
    record.index = inst.index;
    record.operation = inst.operation;
    this.mInstructions.push(record);

    if (this.mCurrentContext == null) {
      this.initializeNewContext(inst, currentIndex);
    }
    else {
      if (this.mCurrentContext.category == inst.category)
      {
        this.mCurrentContext.last = currentIndex;
      }
      else {
        this.initializeNewContext(inst, currentIndex);
      }
    }
  }

  private initializeNewContext(
    inst: WGLCmdEncodingInstruction
    , currentIndex: number
  ) : void
  {
    let context = new WGLCmdEncoderContext(); 
    context.category = inst.category;
    context.first = currentIndex;
    context.last = currentIndex;
    this.mContexts.push(context);
    this.mCurrentContext = context;
  }
}
