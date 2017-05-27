namespace Magnesium {
  export class WGLCmdDepthBiasSection {    
    private mDepthBiasConstantFactor: number;
    private mDepthBiasClamp: number;
    private mDepthBiasSlopeFactor: number;

    clear() {
      this.mDepthBiasClamp = 0;
      this.mDepthBiasSlopeFactor = 0;
      this.mDepthBiasConstantFactor = 0;
    }

    fetch(
      pipeline: IWGLGraphicsPipeline
      ) : GLCmdDepthBiasParameter {    
      let depthBias = new GLCmdDepthBiasParameter();
      depthBias.depthBiasClamp = pipeline.depthBiasClamp;
      depthBias.depthBiasConstantFactor = pipeline.depthBiasConstantFactor;
      depthBias.depthBiasSlopeFactor = pipeline.depthBiasSlopeFactor;
      
      if (
        (
          pipeline.dynamicsStates & GLGraphicsPipelineDynamicStateFlagBits.DEPTH_BIAS
        )
        == GLGraphicsPipelineDynamicStateFlagBits.DEPTH_BIAS
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
                  pipeline.dynamicsStates
                  & GLGraphicsPipelineDynamicStateFlagBits.DEPTH_BIAS
                )
                == GLGraphicsPipelineDynamicStateFlagBits.DEPTH_BIAS
            )
          )
      )
      {
          let bias = new GLCmdDepthBiasParameter();
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
      arg1: GLCmdCommandRecording
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
}