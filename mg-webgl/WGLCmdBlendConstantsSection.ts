namespace Magnesium {
  export class WGLCmdBlendConstantsSection {
    private mBlendConstants: MgColor4f;
    clear() {
      this.mBlendConstants = new MgColor4f(0,0,0,0);
    }

    fetch(
      pipeline: IWGLGraphicsPipeline      
    ) : MgColor4f {
      let blendConstants = pipeline.blendConstants;
      if (
          (pipeline.dynamicsStates & GLGraphicsPipelineDynamicStateFlagBits.BLEND_CONSTANTS)
              == GLGraphicsPipelineDynamicStateFlagBits.BLEND_CONSTANTS
          )
      {
          blendConstants = this.mBlendConstants;
      }

      return blendConstants;
    }

    set(
      pipeline: IWGLGraphicsPipeline|null
      , bag: WGLCmdGraphicsBag
      , instructions: WGLCmdEncoderContextSorter
      , blendConstants: MgColor4f
    ) : void {
        this.mBlendConstants = blendConstants;
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
                    (pipeline.dynamicsStates & GLGraphicsPipelineDynamicStateFlagBits.BLEND_CONSTANTS)
                        == GLGraphicsPipelineDynamicStateFlagBits.BLEND_CONSTANTS
                )
            )
        )
        {
            let nextIndex = bag.blendConstants.push(this.mBlendConstants);

            let instruction = new WGLCmdEncodingInstruction();
            instruction.category = WGLCmdEncoderCategory.GRAPHICS;
            instruction.index = nextIndex;
            instruction.operation = new WGLCmdSetBlendConstants();           

            instructions.add(instruction);
        }
    }

  }

  class WGLCmdSetBlendConstants implements WGLCmdAction {
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

      let items = grid.blendConstants;
      if (items == null)
        return; 

      let blends = items[arg2];
      if (blends == null)
        return; 

      let renderer = context.stateRenderer;
      if (renderer == null)
        return;       

      renderer.updateBlendConstants(blends);
    }  
}