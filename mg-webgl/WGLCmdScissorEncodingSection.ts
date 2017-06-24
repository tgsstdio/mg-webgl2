import {WGLCmdScissorParameter}
	from './WGLCmdScissorParameter';	
import {IWGLGraphicsPipeline}
	from './IWGLGraphicsPipeline';	
import {WGLGraphicsPipelineDynamicStateFlagBits}
	from './WGLGraphicsPipelineDynamicStateFlagBits';	
import {WGLCmdGraphicsBag}
	from './WGLCmdGraphicsBag';	
import {WGLCmdEncoderContextSorter}
	from './WGLCmdEncoderContextSorter';	      
import {WGLCmdEncodingInstruction}
	from './WGLCmdEncodingInstruction';	
import {WGLCmdEncoderCategory}
	from './WGLCmdEncoderCategory';	 
import {MgRect2D}
	from '../mg/MgRect2D';      
import {WGLCmdAction}
	from './WGLCmdAction';	 
import {WGLCmdCommandRecording}
	from './WGLCmdCommandRecording';	     

export class WGLCmdScissorEncodingSection {
  private mPastScissors: WGLCmdScissorParameter;
  constructor() {
    this.mPastScissors = new WGLCmdScissorParameter();
  }

  clear() : void {
    this.mPastScissors.clear();
  }

  fetch(
    pipeline: IWGLGraphicsPipeline
  ) : WGLCmdScissorParameter {
    let scissors = pipeline.scissors;
      if (
          (pipeline.dynamicStates & WGLGraphicsPipelineDynamicStateFlagBits.SCISSOR)
              == WGLGraphicsPipelineDynamicStateFlagBits.SCISSOR
      )
      {
          scissors = this.mPastScissors;
      }

      return scissors;
  }


  set(      
      pipeline: IWGLGraphicsPipeline| null
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter       
    , firstScissor:number
    , pScissors: Array<MgRect2D>
  ): void {
      if (firstScissor == 0 && pScissors.length >= 1) { 
        let first = pScissors[0];

        this.mPastScissors.first = firstScissor;
        this.mPastScissors.x = first.offset.x;
        this.mPastScissors.y = first.offset.y;
        this.mPastScissors.width = first.extent.width;
        this.mPastScissors.height = first.extent.height;
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
                  (pipeline.dynamicStates & WGLGraphicsPipelineDynamicStateFlagBits.SCISSOR)
                      == WGLGraphicsPipelineDynamicStateFlagBits.SCISSOR
              )
          )
      )
      {
          let nextIndex = bag.scissors.push(this.mPastScissors);

          let instruction = new WGLCmdEncodingInstruction();           
          instruction.category = WGLCmdEncoderCategory.GRAPHICS;
          instruction.index = nextIndex,
          instruction.operation = new WGLCmdSetScissor();  

          instructions.add(instruction);
      }
  }    
}

class WGLCmdSetScissor implements WGLCmdAction {
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

    let items = grid.scissors;
    if (items == null)
      return; 

    let scissor = items[arg2];
    if (scissor == null)
      return; 

    let renderer = context.stateRenderer;
    if (renderer == null)
      return;    

    renderer.updateScissors(scissor);
  }
}
