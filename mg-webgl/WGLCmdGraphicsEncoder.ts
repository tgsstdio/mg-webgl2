namespace Magnesium {
  export class WGLCmdGraphicsEncoder implements IWGLCmdGraphicsEncoder {
    private mInstructions: WGLCmdEncoderContextSorter;
    private mBag: WGLCmdGraphicsBag;

    private mCurrentPipeline : IWGLGraphicsPipeline|null;

    private mDepthBias: WGLCmdDepthBiasEncodingSection;
    private mBlendConstants: WGLCmdBlendConstantsEncodingSection;
    private mScissors: WGLCmdScissorEncodingSection;
    private mViewports: WGLCmdViewportEncodingSection;
    private mStencil: WGLCmdStencilEncodingSection;
    private mDescriptorSets: IWGLCmdDescriptorSetEncodingSection;
    private mRenderPasses: WGLCmdRenderpassEncodingSection;
    private mVertexArrays: IWGLCmdVertexArrayEncodingSection;

    constructor(
      instructions: WGLCmdEncoderContextSorter
      , bag: WGLCmdGraphicsBag
      , descriptorSets: IWGLCmdDescriptorSetEncodingSection
      , vertexArrays: IWGLCmdVertexArrayEncodingSection
    ) {
      this.mInstructions = instructions;
      this.mBag = bag;
      this.mDescriptorSets = descriptorSets;
      this.mVertexArrays = vertexArrays;

      this.mDepthBias = new WGLCmdDepthBiasEncodingSection();
      this.mBlendConstants = new WGLCmdBlendConstantsEncodingSection();
      this.mScissors = new WGLCmdScissorEncodingSection();
      this.mViewports = new WGLCmdViewportEncodingSection();
      this.mStencil = new WGLCmdStencilEncodingSection();
      this.mRenderPasses = new WGLCmdRenderpassEncodingSection();
    }

    clear(): void {
      this.mDepthBias.clear();
      this.mBlendConstants.clear();
      this.mScissors.clear();
      this.mViewports.clear();
      this.mStencil.clear();

      this.mRenderPasses.clear();

      this.mDescriptorSets.clear();

      this.mVertexArrays.clear();
    }

    asGrid() : WGLCmdGraphicsGrid {
      let result = new WGLCmdGraphicsGrid();
      result.renderPasses = this.mBag.renderPasses.toArray();
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

      if (!this.mRenderPasses.isBound()) {
          throw new Error("Command must be made inside a Renderpass. ");
      }      

      this.mVertexArrays.pushIfRequired(
        this.mCurrentPipeline
        , this.mBag
        , this.mInstructions
      );

      this.mStencil.pushIfRequired(
        this.mCurrentPipeline
        , this.mBag
        , this.mInstructions
      );

      // if descriptor sets is missing, generate new one
      this.mDescriptorSets.pushIfRequired(
        this.mCurrentPipeline
        , this.mBag
        , this.mInstructions        
      ); // pushBackDescriptorSetIfRequired();      

      return true;
    }

    bindVertexBuffers(
      firstBinding: number
      , pBuffers: Array<IMgBuffer>
      , pOffsets: Array<number>
    ) {
      this.mVertexArrays.bindVertexBuffers(
        firstBinding
      , pBuffers
      , pOffsets
      );
    }    

		bindIndexBuffer(
      buffer: IMgBuffer
      , offset: number
      , indexType: MgIndexType
    ) : void {
      this.mVertexArrays.bindIndexBuffer(
        buffer
      , offset
      , indexType
      );
    }

		beginRenderPass(
      pRenderPassBegin: MgRenderPassBeginInfo
      , contents: MgSubpassContents
    ) : void {
      this.mRenderPasses.begin(
        this.mBag
        , this.mInstructions
        , pRenderPassBegin
        , contents
      );
    }

    nextSubpass(
      contents:MgSubpassContents
    ): void {
      // TODO : figure this out
    }

    endRenderPass() : void {
      this.mRenderPasses.clear();
    }

    bindPipeline(
      pipeline: IMgPipeline|null
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

      if (this.mRenderPasses.isBound()) {
          this.mInstructions.add(instruction);
      }
    }

		bindDescriptorSets(
      layout: IMgPipelineLayout
      , firstSet: number
      , descriptorSetCount: number
      , pDescriptorSets: Array<IMgDescriptorSet>
      , pDynamicOffsets: Array<number>|null
    ) : void {
      this.mDescriptorSets.bind(
        layout
        , firstSet
        , descriptorSetCount
        , pDescriptorSets
        , pDynamicOffsets
      );
    }

    private initializePipelineInfo() : WGLCmdBoundPipelineRecordInfo
    {
      let pipeline = this.mCurrentPipeline as IWGLGraphicsPipeline;

      // ONLY if pipeline ATTACHED and dynamic state has been set
      let frontReference = pipeline.front.reference;
      let backReference = pipeline.back.reference;

      if (
        (
          pipeline.dynamicStates & WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_REFERENCE
        )
        == WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_REFERENCE
      ) {
        frontReference = this.mStencil.front.referenceMask;
        backReference = this.mStencil.back.referenceMask;
      }

      let backCompare = pipeline.back.compareMask;
      let frontCompare = pipeline.front.compareMask;

      if (
        (
          pipeline.dynamicStates & WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_COMPARE_MASK
        )
        == WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_COMPARE_MASK
      ) {
        backCompare = this.mStencil.back.compareMask;
        frontCompare = this.mStencil.front.compareMask;
      }

      let backWriteMask = pipeline.back.writeMask;
      let frontWriteMask = pipeline.front.writeMask;

      if (
        (
          pipeline.dynamicStates & WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_COMPARE_MASK
        )
        == WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_COMPARE_MASK
      ) {
        backWriteMask = this.mStencil.back.writeMask;
        frontWriteMask = this.mStencil.front.writeMask;
      }

      let info = new WGLCmdBoundPipelineRecordInfo();        
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

		setViewport(
      firstViewport: number
      , pViewports: Array<MgViewport>
    ) : void {
      this.mViewports.set(
        this.mCurrentPipeline
        , this.mBag
        , this.mInstructions
        , firstViewport
        , pViewports
      );
    }    

    draw(vertexCount: number
      , instanceCount: number
      , firstVertex: number
      , firstInstance: number
    ) :void {
      if (this.mCurrentPipeline == null) {
          return;
      }

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
      if (this.mCurrentPipeline == null) {
          return;
      }

      if (this.mVertexArrays.boundIndexBuffer == null)
        return;

      if (this.storeDrawCommand()) {
        let draw = new GLCmdInternalDrawIndexed();

        let pipeline = this.mCurrentPipeline as IWGLGraphicsPipeline;
        draw.topology = pipeline.topology;
        draw.indexType = this.mVertexArrays.boundIndexBuffer.indexType;
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
        encoding.operation = new WGLCmdDrawIndexed();

        this.mInstructions.add(encoding);
      }
    }

    drawIndexedIndirect(
      buffer: IMgBuffer
      , offset: number
      , drawCount: number
      , stride: number
    ): void {
      if (buffer == null)
        throw new Error("buffer is null");

      if (this.mCurrentPipeline == null) {
          return;
      }

      if (this.mVertexArrays.boundIndexBuffer == null)
        return;      

      if (this.storeDrawCommand()) {
        let pipeline = this.mCurrentPipeline;

        let indirect = null;

        let draw = new GLCmdInternalDrawIndexedIndirect();
        draw.indirect = indirect;
        draw.topology = pipeline.topology;
        draw.indexType = this.mVertexArrays.boundIndexBuffer.indexType;
        draw.drawCount = drawCount;
        draw.stride = stride;

        // ALWAYS draw.firstInstance = 0;

        let nextIndex = this.mBag.drawIndexedIndirects.push(draw);

        let encoding = new WGLCmdEncodingInstruction();
        encoding.category = WGLCmdEncoderCategory.GRAPHICS;
        encoding.index = nextIndex;
        encoding.operation = new WGLCmdDrawIndexedIndirect();

        this.mInstructions.add(encoding);
      }
    }    

    drawIndirect(
      buffer: IMgBuffer
      , offset: number
      , drawCount: number
      , stride: number
    ) : void {
      if (buffer == null)
        throw new Error("buffer is null");

      if (this.mCurrentPipeline == null) {
          return;
      }

      if (this.storeDrawCommand())  {
        let indirect = null; //IntPtr.Add(glBuffer.Source, (int) offset);

        let draw = new GLCmdInternalDrawIndirect();
          
        draw.topology = this.mCurrentPipeline.topology,
        draw.indirect = indirect;
        draw.drawCount = drawCount;
        draw.stride = stride;            

        let nextIndex = this.mBag.drawIndirects.push(draw);

        let encoding = new WGLCmdEncodingInstruction();
        encoding.category = WGLCmdEncoderCategory.GRAPHICS;
        encoding.index = nextIndex;
        encoding.operation = new WGLCmdDrawIndirect();

        this.mInstructions.add(encoding);
      }
    }    
  }

  class WGLCmdBindPipeline implements WGLCmdAction {
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

  class WGLCmdDrawIndirect implements WGLCmdAction {
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

      let items = grid.drawIndirects;
      if (items == null)
        return; 

      let draw = items[arg2];
      if (draw == null)
        return; 

      let renderer = context.stateRenderer;
      if (renderer == null)
        return;       

      renderer.drawIndirect(draw);
    }
  }    

  class WGLCmdDraw implements WGLCmdAction {
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

  class WGLCmdDrawIndexed implements WGLCmdAction {
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

      let items = grid.drawIndexeds;
      if (items == null)
        return; 

      let draw = items[arg2];
      if (draw == null)
        return; 

      let renderer = context.stateRenderer;
      if (renderer == null)
        return;       

      renderer.drawIndexed(draw);
    }
  }   

  class WGLCmdDrawIndexedIndirect implements WGLCmdAction {
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

      let items = grid.drawIndexedIndirects;
      if (items == null)
        return; 

      let drawIndexedIndirect = items[arg2];
      if (drawIndexedIndirect == null)
        return; 

      let renderer = context.stateRenderer;
      if (renderer == null)
        return;       

      renderer.drawIndexedIndirect(drawIndexedIndirect);
    }
  }    
}