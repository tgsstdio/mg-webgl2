import {IWGLGraphicsPipeline}
	from './IWGLGraphicsPipeline';	
import {WGLCmdDepthBiasParameter}
	from './WGLCmdDepthBiasParameter';	
import {WGLGraphicsPipelineDynamicStateFlagBits}
	from './WGLGraphicsPipelineDynamicStateFlagBits';	
import {WGLCmdGraphicsBag}
	from './WGLCmdGraphicsBag';	    
import {WGLCmdEncoderContextSorter}
	from './WGLCmdEncoderContextSorter';	 
import {WGLCmdEncodingInstruction}
	from './WGLCmdEncodingInstruction';
import {WGLCmdCommandRecording}
	from './WGLCmdCommandRecording';	   
import {WGLCmdEncoderCategory}
	from './WGLCmdEncoderCategory';  
import {WGLCmdAction}
	from './WGLCmdAction';	    

export class WGLCmdDepthBiasEncodingSection {    
  private mDepthBiasConstantFactor: number;
  private mDepthBiasClamp: number;
  private mDepthBiasSlopeFactor: number;
  constructor() {
    this.clear();
  }

  clear() {
    this.mDepthBiasClamp = 0;
    this.mDepthBiasSlopeFactor = 0;
    this.mDepthBiasConstantFactor = 0;
  }

  fetch(
    pipeline: IWGLGraphicsPipeline
    ) : WGLCmdDepthBiasParameter {    
    let depthBias = new WGLCmdDepthBiasParameter();
    depthBias.depthBiasClamp = pipeline.depthBiasClamp;
    depthBias.depthBiasConstantFactor = pipeline.depthBiasConstantFactor;
    depthBias.depthBiasSlopeFactor = pipeline.depthBiasSlopeFactor;
    
    if (
      (
        pipeline.dynamicStates & WGLGraphicsPipelineDynamicStateFlagBits.DEPTH_BIAS
      )
      == WGLGraphicsPipelineDynamicStateFlagBits.DEPTH_BIAS
    ) {
      depthBias.depthBiasClamp = this.mDepthBiasClamp;
      depthBias.depthBiasConstantFactor = this.mDepthBiasConstantFactor;
      depthBias.depthBiasSlopeFactor = this.mDepthBiasSlopeFactor;
    }
    return depthBias;
  }

  set(
    pipeline: IWGLGraphicsPipeline| null
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter
    , depthBiasConstantFactor: number
    , depthBiasClamp: number
    , depthBiasSlopeFactor: number
  ) : void {
    this.mDepthBiasConstantFactor = depthBiasConstantFactor;
    this.mDepthBiasClamp = depthBiasClamp;
    this.mDepthBiasSlopeFactor = depthBiasSlopeFactor;

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
              (
                pipeline.dynamicStates
                & WGLGraphicsPipelineDynamicStateFlagBits.DEPTH_BIAS
              )
              == WGLGraphicsPipelineDynamicStateFlagBits.DEPTH_BIAS
          )
        )
    )
    {
        let bias = new WGLCmdDepthBiasParameter();
        bias.depthBiasClamp = this.mDepthBiasClamp;
        bias.depthBiasConstantFactor = this.mDepthBiasConstantFactor;
        bias.depthBiasSlopeFactor = this.mDepthBiasSlopeFactor;            

        let nextIndex = bag.depthBias.push(bias);

        let instruction = new WGLCmdEncodingInstruction();           
        instruction.category = WGLCmdEncoderCategory.GRAPHICS;
        instruction.index = nextIndex,
        instruction.operation = new WGLCmdSetDepthBias();            

        instructions.add(instruction);
    }      
  }    
}

class WGLCmdSetDepthBias implements WGLCmdAction {
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

    let items = grid.depthBias;
    if (items == null)
      return; 

    let bias = items[arg2];
    if (bias == null)
      return; 

    let renderer = context.stateRenderer;
    if (renderer == null)
      return;    

    renderer.updateDepthBias(bias);
  }     

}    
