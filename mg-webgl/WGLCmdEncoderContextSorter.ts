namespace Magnesium {
  export class WGLCmdEncoderContextSorter {
    private mCurrentContext: WGLCmdEncoderContext | null;
    private mContexts: Array<WGLCmdEncoderContext>;
    private mInstructions: Array<WGLCmdRecordInstruction>;
    constructor()
    {
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

    toReplay(): WGLCmdCommandBufferRecord {
      let result = new WGLCmdCommandBufferRecord();
      result.contexts = this.mContexts;
      result.instructions = this.mInstructions;
      return result;
    }   
  }
}