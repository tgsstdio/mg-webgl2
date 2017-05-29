namespace Magnesium {
  export class WGLCmdViewportEncodingSection {
    private mPastViewports: WGLCmdViewportParameter;
    constructor() {
      this.mPastViewports = new WGLCmdViewportParameter();
    }

    clear() {
      this.mPastViewports.clear();
    }

    fetch(
      pipeline: IWGLGraphicsPipeline
    ) : WGLCmdViewportParameter {
        let viewports = pipeline.viewports;
        if (
            (pipeline.dynamicsStates & GLGraphicsPipelineDynamicStateFlagBits.VIEWPORT)
                == GLGraphicsPipelineDynamicStateFlagBits.VIEWPORT
        )
        {
            viewports = this.mPastViewports;
        }

        return viewports;
    }

    set(      
       pipeline: IWGLGraphicsPipeline| null
      , bag: WGLCmdGraphicsBag
      , instructions: WGLCmdEncoderContextSorter       
      , firstScissor:number
      , pScissors: Array<MgViewport>
    ): void {
      if (firstScissor == 0 && pScissors.length >= 1) {
        let first = pScissors[0];
        this.mPastViewports.first = firstScissor;
        this.mPastViewports.x = first.x;
        this.mPastViewports.y = first.y;
        this.mPastViewports.width = first.width;
        this.mPastViewports.height = first.height;
        this.mPastViewports.zNear = first.minDepth;
        this.mPastViewports.height = first.maxDepth;        
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
            (
              pipeline.dynamicsStates 
              & GLGraphicsPipelineDynamicStateFlagBits.VIEWPORT
            )
            == GLGraphicsPipelineDynamicStateFlagBits.VIEWPORT
          )
        )
      )
      {
        var nextIndex = bag.viewports.push(this.mPastViewports);

        let instruction = new WGLCmdEncodingInstruction();           
        instruction.category = WGLCmdEncoderCategory.GRAPHICS;
        instruction.index = nextIndex,
        instruction.operation = new WGLCmdSetViewport();  

        instructions.add(instruction);
      }
    }
  }

  class WGLCmdSetViewport implements WGLCmdAction {
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

      let items = grid.viewports;
      if (items == null)
        return; 

      let viewport = items[arg2];
      if (viewport == null)
        return; 

      let renderer = context.stateRenderer;
      if (renderer == null)
        return;    

      renderer.updateViewports(viewport);
    } 
  }
}