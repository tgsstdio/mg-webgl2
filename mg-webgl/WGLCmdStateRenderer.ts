namespace Magnesium {
  export class WGLCmdStateRenderer implements IWGLCmdStateRenderer {
    
    private mPastColorBlendEnums: WGLGraphicsPipelineBlendColorState;
    private mBlend: IWGLCmdBlendEntrypoint;
    
    private mPastStencilInfo: WGLQueueRendererStencilState;    
    private mStencil: IWGLCmdStencilEntrypoint;

    private mPastFrontWriteMask: number;
    private mPastBackWriteMask: number;

    private mPastFrontStencilInfo: WGLCmdStencilFunctionInfo;
    private mPastBackStencilInfo: WGLCmdStencilFunctionInfo;

    private mDepth: IWGLCmdDepthEntrypoint;
    private mPastDepthState: WGLCmdDepthStatePipelineItem;

    private mPastRasterization: WGLRasterizerState;
    private mRaster: IWGLCmdRasterizationEntrypoint;        

    private mPastClearValues: WGLClearValueState;
    private mClear: IWGLCmdClearEntrypoint;

    private mScissor: IWGLCmdScissorsEntrypoint;
    private mPastViewport: WGLCmdViewportParameter|null;
    private mPastScissors: WGLCmdScissorParameter|null;

    private mPastBlendConstants: MgColor4f;

    private mGL : WebGL2RenderingContext;
    constructor(gl: WebGL2RenderingContext) {
      this.mGL = gl;
    }

    initialize() : void {
      const FLAGS = 0;      
      const NO_OF_COLOR_ATTACHMENTS = 4;
      this.mPastColorBlendEnums = this.mBlend.initialize (NO_OF_COLOR_ATTACHMENTS);

			let initialStencilValue = this.mStencil.initialize ();
			this.mPastStencilInfo = initialStencilValue;

      this.mPastFrontWriteMask = initialStencilValue.front.writeMask;
      this.mPastBackWriteMask = initialStencilValue.back.writeMask;  

      let frontStencil = new WGLCmdStencilFunctionInfo(); 
      frontStencil.compareMask
         = initialStencilValue.front.compareMask;
      frontStencil.referenceMask
         = initialStencilValue.front.reference;
      frontStencil.stencilFunction 
        = initialStencilValue.settings.frontStencilFunction;
      this.mPastFrontStencilInfo = frontStencil;   

      let backStencil = new WGLCmdStencilFunctionInfo(); 
      backStencil.compareMask
         = initialStencilValue.back.compareMask;
      backStencil.referenceMask
         = initialStencilValue.back.reference;
      backStencil.stencilFunction 
        = initialStencilValue.settings.backStencilFunction;
      this.mPastBackStencilInfo = backStencil;         

      let depthBufFunc = this.mDepth.initialize();
      this.mPastDepthState = new WGLCmdDepthStatePipelineItem();    
      this.mPastDepthState.depthBufferFunction = depthBufFunc;    
      this.mPastDepthState.flags = FLAGS;

      this.mPastRasterization = this.mRaster.initialize();

      this.mPastClearValues = this.mClear.initialize();

      this.mPastViewport = null;
      this.mPastScissors = null;

      this.mPastBlendConstants = new MgColor4f(0,0,0,0);
    }

    beginRenderpass(
      record: WGLCmdBeginRenderpassRecord
    ) : void{
      this.applyClearBuffers(record.clearState, record.bitmask);
    }

    bindPipeline(
      pipelineInfo: WGLCmdBoundPipelineRecordInfo
    ) : void {
      this.setupStatePipelineSettings(pipelineInfo);

      this.updateDynamicStates(pipelineInfo);      
    }

    private mCache: IWGLCmdShaderProgramCache;
    private setupStatePipelineSettings(pipelineInfo: WGLCmdBoundPipelineRecordInfo) : void
    {
        // Static pipeline stuff such as depth test enabled
        let pipeline = pipelineInfo.pipeline as IWGLGraphicsPipeline;

        this.mCache.setProgramID(
          MgPipelineBindPoint.GRAPHICS
          , pipeline.programID
          , pipeline.internalCache
          , pipeline.layout);              

        this.setupBlendSettings(pipeline);
        this.setupDepthSettings(pipeline);
        this.setupStencilSettings(pipeline);
        this.setupRasterizationSettings(pipeline);
    }

    private setupBlendSettings(pipeline: IWGLGraphicsPipeline) {
      if (this.changesFoundInBlend(pipeline.colorBlendEnums)) {
          this.applyBlendChanges(pipeline.colorBlendEnums);
          this.mPastColorBlendEnums = pipeline.colorBlendEnums;
      }
    }

    private changesFoundInBlend(
      next: WGLGraphicsPipelineBlendColorState
    ) : boolean {
      if (this.mPastColorBlendEnums == null && next != null) {
        return true;
      }

      if (this.mPastColorBlendEnums != null && next == null) {
        return false;
      }

      if (this.mPastColorBlendEnums.attachments.length != next.attachments.length) {
        return true;
      }

      if (this.mPastColorBlendEnums.logicOpEnable != next.logicOpEnable) {
        return true;
      }

      if (this.mPastColorBlendEnums.logicOp != next.logicOp) {
        return true;
      }

      for (let i = 0; i < next.attachments.length; i += 1) {
        if (
          !this.mPastColorBlendEnums.attachments[i].equals(next.attachments[i])
        ) {
            return true;
        }
      }

      return false;
    }    

    private applyBlendChanges(
      current: WGLGraphicsPipelineBlendColorState
    ) : void {
      if (
        this.mPastColorBlendEnums.logicOpEnable != current.logicOpEnable
        || this.mPastColorBlendEnums.logicOp != current.logicOp
      ) {
        this.mBlend.enableLogicOp(current.logicOpEnable);
        this.mBlend.logicOp(current.logicOp);
      }

      let leftSize = this.mPastColorBlendEnums.attachments.length;
      let rightSize = current.attachments.length;

      let fullLoop = Math.max(leftSize, rightSize);

      for (let i = 0; i < fullLoop; i += 1) {
        let hasPastValue : boolean = (i < leftSize);
        let hasNextValue : boolean = (i < rightSize);

        if (hasPastValue && hasNextValue) {
          let past = this.mPastColorBlendEnums.attachments[i];
          let next = current.attachments[i];

          if (past.blendEnable != next.blendEnable) {
            this.mBlend.enableBlending(i, next.blendEnable);
          }

          if (next.srcColorBlendFactor != past.srcColorBlendFactor ||
              next.dstColorBlendFactor != past.dstColorBlendFactor ||
              next.srcAlphaBlendFactor != past.srcAlphaBlendFactor ||
              next.dstAlphaBlendFactor != past.dstAlphaBlendFactor)
          {
            this.mBlend.applyBlendSeparateFunction(
              i
              , next.srcColorBlendFactor
              , next.dstColorBlendFactor
              , next.srcAlphaBlendFactor
              , next.dstAlphaBlendFactor
            );
          }

          if (past.colorWriteMask != next.colorWriteMask) {
            this.mBlend.setColorMask(i, next.colorWriteMask);
          }
        }
        else if (!hasPastValue && hasNextValue) {
          let next = current.attachments[i];

          this.mBlend.enableBlending(i, next.blendEnable);

          this.mBlend.applyBlendSeparateFunction(
            i
            , next.srcColorBlendFactor
            , next.dstColorBlendFactor
            , next.srcAlphaBlendFactor
            , next.dstAlphaBlendFactor
          );

          this.mBlend.setColorMask(i, next.colorWriteMask);
        }
      }
    }

    private setupDepthSettings(
      pipeline: IWGLGraphicsPipeline
    ) : void {
      let depthState = this.extractDepthState(pipeline);
      if (this.changesFoundInDepth(depthState)) {
          this.applyDepthChanges(depthState);
          this.mPastDepthState = depthState;
      }
    }

    private extractDepthState(
      pipeline: IWGLGraphicsPipeline
    ) : WGLCmdDepthStatePipelineItem {
      let temp = new WGLCmdDepthStatePipelineItem();
      temp.flags = pipeline.flags;
      temp.depthBufferFunction = pipeline.depthBufferFunction;
      return temp;
    }

    private changesFoundInDepth(
      next: WGLCmdDepthStatePipelineItem
    ) : boolean {
        const mask = WGLGraphicsPipelineFlagBits.DEPTH_BUFFER_ENABLED
          | WGLGraphicsPipelineFlagBits.DEPTH_BUFFER_WRITE_ENABLED;

        let pastFlags = mask & this.mPastDepthState.flags;
        let nextFlags = mask & next.flags;

        return (pastFlags != nextFlags)
          || (this.mPastDepthState.depthBufferFunction != next.depthBufferFunction);
    }    

    private applyDepthChanges(
      next: WGLCmdDepthStatePipelineItem
    ): void {
      const DEPTH_BUFFER_MASK = WGLGraphicsPipelineFlagBits.DEPTH_BUFFER_ENABLED;

      let oldEnabled : boolean = 
        (this.mPastDepthState.flags & DEPTH_BUFFER_MASK) == DEPTH_BUFFER_MASK;
      let newEnabled : boolean =
        (next.flags & DEPTH_BUFFER_MASK) == DEPTH_BUFFER_MASK;

      if (newEnabled != oldEnabled) {
        if (newEnabled) {
          this.mDepth.disableDepthBuffer();
        }
        else {
          this.mDepth.enableDepthBuffer();
        }
      }

      const WRITE_MASK = WGLGraphicsPipelineFlagBits.DEPTH_BUFFER_WRITE_ENABLED;
      let oldDepthWrite = (this.mPastDepthState.flags & WRITE_MASK);
      let newDepthWrite = (next.flags & WRITE_MASK);

      let pastDepthBufFunc = this.mPastDepthState.depthBufferFunction;
      let nextDepthBufFunc = next.depthBufferFunction;

      if ((oldDepthWrite & newDepthWrite) != oldDepthWrite) {
          this.mDepth.setDepthMask(newDepthWrite != 0);
      }

      if (pastDepthBufFunc != nextDepthBufFunc) {
          this.mDepth.setDepthBufferFunc(nextDepthBufFunc);
      }
    }

    private setupStencilSettings(
      pipeline: IWGLGraphicsPipeline
    ) : void {
      let currentStencil = this.extractStencilValues(pipeline);
      if (this.changesFoundInStencil(this.mPastStencilInfo, currentStencil))  {
          this.applyStencilChanges(this.mPastStencilInfo, currentStencil);
      }
      this.mPastStencilInfo = currentStencil;
    }

    private extractStencilValues(
      pipeline: IWGLGraphicsPipeline
    ) : WGLQueueRendererStencilState {
      let temp = new WGLQueueRendererStencilState();      
      temp.flags = pipeline.flags;
      temp.settings = pipeline.stencilState;
      return temp;
    }

    private changesFoundInStencil(
      previous: WGLQueueRendererStencilState
      , current: WGLQueueRendererStencilState 
    ) : boolean {
        const STENCIL_MASK = WGLGraphicsPipelineFlagBits.StencilEnabled
              | WGLGraphicsPipelineFlagBits.TwoSidedStencilMode;

        let pastFlags = STENCIL_MASK & previous.flags;
        let nextFlags = STENCIL_MASK & current.flags;

        return (pastFlags != nextFlags) 
          || (!previous.settings.equals(current.settings));
    }    

    private applyStencilChanges(
      past: WGLQueueRendererStencilState
      , next: WGLQueueRendererStencilState
    ) : void {
      let pastStencil = past.settings;
      let nextStencil = next.settings;

      // if (past.front.writeMask != next.front.writeMask) {
      //   this.mStencil.SetStencilWriteMask(MgStencilFaceFlagBits.FRONT_BIT, next.front.WriteMask);
      // }
      // TODO : back write mask too
      const STENCIL_MASK = WGLGraphicsPipelineFlagBits.StencilEnabled;  
      let oldStencilEnabled = (past.flags & STENCIL_MASK) == STENCIL_MASK;
      let newStencilEnabled = (next.flags & STENCIL_MASK) == STENCIL_MASK;

      if (oldStencilEnabled != newStencilEnabled) {
        if (newStencilEnabled) {
          this.mStencil.enableStencilBuffer();
          if (
            nextStencil.frontStencilFail != pastStencil.frontStencilFail 
            ||  nextStencil.frontDepthBufferFail != pastStencil.frontDepthBufferFail
            ||  nextStencil.frontStencilPass != pastStencil.frontStencilPass
          ) {
            this.mStencil.setFrontFaceStencilOperation(
              nextStencil.frontStencilFail
              , nextStencil.frontDepthBufferFail
              , nextStencil.frontStencilPass);
          }
          if (
            nextStencil.backStencilFail != pastStencil.backStencilFail
            ||  nextStencil.backDepthBufferFail != pastStencil.backDepthBufferFail
            ||  nextStencil.backStencilPass != pastStencil.backStencilPass
          ) {
            this.mStencil.setBackFaceStencilOperation(
              nextStencil.backStencilFail
              , nextStencil.backDepthBufferFail
              , nextStencil.backStencilPass);
          }            
        }
        else {
          this.mStencil.disableStencilBuffer();
        }        
      }
    }    

    private setupRasterizationSettings(
      pipeline: IWGLGraphicsPipeline
    ) : void {
      let current = pipeline.flags;
      if (this.changesFoundInRasterization(current)) {
          this.applyRasterizationChanges(
            this.mPastRasterization.flags, current);
      }
      this.mPastRasterization.flags = current;
    }

    private changesFoundInRasterization(
      next: WGLGraphicsPipelineFlagBits
    ) : boolean {
        const MASK = WGLGraphicsPipelineFlagBits.CULL_BACK_FACES
            | WGLGraphicsPipelineFlagBits.CULL_FRONT_FACES
            | WGLGraphicsPipelineFlagBits.CULLING_ENABLED
            // TODO: SHOULD ALWAYS BE ON
            | WGLGraphicsPipelineFlagBits.SCISSOR_TEST_ENABLED
            | WGLGraphicsPipelineFlagBits.USE_COUNTER_CLOCKWISE_WINDINGS;

        let pastFlags = MASK & this.mPastRasterization.flags;
        let nextFlags = MASK & next;

        return (pastFlags != nextFlags);
    }
    
    private applyRasterizationChanges(
      previous: WGLGraphicsPipelineFlagBits
      , next: WGLGraphicsPipelineFlagBits
    ) : void {
      const CULL_MASK = WGLGraphicsPipelineFlagBits.CULLING_ENABLED;
      let newCull = (next & CULL_MASK) == CULL_MASK;
      let oldCull = (previous & CULL_MASK) == CULL_MASK;
      if (oldCull != newCull) {
        if (newCull) {
            this.mRaster.enableCulling();
        }        
        else {
            this.mRaster.disableCulling();
        }
      }

      // culling facing face
      const CULL_FACES_MASK = 
        WGLGraphicsPipelineFlagBits.CULL_FRONT_FACES
        | WGLGraphicsPipelineFlagBits.CULL_BACK_FACES;
      
      newCull = (next & CULL_FACES_MASK) == CULL_FACES_MASK;
      oldCull = (previous & CULL_FACES_MASK) == CULL_FACES_MASK;

      if (newCull != oldCull) {
        this.mRaster.setCullingMode(
            (next & WGLGraphicsPipelineFlagBits.CULL_FRONT_FACES) > 0
          , (next & WGLGraphicsPipelineFlagBits.CULL_BACK_FACES) > 0);
      }

      // VULKAN: SCISSOR TEST IS ALWAYS ON
      // CULL_MASK = GLGraphicsPipelineFlagBits.ScissorTestEnabled;
      // if ((previous & CULL_MASK) != (next & CULL_MASK))
      // {
      //     if (mRaster.ScissorTestEnabled)
      //     {
      //         mRaster.DisableScissorTest();
      //     }
      //     else
      //     {
      //         mRaster.EnableScissorTest();
      //     }
      // }

      const WINDING_MASK = WGLGraphicsPipelineFlagBits.USE_COUNTER_CLOCKWISE_WINDINGS;
      let nextMaskValue = (next & WINDING_MASK);
      if ((previous & WINDING_MASK) != nextMaskValue) {
        this.mRaster.setUsingCounterClockwiseWindings(nextMaskValue > 0);
      }
    }        

    private updateDynamicStates(
      pipelineInfo: WGLCmdBoundPipelineRecordInfo
    ) : void {
         // UpdateLineWidth(pipelineInfo.LineWidth);
      this.updateViewports(pipelineInfo.viewports);
      this.updateScissors(pipelineInfo.scissors);
      this.updateDepthBias(pipelineInfo.depthBias);
      this.updateBlendConstants(pipelineInfo.blendConstants);
      // this.updateDepthBounds(pipelineInfo.depthBounds);

      if (
        pipelineInfo.frontStencilInfo.equals(
          pipelineInfo.backStencilInfo)
      ) {
        let sameChange = pipelineInfo.backStencilInfo;
        this.updateBothStencils(sameChange);
      }
      else {
        this.updateFrontStencil(pipelineInfo.frontStencilInfo);
        this.updateBackStencil(pipelineInfo.backStencilInfo);
      }

      if (
        pipelineInfo.frontStencilWriteMask
        == pipelineInfo.backStencilWriteMask
      ) {
        let temp = new WGLCmdPipelineStencilWriteInfo();
        temp.face = MgStencilFaceFlagBits.FRONT_AND_BACK;
        temp.writeMask = pipelineInfo.frontStencilWriteMask;
        this.updateStencilWriteMask(temp);
      }
      else {
        let frontWrite = new WGLCmdPipelineStencilWriteInfo();
        frontWrite.face = MgStencilFaceFlagBits.FRONT_BIT; 
        frontWrite.writeMask = pipelineInfo.frontStencilWriteMask;
        this.updateStencilWriteMask(frontWrite);

        let backWrite = new WGLCmdPipelineStencilWriteInfo(); 
        backWrite.face = MgStencilFaceFlagBits.BACK_BIT; 
        backWrite.writeMask = pipelineInfo.backStencilWriteMask;        
        this.updateStencilWriteMask(backWrite);
      }      
    }

    updateBothStencils(
      item: WGLCmdStencilFunctionInfo
    ) :void {
      let isRequired: boolean = false;

      let faceInfo = this.mPastFrontStencilInfo;
      if (!faceInfo.equals(item)) {
        this.extractStencilMasks(faceInfo, item);
        isRequired = true;
      }

      faceInfo = this.mPastBackStencilInfo;
      if (!faceInfo.equals(item)) {
        this.extractStencilMasks(faceInfo, item);
        isRequired = true;
      }

      if (isRequired) {
        this.mStencil.setBothStencilCullStencilFunction(
          item.stencilFunction
          , item.referenceMask
          , item.compareMask);
      }      
    }

    updateFrontStencil(
      stencilInfo: WGLCmdStencilFunctionInfo
    ): void {
      if (
        this.mPastFrontStencilInfo.stencilFunction != stencilInfo.stencilFunction 
        ||
        this.mPastFrontStencilInfo.referenceMask != stencilInfo.referenceMask
        ||
        this.mPastFrontStencilInfo.compareMask != stencilInfo.compareMask
      ) {
        this.mStencil.setFrontFaceCullStencilFunction(
          stencilInfo.stencilFunction
          , stencilInfo.referenceMask
          , stencilInfo.compareMask);

        this.mPastFrontStencilInfo.referenceMask = stencilInfo.referenceMask;
        this.mPastFrontStencilInfo.stencilFunction = stencilInfo.stencilFunction;
        this.mPastFrontStencilInfo.compareMask = stencilInfo.compareMask;
      }
    }    

    updateBackStencil(
      stencilInfo: WGLCmdStencilFunctionInfo
    ): void {
      if (
        this.mPastBackStencilInfo.stencilFunction != stencilInfo.stencilFunction
        ||
        this.mPastBackStencilInfo.referenceMask != stencilInfo.referenceMask
        ||
        this.mPastBackStencilInfo.compareMask != stencilInfo.compareMask
      ) {
        this.mStencil.setBackFaceCullStencilFunction(
          stencilInfo.stencilFunction
          , stencilInfo.referenceMask
          , stencilInfo.compareMask);

          this.mPastBackStencilInfo.compareMask = stencilInfo.compareMask;
          this.mPastBackStencilInfo.referenceMask = stencilInfo.referenceMask;
          this.mPastBackStencilInfo.stencilFunction = stencilInfo.stencilFunction;
      }            
    }

    updateStencilWriteMask(
      write: WGLCmdPipelineStencilWriteInfo
    ): void {
      if (
        (write.face & MgStencilFaceFlagBits.FRONT_AND_BACK)
          == MgStencilFaceFlagBits.FRONT_AND_BACK
      ) {
        if (
          this.mPastFrontWriteMask != write.writeMask
           || this.mPastBackWriteMask != write.writeMask
        ) {
          this.mStencil.setStencilWriteMask(
            MgStencilFaceFlagBits.FRONT_AND_BACK
            , write.writeMask);

          this.mPastFrontWriteMask = write.writeMask;
          this.mPastBackWriteMask = write.writeMask;
        }
      }
      else if ((write.face & MgStencilFaceFlagBits.FRONT_BIT) != 0) {
        if (this.mPastFrontWriteMask != write.writeMask) {
          this.mStencil.setStencilWriteMask(
            MgStencilFaceFlagBits.FRONT_BIT
            , write.writeMask);

          this.mPastFrontWriteMask = write.writeMask;
        }
      }
      else if ((write.face & MgStencilFaceFlagBits.BACK_BIT) != 0) {
        if (this.mPastBackWriteMask != write.writeMask) {
          this.mStencil.setStencilWriteMask(
            MgStencilFaceFlagBits.BACK_BIT
            , write.writeMask);
          this.mPastBackWriteMask = write.writeMask;
        }
      }
    }

    private extractStencilMasks(
       dst: WGLCmdStencilFunctionInfo
      , src: WGLCmdStencilFunctionInfo
    ) : void {
      dst.referenceMask = src.referenceMask;
      dst.stencilFunction = src.stencilFunction;
      dst.compareMask = src.compareMask;
    }    

    updateBlendConstants(blendConstants: MgColor4f): void {
      if (!this.mPastBlendConstants.equals(blendConstants))
      {
          this.mBlend.setBlendConstants(blendConstants);
          this.mPastBlendConstants = blendConstants;
      }
    }

    updateViewports(
      vp: WGLCmdViewportParameter
    ): void {
      // viewport
      if (this.changesFoundInViewports(this.mPastViewport, vp)) {
        this.mScissor.applyViewports(vp);
        this.mPastViewport = vp;
      }
    }    

    private changesFoundInViewports(
      pastViewport: WGLCmdViewportParameter|null
      , currentViewport: WGLCmdViewportParameter|null
    ) : boolean
    {
      if (pastViewport == null && currentViewport != null)
          return true;

      if (pastViewport != null && currentViewport == null)
          return false;

      let prev = pastViewport as WGLCmdViewportParameter;
      let next = currentViewport as WGLCmdViewportParameter;

      return !prev.equals(next);
    }

    updateScissors(
      current: WGLCmdScissorParameter
    ): void {
      // scissor 
      if (this.changesFoundInScissors(this.mPastScissors, current)) {
        this.mScissor.applyScissors(current);
        this.mPastScissors = current;
      }
    }    

    private changesFoundInScissors(
      pastScissors: WGLCmdScissorParameter|null
      , currentScissors: WGLCmdScissorParameter|null
    ) : boolean {
      if (pastScissors == null && currentScissors != null)
          return true;

      if (pastScissors != null && currentScissors == null)
          return false;

      let prev = currentScissors as WGLCmdScissorParameter;
      let next = pastScissors as WGLCmdScissorParameter;

      return !prev.equals(next);
    }

    bindDescriptorSets(
      ds: WGLCmdDescriptorSetParameter
    ) : void {
      this.mCache.setDescriptorSets(ds);
    }

    updateDepthBias(
      nextDepthBias: WGLCmdDepthBiasParameter
    ): void {
      let previous = this.mPastRasterization.depthBias;

      if (
        (
          Math.abs(
            previous.depthBiasConstantFactor
             - nextDepthBias.depthBiasConstantFactor
          ) > Number.EPSILON
        )
        || (
          Math.abs(
            previous.depthBiasSlopeFactor
              - nextDepthBias.depthBiasSlopeFactor
          ) > Number.EPSILON
        )
      ) {
        if (
          nextDepthBias.depthBiasConstantFactor > 0.0
          || nextDepthBias.depthBiasConstantFactor < 0.0
          || nextDepthBias.depthBiasSlopeFactor < 0.0
          || nextDepthBias.depthBiasSlopeFactor > 0.0
        ) {
          this.mRaster.enablePolygonOffset(
            nextDepthBias.depthBiasSlopeFactor
            , nextDepthBias.depthBiasConstantFactor
          );
        }
        else {
          this.mRaster.disablePolygonOffset();
        }
        this.mPastRasterization.depthBias = nextDepthBias;
      }
    }

    private applyClearBuffers(
      clearState: WGLCmdClearValuesParameter 
      , combinedMask: GLQueueClearBufferMask 
    ) {
      if (clearState.attachments.length > 0) {
        // TODO : use clear buffers 
        for (let state of clearState.attachments) {
          if (state.attachment.loadOp == MgAttachmentLoadOp.CLEAR) {
            if (state.attachment.attachmentType == WGLClearAttachmentType.COLOR_INT
                || state.attachment.attachmentType == WGLClearAttachmentType.COLOR_FLOAT
                || state.attachment.attachmentType == WGLClearAttachmentType.COLOR_UINT)
            {   
              let clearValue = state.color;
              if (!this.mPastClearValues.clearColor.equals(clearValue)) {
                this.mClear.setClearColor(clearValue);
                this.mPastClearValues.clearColor = clearValue;
              }
            }
            else if (state.attachment.attachmentType == WGLClearAttachmentType.DEPTH_STENCIL) {
              let clearValue = state.value.depthStencil;
              if (
                Math.abs(this.mPastClearValues.depthValue - clearValue.depth)
                  > Number.EPSILON
              ) {
                this.mClear.setClearDepthValue(clearValue.depth);
                this.mPastClearValues.depthValue = clearValue.depth;
              }
            }
          }

          if (state.attachment.stencilLoadOp == MgAttachmentLoadOp.CLEAR) {
            if (state.attachment.attachmentType == WGLClearAttachmentType.DEPTH_STENCIL) {
              let clearValue = state.value.depthStencil.stencil;  
              if (this.mPastClearValues.stencilValue != clearValue) {
                  this.mClear.setClearStencilValue(clearValue);
                  this.mPastClearValues.stencilValue = clearValue;
              }
            }
          }
        }
        this.mClear.clearBuffers(combinedMask);
      }
    }

    endRenderpass() : void {

    }

    draw(drawItem: WGLCmdInternalDraw) : void {
      this.mGL.drawArraysInstanced(
        this.getPrimitiveType(drawItem.topology)
        , drawItem.firstVertex
        , drawItem.vertexCount        
        , drawItem.instanceCount        
      );
    }

		private getPrimitiveType(
      topology: MgPrimitiveTopology
    ): number
		{
      switch(topology) {
        case MgPrimitiveTopology.TRIANGLE_LIST:
          return this.mGL.TRIANGLES;
        case MgPrimitiveTopology.TRIANGLE_FAN:
          return this.mGL.TRIANGLE_FAN;
        case MgPrimitiveTopology.TRIANGLE_STRIP:
          return this.mGL.TRIANGLE_STRIP;
        case MgPrimitiveTopology.POINT_LIST:
          return this.mGL.POINTS;
        case MgPrimitiveTopology.LINE_STRIP:
          return this.mGL.LINE_STRIP;
        case MgPrimitiveTopology.LINE_LIST:
          return this.mGL.LINES;
        default:
          throw new Error('Not supported');
      }
		}

    // drawIndexed(drawItem: GLCmdInternalDrawIndexed) : void {
    //   this.mGL.drawElementsInstanced(
        
    //     );
    // }
    // drawIndexedIndirect(drawItem: GLCmdInternalDrawIndexedIndirect) : void;
    // drawIndirect(drawItem: GLCmdInternalDrawIndirect) : void;
    bindVertexArrays(vao: WGLCmdVertexBufferObject) : void {
      this.mCache.setVAO(vao.vertexArray);
    }
  }
}