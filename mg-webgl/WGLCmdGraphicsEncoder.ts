namespace Magnesium {
  export class WGLCmdGraphicsEncoder implements IWGLCmdGraphicsEncoder {
    private mInstructions: WGLCmdEncoderContextSorter;
    private mBag: WGLCmdGraphicsBag;
    private mVertexArray: IWGLCmdVertexArrayEntrypoint;
    private mDSBinder: IWGLDescriptorSetBinder;

    private mCurrentPipeline : IWGLGraphicsPipeline|null;
    private mBoundRenderPass: WGLCmdBeginRenderpassRecord|null;
    private mBoundIndexBuffer: GLCmdIndexBufferParameter;

    private mDepthBias: WGLCmdDepthBiasEncodingSection;
    private mBlendConstants: WGLCmdBlendConstantsEncodingSection;
    private mScissors: WGLCmdScissorEncodingSection;
    private mViewports: WGLCmdViewportEncodingSection;
    private mStencil: WGLCmdStencilSection;

    constructor(
      sorter: WGLCmdEncoderContextSorter
      , bag: WGLCmdGraphicsBag
      , vertexArray: IWGLCmdVertexArrayEntrypoint
      , dsBinder: IWGLDescriptorSetBinder
    ) {
      this.mInstructions = sorter;
      this.mBag = bag;
      this.mVertexArray = vertexArray;
      this.mDSBinder = dsBinder;

      this.mDepthBias = new WGLCmdDepthBiasEncodingSection();
      this.mBlendConstants = new WGLCmdBlendConstantsEncodingSection();
      this.mScissors = new WGLCmdScissorEncodingSection();
      this.mViewports = new WGLCmdViewportEncodingSection();
      this.mStencil = new WGLCmdStencilSection();
    }


    clear(): void {
      this.mDepthBias.clear();
      this.mBlendConstants.clear();
      this.mScissors.clear();
      this.mViewports.clear();
      this.mStencil.clear();

      this.invalidateDescriptorSets();
      this.mDSBinder.clear();
    }

    asGrid() : WGLCmdGraphicsGrid {
      let result = new WGLCmdGraphicsGrid();
      result.renderpasses = this.mBag.renderpasses.toArray();
      result.pipelines = this.mBag.pipelines.toArray();
      result.stencilWrites = this.mBag.stencilWrites.toArray();
      result.viewports = this.mBag.viewports.toArray();
      result.blendConstants = this.mBag.blendConstants.toArray();
      result.depthBias = this.mBag.depthBias.toArray();
      //result.depthBounds = this.mBag.depthBounds.toArray();
      //result.lineWidths = this.mBag.lineWidths.toArray();
      result.scissors = this.mBag.scissors.toArray();
      result.drawIndexedIndirects = this.mBag.drawIndexedIndirects.toArray();
      result.drawIndexeds = this.mBag.drawIndexeds.toArray();
      result.drawIndirects = this.mBag.drawIndirects.toArray();
      result.draws = this.mBag.draws.toArray();
      result.stencilFunctions = this.mBag.stencilFunctions.toArray();
      result.vertexArrays = this.mBag.vertexArrays.toArray();
      result.descriptorSets = this.mBag.descriptorSets.toArray();          
      return result;
    }    

    private storeDrawCommand(): boolean {
      if (this.mCurrentPipeline == null) {
          return false;
      }

      if (this.mBoundRenderPass == null) {
          throw new Error("Command must be made inside a Renderpass. ");
      }      

      this.pushVertexArrayIfRequired();

      this.mStencil.pushStencilValuesIfRequired(
        this.mCurrentPipeline
        , this.mBag
        , this.mInstructions
      );

      // if descriptor sets is missing, generate new one
      this.pushBackDescriptorSetIfRequired();      

      return true;
    }

    private pushVertexArrayIfRequired() : void {

    }

    private pushBackDescriptorSetIfRequired() : void {
      
    } 

    bindPipeline(
      pipeline: IMgPipeline
    ) : void {
      this.mCurrentPipeline = pipeline as IWGLGraphicsPipeline|null;

      if (this.mCurrentPipeline == null)
        return;

      let glPipeline = pipeline as IWGLGraphicsPipeline;

      let pipelineInfo = this.initializePipelineInfo(); 
      let nextIndex = this.mBag.pipelines.push(pipelineInfo);

      let instruction = new WGLCmdEncodingInstruction();
      instruction.category = WGLCmdEncoderCategory.GRAPHICS;
      instruction.index = nextIndex;
      instruction.operation = new WGLCmdBindPipeline();

      if (this.mBoundRenderPass != null) {
          this.mInstructions.add(instruction);
      }
    }

    private initializePipelineInfo() : GLCmdBoundPipelineRecordInfo
    {
      let pipeline = this.mCurrentPipeline as IWGLGraphicsPipeline;

      // ONLY if pipeline ATTACHED and dynamic state has been set
      let frontReference = pipeline.front.reference;
      let backReference = pipeline.back.reference;

      if (
        (
          pipeline.dynamicsStates & GLGraphicsPipelineDynamicStateFlagBits.STENCIL_REFERENCE
        )
        == GLGraphicsPipelineDynamicStateFlagBits.STENCIL_REFERENCE
      ) {
        frontReference = this.mStencil.front.referenceMask;
        backReference = this.mStencil.back.referenceMask;
      }

      let backCompare = pipeline.back.compareMask;
      let frontCompare = pipeline.front.compareMask;

      if (
        (
          pipeline.dynamicsStates & GLGraphicsPipelineDynamicStateFlagBits.STENCIL_COMPARE_MASK
        )
        == GLGraphicsPipelineDynamicStateFlagBits.STENCIL_COMPARE_MASK
      ) {
        backCompare = this.mStencil.back.compareMask;
        frontCompare = this.mStencil.front.compareMask;
      }

      let backWriteMask = pipeline.back.writeMask;
      let frontWriteMask = pipeline.front.writeMask;

      if (
        (
          pipeline.dynamicsStates & GLGraphicsPipelineDynamicStateFlagBits.STENCIL_COMPARE_MASK
        )
        == GLGraphicsPipelineDynamicStateFlagBits.STENCIL_COMPARE_MASK
      ) {
        backWriteMask = this.mStencil.back.writeMask;
        frontWriteMask = this.mStencil.front.writeMask;
      }

      let info = new GLCmdBoundPipelineRecordInfo();        
      info.pipeline = pipeline;
      //info.lineWidth = FetchLineWidth(),
      info.blendConstants = this.mBlendConstants.fetch(pipeline);
      info.backStencilInfo = new WGLCmdStencilFunctionInfo();
      info.backStencilInfo.referenceMask = backReference;
      info.backStencilInfo.compareMask = backReference;
      info.backStencilInfo.stencilFunction = pipeline.stencilState.backStencilFunction;      

      info.frontStencilInfo = new WGLCmdStencilFunctionInfo(); 
      info.frontStencilInfo.referenceMask = frontReference;
      info.frontStencilInfo.compareMask = frontCompare;
      info.frontStencilInfo.stencilFunction = pipeline.stencilState.frontStencilFunction;

      info.depthBias = this.mDepthBias.fetch(pipeline);
     // info.depthBounds = this.mDepthBounds.fetch(pipeline);
      info.scissors = this.mScissors.fetch(pipeline);
      info.viewports = this.mViewports.fetch(pipeline);
      info.backStencilWriteMask = backWriteMask;
      info.frontStencilWriteMask = frontWriteMask;  
      return info;      
    }

		setStencilCompareMask(
      faceMask: MgStencilFaceFlagBits
      , compareMask: number
    ) : void {
      this.mStencil.setStencilCompareMask(
        this.mCurrentPipeline
        , this.mBag
        , this.mInstructions
        , faceMask
        , compareMask
      );
    }
		setStencilWriteMask(
      faceMask: MgStencilFaceFlagBits
      , writeMask: number
    ) : void {
      this.mStencil.setStencilWriteMask(
        this.mCurrentPipeline
        , this.mBag
        , this.mInstructions
        , faceMask
        , writeMask
      );
    }

		setStencilReference(
      faceMask: MgStencilFaceFlagBits
      , reference: number
    ) : void {
      this.mStencil.setStencilReference(
        this.mCurrentPipeline
        , this.mBag
        , this.mInstructions
        , faceMask
        , reference
      );
    }

    setDepthBias(
      depthBiasConstantFactor: number
      , depthBiasClamp: number
      , depthBiasSlopeFactor: number
    ) : void {
      this.mDepthBias.set(
        this.mCurrentPipeline
        , this.mBag
        , this.mInstructions
        , depthBiasConstantFactor
        , depthBiasClamp
        , depthBiasSlopeFactor
      );
    }    

    setBlendConstants(
      blendConstants: MgColor4f
    ) : void {
      this.mBlendConstants.set(
        this.mCurrentPipeline
        , this.mBag
        , this.mInstructions
        , blendConstants
      );
    }

		setScissor(
      firstScissor: number
      , pScissors: Array<MgRect2D>
    ) : void {
      this.mScissors.set(
        this.mCurrentPipeline
        , this.mBag
        , this.mInstructions
        , firstScissor
        , pScissors
      );
    }

    draw(vertexCount: number
      , instanceCount: number
      , firstVertex: number
      , firstInstance: number
    ) :void {

      if (this.storeDrawCommand()) {
        let draw = new WGLCmdInternalDraw();

        let pipeline = this.mCurrentPipeline as IWGLGraphicsPipeline;
        draw.topology = pipeline.topology;
        draw.vertexCount = vertexCount;
        draw.instanceCount = instanceCount;
        draw.firstVertex = firstVertex;
        // ALWAYS draw.firstInstance = 0;

        let nextIndex = this.mBag.draws.push(draw);

        let encoding = new WGLCmdEncodingInstruction();
        encoding.category = WGLCmdEncoderCategory.GRAPHICS;
        encoding.index = nextIndex;
        encoding.operation = new WGLCmdDraw();

        this.mInstructions.add(encoding);
      }
    }

    drawIndexed(
      indexCount: number
      , instanceCount: number
      , firstIndex: number
      , vertexOffset: number
      , firstInstance: number
    ): void {
      if (this.storeDrawCommand()) {
        let draw = new GLCmdInternalDrawIndexed();

        let pipeline = this.mCurrentPipeline as IWGLGraphicsPipeline;
        draw.topology = pipeline.topology;
        draw.indexType = this.mBoundIndexBuffer.indexType;
        draw.indexCount = indexCount;
        draw.instanceCount = instanceCount;
        draw.firstIndex = firstIndex;
        draw.vertexOffset = vertexOffset;
        draw.firstInstance = firstInstance;
        // ALWAYS draw.firstInstance = 0;

        let nextIndex = this.mBag.drawIndexeds.push(draw);

        let encoding = new WGLCmdEncodingInstruction();
        encoding.category = WGLCmdEncoderCategory.GRAPHICS;
        encoding.index = nextIndex;
        encoding.operation = new WGLCmdDraw();

        this.mInstructions.add(encoding);
      }
    }
  }

  class WGLCmdBindPipeline implements WGLCmdAction {
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

      let items = grid.pipelines;
      if (items == null)
        return; 

      let pipelineInfo = items[arg2];
      if (pipelineInfo == null)
        return; 

      let renderer = context.stateRenderer;
      if (renderer == null)
        return;    

      renderer.bindPipeline(pipelineInfo);
    }
  }

  class WGLCmdDraw implements WGLCmdAction {
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

      let items = grid.draws;
      if (items == null)
        return; 

      let draw = items[arg2];
      if (draw == null)
        return; 

      let renderer = context.stateRenderer;
      if (renderer == null)
        return;       

      renderer.draw(draw);
    }
  }    
}