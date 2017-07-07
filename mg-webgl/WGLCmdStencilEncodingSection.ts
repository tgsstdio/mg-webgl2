import {WGLCmdStencilFaceEncodingSection}
	from './WGLCmdStencilFaceEncodingSection';	  
import {IWGLGraphicsPipeline}
	from './IWGLGraphicsPipeline';	 
import {WGLCmdGraphicsBag}
	from './WGLCmdGraphicsBag';	  
import {WGLCmdEncoderContextSorter}
	from './WGLCmdEncoderContextSorter';	 
import {WGLCmdStencilFunctionInfo}
	from './WGLCmdStencilFunctionInfo';	  
import {WGLCmdEncodingInstruction}
	from './WGLCmdEncodingInstruction';	    
import {WGLCmdEncoderCategory}
	from './WGLCmdEncoderCategory';	  
import {WGLGraphicsPipelineDynamicStateFlagBits}
  from './WGLGraphicsPipelineDynamicStateFlagBits';  
import {MgStencilFaceFlagBits}
	from '../mg/MgStencilFaceFlagBits';  
import {WGLCmdPipelineStencilWriteInfo}
	from './WGLCmdPipelineStencilWriteInfo';	  
import {WGLCmdAction}
	from './WGLCmdAction';	  
import {WGLCmdCommandRecording}
	from './WGLCmdCommandRecording';		 

export class WGLCmdStencilEncodingSection {
  constructor() {
    this.back = new WGLCmdStencilFaceEncodingSection(false);
    this.front = new WGLCmdStencilFaceEncodingSection(true);
  }

  back: WGLCmdStencilFaceEncodingSection;
  front: WGLCmdStencilFaceEncodingSection;

  clear(): void {
    this.back.clear();
    this.front.clear();
    this.back.invalidate();
    this.front.invalidate();
  }

  pushIfRequired(
      pipeline: IWGLGraphicsPipeline| null
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter          
  ) : void {
    // if front stencil is missing, generate new one
    let frontNeeded: boolean
      = this.front.isDirty(pipeline);
    // if back stencil is missing, generate new one
    let backNeeded: boolean
        = this.back.isDirty(pipeline);

    if (frontNeeded && backNeeded) {
      let left = this.front.stencilValue as WGLCmdStencilFunctionInfo;
      let right = this.back.stencilValue as WGLCmdStencilFunctionInfo;

      if (left.equals(right))
      {
          let nextIndex = bag.stencilFunctions.push(left);

          let instruction = new WGLCmdEncodingInstruction();
          instruction.category = WGLCmdEncoderCategory.GRAPHICS;
          instruction.index = nextIndex,
          instruction.operation = new WGLCmdUpdateBothStencils();
          instructions.add(instruction);
      }
    }
    else
    {
      if (frontNeeded)
      {
        let frontFunc = this.front.stencilValue as WGLCmdStencilFunctionInfo;

        let nextIndex = bag.stencilFunctions.push(frontFunc);

        let instruction = new WGLCmdEncodingInstruction();
        instruction.category = WGLCmdEncoderCategory.GRAPHICS;
        instruction.index = nextIndex,
        instruction.operation = new WGLCmdUpdateFrontStencil();
        instructions.add(instruction);
      } 

      if (backNeeded)
      {
        let backFunc = this.back.stencilValue as WGLCmdStencilFunctionInfo;

        let nextIndex = bag.stencilFunctions.push(backFunc);

        let instruction = new WGLCmdEncodingInstruction();
        instruction.category = WGLCmdEncoderCategory.GRAPHICS;
        instruction.index = nextIndex,
        instruction.operation = new WGLCmdUpdateBackStencil();
        instructions.add(instruction);     
      }
    }      
  }

  private applyToFront(mask: MgStencilFaceFlagBits) : boolean {
    return ((mask & MgStencilFaceFlagBits.FRONT_BIT)
      == MgStencilFaceFlagBits.FRONT_BIT) as boolean;
  }

  private applyToBack(mask: MgStencilFaceFlagBits) : boolean {
    return ((mask & MgStencilFaceFlagBits.BACK_BIT)
      == MgStencilFaceFlagBits.BACK_BIT) as boolean;
  }

  // TODO: fix this issue
  setStencilCompareMask(
      pipeline: IWGLGraphicsPipeline| null
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter        
    , faceMask: MgStencilFaceFlagBits
    , compareMask: number
  ) : void {
    let frontChange: boolean = 
      this.applyToFront(faceMask);
    let backChange: boolean = 
      this.applyToBack(faceMask);

    if (backChange) {
      if (this.back.compareMask != compareMask) {
          this.back.invalidate();
          this.back.compareMask = compareMask;                    
      }
    }
    if (frontChange) {
      if (this.front.compareMask != compareMask) {
          this.front.invalidate();
          this.front.compareMask = compareMask;                    
      }
    }        
  }

  // TODO: fix this issue
  setStencilReference(
      pipeline: IWGLGraphicsPipeline| null
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter        
    , faceMask: MgStencilFaceFlagBits
    , reference: number
  ) : void {
    let frontChange: boolean = 
      this.applyToFront(faceMask);
    let backChange: boolean = 
      this.applyToBack(faceMask);

    if (backChange) {
      if (this.back.referenceMask != reference) {
          this.back.invalidate();
          this.back.referenceMask = reference;              
      }
    }
    if (frontChange) {
      if (this.front.referenceMask != reference) {
          this.front.invalidate();
          this.front.referenceMask = reference;
      }
    }
  }

  setStencilWriteMask(
      pipeline: IWGLGraphicsPipeline| null
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter        
    , faceMask: MgStencilFaceFlagBits
    , writeMask: number
  ) : void {
    let frontChange: boolean = 
      this.applyToFront(faceMask);
    let backChange: boolean = 
      this.applyToBack(faceMask);

    if (backChange) {
      this.back.writeMask = writeMask;                
    }
    if (frontChange) {
      this.front.writeMask = writeMask;                
    }      

    // ONLY if 
    // no pipeline has been set
    // OR pipeline ATTACHED and dynamic state has been set
    if
    (
      (pipeline == null)
      ||
      (pipeline != null
        &&
        (
          (pipeline.dynamicStates &
            WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_WRITE_MASK
          )
          == WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_WRITE_MASK
        )
      )
    )
    {
      if (frontChange && backChange) {
          let stencilWrite = new WGLCmdPipelineStencilWriteInfo();
          stencilWrite.face = MgStencilFaceFlagBits.FRONT_AND_BACK;
          stencilWrite.writeMask = writeMask;

          let nextIndex = bag.stencilWrites.push(stencilWrite);

          let instruction = new WGLCmdEncodingInstruction();
          instruction.category = WGLCmdEncoderCategory.GRAPHICS;
          instruction.index = nextIndex,
          instruction.operation = new WGLCmdSetStencilWrite();
          instructions.add(instruction);
      }
      else if (backChange) {
          let stencilWrite = new WGLCmdPipelineStencilWriteInfo();
          stencilWrite.face = MgStencilFaceFlagBits.BACK_BIT;
          stencilWrite.writeMask = writeMask;

          let nextIndex = bag.stencilWrites.push(stencilWrite);

          let instruction = new WGLCmdEncodingInstruction();
          instruction.category = WGLCmdEncoderCategory.GRAPHICS;
          instruction.index = nextIndex,
          instruction.operation = new WGLCmdSetStencilWrite();
          instructions.add(instruction);
      }
      else if (frontChange) {
          let stencilWrite = new WGLCmdPipelineStencilWriteInfo();
          stencilWrite.face = MgStencilFaceFlagBits.FRONT_BIT;
          stencilWrite.writeMask = writeMask;

          let nextIndex = bag.stencilWrites.push(stencilWrite);

          let instruction = new WGLCmdEncodingInstruction();
          instruction.category = WGLCmdEncoderCategory.GRAPHICS;
          instruction.index = nextIndex,
          instruction.operation = new WGLCmdSetStencilWrite();
          instructions.add(instruction);          
      }
    }
  }
}

class WGLCmdSetStencilWrite implements WGLCmdAction {
  action(
    arg1: WGLCmdCommandRecording
    , arg2: number
  ) : void {

    let context = arg1.graphics;
    if (context == null)
      return;

    let grid = context.grid;
    if (grid == null)
      return;

    let items = grid.stencilWrites;
    if (items == null)
      return; 

    let writeInfo = items[arg2];
    if (writeInfo == null)
      return; 

    let renderer = context.stateRenderer;
    if (renderer == null)
      return;    

    renderer.updateStencilWriteMask(writeInfo);
  }   
}

class WGLCmdUpdateBothStencils implements WGLCmdAction {
  action(
    arg1: WGLCmdCommandRecording
    , arg2: number
  ) : void {

    let context = arg1.graphics;
    if (context == null)
      return;

    let grid = context.grid;
    if (grid == null)
      return;

    let items = grid.stencilFunctions;
    if (items == null)
      return; 

    let item = items[arg2];
    if (item == null)
      return; 

    let renderer = context.stateRenderer;
    if (renderer == null)
      return;    

    renderer.updateBothStencils(item);
  }  
}

class WGLCmdUpdateBackStencil implements WGLCmdAction {
  action(
    arg1: WGLCmdCommandRecording
    , arg2: number
  ) : void {

    let context = arg1.graphics;
    if (context == null)
      return;

    let grid = context.grid;
    if (grid == null)
      return;

    let items = grid.stencilFunctions;
    if (items == null)
      return; 

    let item = items[arg2];
    if (item == null)
      return; 

    let renderer = context.stateRenderer;
    if (renderer == null)
      return;    

    renderer.updateBackStencil(item);
  }      
}  

class WGLCmdUpdateFrontStencil implements WGLCmdAction {
  action(
    arg1: WGLCmdCommandRecording
    , arg2: number
  ) : void {

    let context = arg1.graphics;
    if (context == null)
      return;

    let grid = context.grid;
    if (grid == null)
      return;

    let items = grid.stencilFunctions;
    if (items == null)
      return; 

    let item = items[arg2];
    if (item == null)
      return; 

    let renderer = context.stateRenderer;
    if (renderer == null)
      return;    

    renderer.updateFrontStencil(item);
  }      
}    
