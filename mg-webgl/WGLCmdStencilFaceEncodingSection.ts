import {WGLCmdStencilFunctionInfo}
	from './WGLCmdStencilFunctionInfo';	
import {IWGLGraphicsPipeline}
	from './IWGLGraphicsPipeline';	  
import {WGLGraphicsPipelineDynamicStateFlagBits}
	from './WGLGraphicsPipelineDynamicStateFlagBits';	    

export class WGLCmdStencilFaceEncodingSection {
  referenceMask: number;
  compareMask: number;
  writeMask: number;    

  private mIsFront: boolean;
  constructor(isFront: boolean) {
    this.mIsFront = isFront;
    this.stencilValue = null;
    this.clear();
  }

  clear() {
    this.compareMask = 0xffffffff;
    this.writeMask = 0xffffffff;
    this.referenceMask = 0;
  }

  stencilValue: WGLCmdStencilFunctionInfo|null;
  invalidate() : void {
    this.stencilValue = null;
  }

  isDirty(
    pipeline: IWGLGraphicsPipeline| null
  ): boolean {
    let needPush = this.isPushRequired(pipeline);
    return needPush && this.stencilValue != null;
  }

  private isPushRequired(
    pipeline: IWGLGraphicsPipeline| null            
  ): boolean {
    if (pipeline == null)
      return false;

    const USER_SUPPLIED_ALLOWED = 
      WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_COMPARE_MASK
      | WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_REFERENCE;

    if (
      this.stencilValue == null 
      && (
      (pipeline.dynamicStates & USER_SUPPLIED_ALLOWED) > 0)
    ) {
      let temp = new WGLCmdStencilFunctionInfo();                
      temp.compareMask = this.compareMask;
      temp.referenceMask = this.referenceMask;

      temp.stencilFunction = 
        (this.mIsFront)
          ? pipeline.stencilState.frontStencilFunction
          : pipeline.stencilState.backStencilFunction;
      this.stencilValue = temp;

      return true;
    }
    else {
      return false;
    }
  }
}
