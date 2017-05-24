namespace Magnesium {
  export class WGLGraphicsPipeline implements IWGLGraphicsPipeline {    
    private mEntrypoint: IWGLGraphicsPipelineEntrypoint;
    private mProgram: WebGLProgram;
    private mInternalCache: GLInternalCache;
    private mLayout: IWGLPipelineLayout;    

    constructor(
      entrypoint: IWGLGraphicsPipelineEntrypoint
      , program: WebGLProgram
      , info: MgGraphicsPipelineCreateInfo
      , internalCache: GLInternalCache
      , layout: IWGLPipelineLayout
    ) {
      if (info == null) {
        throw new Error('info is null');
      }

      if (info.vertexInputState == null) {
        throw new Error('info.vertexInputState is null');
      } 

      if (info.inputAssemblyState == null) {
        throw new Error('info.inputAssemblyState is null');
      }      

			if (info.rasterizationState == null)
			{
				throw new Error('info.rasterizationState is null');
			}      

      this.mEntrypoint = entrypoint;
      this.mProgram = program;
      this.mInternalCache = internalCache;
      this.mLayout = layout;

			this.populateVertexDefinition(info.vertexInputState);

			this.populatePipelineConstants(info.rasterizationState);

			this.populateCmdFallbacks(info.rasterizationState);

      this.populateInputAssembly(info.inputAssemblyState);

			this.populateDepthStencilState(info.depthStencilState);

			this.populateDynamicStates(info.dynamicState);

			this.populateColorBlend(info.colorBlendState);

			this.populateViewports(info.viewportState);
    }

		private mIsDisposed: boolean = false;
    destroyPipeline(): void {
			if (!this.mIsDisposed) {

				if (this.mEntrypoint) {
					this.mEntrypoint.deleteProgram(this.mProgram);
				}

				this.mIsDisposed = true;
			}
    }

		private mViewports: WGLCmdViewportParameter;
		private mScissors: WGLCmdScissorParameter;
		populateViewports (
			viewportState: MgPipelineViewportStateCreateInfo
		) : void {
			let vp = new WGLCmdViewportParameter();
			let sci = new WGLCmdScissorParameter();

			if (viewportState != null) { 
				if (viewportState.viewports) {
					if (viewportState.viewports.length >= 1) {
						let firstVp = viewportState.viewports[0];
						vp.x = firstVp.x;
						vp.y = firstVp.y;
						vp.width = firstVp.width;
						vp.heigth = firstVp.height;
						vp.zNear = firstVp.minDepth;
						vp.zFar = firstVp.maxDepth;
					}
				}				

				if (viewportState.scissors) {
					if (viewportState.scissors.length >= 1) {
						let first = viewportState.scissors[0];
						sci.x = first.offset.x;
						sci.y = first.offset.y;
						sci.width = first.extent.width;
						sci.heigth = first.extent.height;
					}		 
				}
			}
			this.mViewports = vp;		
			this.mScissors = sci;					
		}		

		private mColorBlendEnums: GLGraphicsPipelineBlendColorState;
		private mBlendConstants: MgColor4f;
		private populateColorBlend(
			colorBlend: MgPipelineColorBlendStateCreateInfo
		) : void {

			this.mColorBlendEnums = new GLGraphicsPipelineBlendColorState ();
			if (colorBlend != null)	{
				this.mBlendConstants = colorBlend.blendConstants;

				this.mColorBlendEnums.logicOpEnable = colorBlend.logicOpEnable;
				this.mColorBlendEnums.logicOp = colorBlend.logicOp;

				if (colorBlend.attachments != null)	{
					let colorAttachments = new Array<GLGraphicsPipelineBlendColorAttachmentState>(colorBlend.attachments.length);

					for(let i = 0; i < colorBlend.attachments.length; i += 1)	{
						let src = colorBlend.attachments[i];

						let dst = new GLGraphicsPipelineBlendColorAttachmentState();
						dst.blendEnable = src.blendEnable;
						dst.srcColorBlendFactor = src.srcColorBlendFactor;
						dst.dstColorBlendFactor = src.dstColorBlendFactor;
						dst.colorBlendOp = src.colorBlendOp;
						dst.srcAlphaBlendFactor = src.srcAlphaBlendFactor;
						dst.dstAlphaBlendFactor = src.dstAlphaBlendFactor;
						dst.alphaBlendOp = src.alphaBlendOp;
						dst.colorWriteMask = src.colorWriteMask;
						
						colorBlend.attachments[i] = dst;
					}
					this.mColorBlendEnums.attachments = colorAttachments;
				}
				else {
					this.mColorBlendEnums.attachments = new Array<GLGraphicsPipelineBlendColorAttachmentState>(0);
				}
			} 
			else {
				this.mBlendConstants = new MgColor4f( 0, 0, 0, 0 );
				this.mColorBlendEnums.attachments = new Array<GLGraphicsPipelineBlendColorAttachmentState>(0);

				this.mColorBlendEnums.logicOpEnable = false;
				this.mColorBlendEnums.logicOp = MgLogicOp.COPY;
			}
		}

		private mDynamicsStates: GLGraphicsPipelineDynamicStateFlagBits;
		private populateDynamicStates(
			dynamicStates: MgPipelineDynamicStateCreateInfo
		) : void {
			let flags : GLGraphicsPipelineDynamicStateFlagBits = 0;

			if (dynamicStates != null) {
				for (let state of dynamicStates.dynamicStates) {
					switch (state)
					{
					case MgDynamicState.VIEWPORT:
						flags |= GLGraphicsPipelineDynamicStateFlagBits.VIEWPORT;
						break;
					case MgDynamicState.SCISSOR:
						flags |= GLGraphicsPipelineDynamicStateFlagBits.SCISSOR;
						break;
					case MgDynamicState.BLEND_CONSTANTS:
						flags |= GLGraphicsPipelineDynamicStateFlagBits.BLEND_CONSTANTS;
						break;
					case MgDynamicState.STENCIL_COMPARE_MASK:
						flags |= GLGraphicsPipelineDynamicStateFlagBits.STENCIL_COMPARE_MASK;
						break;
					case MgDynamicState.STENCIL_REFERENCE:
						flags |= GLGraphicsPipelineDynamicStateFlagBits.STENCIL_REFERENCE;
						break;
					case MgDynamicState.STENCIL_WRITE_MASK:
						flags |= GLGraphicsPipelineDynamicStateFlagBits.STENCIL_WRITE_MASK;
						break;
					case MgDynamicState.LINE_WIDTH:
						flags |= GLGraphicsPipelineDynamicStateFlagBits.LINE_WIDTH;
						break;
					case MgDynamicState.DEPTH_BIAS:
						flags |= GLGraphicsPipelineDynamicStateFlagBits.DEPTH_BIAS;
						break;
					case MgDynamicState.DEPTH_BOUNDS:
						flags |= GLGraphicsPipelineDynamicStateFlagBits.DEPTH_BOUNDS;
						break;					
					}
				}
				this.mDynamicsStates = flags;
			}
		}

		private mFront: GLGraphicsPipelineStencilMasks;
		private mBack: GLGraphicsPipelineStencilMasks;
		private mMaxDepthBounds: number;
		private mMinDepthBounds: number;
		private mDepthBufferFunction: MgCompareOp;
		private mStencilState: GLGraphicsPipelineStencilState;

		private populateDepthStencilState (
			depthStencilState: MgPipelineDepthStencilStateCreateInfo
		) : void {
			let flags: GLGraphicsPipelineFlagBits = 0;

			// VULKAN DOC : The scissor test is always performed.
			//  Applications can effectively disable the scissor test by specifying a
			//  scissor rectangle that encompasses the entire framebuffer.
			flags |= GLGraphicsPipelineFlagBits.ScissorTestEnabled;

			if (depthStencilState != null)
			{
				flags |= (depthStencilState.depthTestEnable) 
					? GLGraphicsPipelineFlagBits.DepthBufferEnabled
					: 0;
				flags |= (depthStencilState.stencilTestEnable)
					? GLGraphicsPipelineFlagBits.StencilEnabled
					: 0;
				flags |= (depthStencilState.depthWriteEnable)
					? GLGraphicsPipelineFlagBits.DepthBufferWriteEnabled
					: 0;

				flags |= GLGraphicsPipelineFlagBits.TwoSidedStencilMode;

				// SAME STENCIL MODE USED FOR FRONT AND BACK
				let front = new GLGraphicsPipelineStencilMasks();				
				front.compareMask = depthStencilState.front.compareMask;
				front.writeMask = depthStencilState.front.writeMask;
				front.reference = depthStencilState.front.reference,				

				this.mFront = front;

				let back = new GLGraphicsPipelineStencilMasks();				
				back.compareMask = depthStencilState.back.compareMask;
				back.writeMask = depthStencilState.back.writeMask;
				back.reference = depthStencilState.back.reference;				

				this.mBack = back;

				let stencilState = new GLGraphicsPipelineStencilState();

				stencilState.frontStencilFunction = depthStencilState.front.compareOp;
				stencilState.frontStencilPass = depthStencilState.front.passOp;
				stencilState.frontStencilFail = depthStencilState.front.failOp;
				stencilState.frontDepthBufferFail = depthStencilState.front.depthFailOp;

				stencilState.backStencilPass = depthStencilState.back.passOp;
				stencilState.backStencilFail = depthStencilState.back.failOp;
				stencilState.backDepthBufferFail = depthStencilState.back.depthFailOp;
				stencilState.backStencilFunction = depthStencilState.back.compareOp;

				this.mStencilState = stencilState;

				this.mDepthBufferFunction = depthStencilState.depthCompareOp;

				this.mMaxDepthBounds = depthStencilState.maxDepthBounds;
				this.mMinDepthBounds = depthStencilState.minDepthBounds;
			} 
			else
			{
				flags |= GLGraphicsPipelineFlagBits.DepthBufferEnabled;
				flags |= GLGraphicsPipelineFlagBits.DepthBufferWriteEnabled;

				let front = new GLGraphicsPipelineStencilMasks();				
				front.compareMask = 0x7FFFFFFF;
				front.writeMask = 0xFFFFFFFF,
				front.reference = 0x7FFFFFFF;			
				this.mFront = front;

				let back = new GLGraphicsPipelineStencilMasks()				
				back.compareMask = 0x7FFFFFFF;
				back.writeMask = 0xFFFFFFFF;
				back.reference = 0x7FFFFFFF;
				this.mBack = back;

				let stencilState = new GLGraphicsPipelineStencilState();

				stencilState.frontStencilFunction = MgCompareOp.ALWAYS;
				stencilState.frontStencilPass = MgStencilOp.KEEP;
				stencilState.frontStencilFail = MgStencilOp.KEEP;
				stencilState.frontDepthBufferFail = MgStencilOp.KEEP;

				stencilState.backStencilFunction = MgCompareOp.ALWAYS;
				stencilState.backStencilPass = MgStencilOp.KEEP;
				stencilState.backStencilFail = MgStencilOp.KEEP;
				stencilState.backDepthBufferFail = MgStencilOp.KEEP;

				this.mStencilState = stencilState;

				this.mDepthBufferFunction = MgCompareOp.LESS;

				this.mMinDepthBounds = 0;
				this.mMaxDepthBounds = 1;

			}

			this.mFlags |= flags;			
		}

		private mPolygonMode : MgPolygonMode;
		private mRasterizerDiscardEnable: boolean;
		private mFlags: GLGraphicsPipelineFlagBits;
		private mDepthClampEnable: boolean;

		private populatePipelineConstants (
			 rasterization: MgPipelineRasterizationStateCreateInfo
		) : void {
			let flags : GLGraphicsPipelineFlagBits = 0;

			flags |= ((rasterization.cullMode & MgCullModeFlagBits.FRONT_AND_BACK) > 0) ? GLGraphicsPipelineFlagBits.CullingEnabled : 0;
			flags |= ((rasterization.cullMode & MgCullModeFlagBits.FRONT_BIT) > 0) ? GLGraphicsPipelineFlagBits.CullFrontFaces : 0;
			flags |= ((rasterization.cullMode & MgCullModeFlagBits.BACK_BIT) > 0) ? GLGraphicsPipelineFlagBits.CullBackFaces : 0;
			flags |= (rasterization.frontFace == MgFrontFace.COUNTER_CLOCKWISE) ? GLGraphicsPipelineFlagBits.UseCounterClockwiseWindings : 0;

			this.mPolygonMode = rasterization.polygonMode;
			this.mRasterizerDiscardEnable = rasterization.rasterizerDiscardEnable;

			flags |= (rasterization.depthBiasEnable) ? GLGraphicsPipelineFlagBits.DepthBiasEnabled : 0;

			this.mDepthClampEnable = rasterization.depthClampEnable;

			this.mFlags |= flags;
		}

		private mDepthBiasConstantFactor: number;
		private mDepthBiasClamp: number;
		private mDepthBiasSlopeFactor: number;
		private mLineWidth: number;
		private populateCmdFallbacks(
			rasterization: MgPipelineRasterizationStateCreateInfo
		) : void {
			this.mDepthBiasConstantFactor = rasterization.depthBiasConstantFactor;
			this.mDepthBiasClamp = rasterization.depthBiasClamp;
			this.mDepthBiasSlopeFactor = rasterization.depthBiasSlopeFactor;
			this.mLineWidth = rasterization.lineWidth;
		}

    private mTopology: number;
    get topology() : MgPrimitiveTopology {
      return this.mTopology;
    }

    private mPrimitiveRestartEnable: boolean;
    private populateInputAssembly(
      inputAssemblyState: MgPipelineInputAssemblyStateCreateInfo
    ) : void {
      this.mTopology = inputAssemblyState.topology;
      this.mPrimitiveRestartEnable = inputAssemblyState.primitiveRestartEnable;
    }

		private mVertexInput: WGLVertexBufferBinder;
		private populateVertexDefinition(
      vertexInput: MgPipelineVertexInputStateCreateInfo
    ): void {
			let perInstance = new Map<number, WGLVertexBufferBinding>();

			for (let vbuf of vertexInput.vertexBindingDescriptions) {
				let def = new WGLVertexBufferBinding ();
        def.binding = vbuf.binding;
        def.inputRate = vbuf.inputRate;
        def.stride = vbuf.stride;
				perInstance.set (def.binding, def);
			}

			let keys = new Array<number>(perInstance.size);
      for (let key of perInstance.keys()) {
        keys.push(key);
      }
      let sortedKeys:  Array<number> = keys.sort((a,b) => a < b ? -1 : 1);

      let bindings = new Array<WGLVertexBufferBinding>();

      for (let key of sortedKeys) {
        let found = perInstance.get(key) as WGLVertexBufferBinding;
        bindings.push(found);
      }

			let attributes = new Array<WGLVertexInputAttribute> ();
			for (let vertAttrDesc of vertexInput.vertexAttributeDescriptions)
			{
				let binding = bindings[vertAttrDesc.binding];

				let elementInfo = WGLGraphicsPipeline.getAttributeFormat(vertAttrDesc.format);

				let divisor = (binding.inputRate == MgVertexInputRate.INSTANCE) ? 1 : 0;

        const MAX_INT_VALUE = Number.MAX_SAFE_INTEGER;
				if ( binding.stride > MAX_INT_VALUE)
					throw new Error ("ERROR : binding.Stride[i] > " + MAX_INT_VALUE);

				let att = new WGLVertexInputAttribute();
        att.binding = vertAttrDesc.binding;

				att.location = vertAttrDesc.location;
				att.offset = vertAttrDesc.offset;
				att.stride = binding.stride;

				att.divisor = divisor;
				att.size = elementInfo.size;
				att.pointerType = elementInfo.pointerType;
				att.isNormalized = elementInfo.isNormalized;
				att.function = elementInfo.function;

				attributes.push (att);
			}

			this.mVertexInput = new WGLVertexBufferBinder (bindings, attributes);
		}    

		private static getAttributeFormat (format: MgFormat) : WGLVertexAttributeInfo
		{
			switch (format)
			{
			case MgFormat.R8_SINT:
				return new WGLVertexAttributeInfo(
					1
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R8G8_SINT:
				return new WGLVertexAttributeInfo(
					2
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R8G8B8_SINT:							
			case MgFormat.B8G8R8_SINT:	// TODO : swizzle	
				return new WGLVertexAttributeInfo(
					3
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R8G8B8A8_SINT:
				return new WGLVertexAttributeInfo(				
					4
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R16_SINT:
				return new WGLVertexAttributeInfo(					
					1
					, false
					, WGLVertexAttributeType.SHORT
					, WGLVertexAttribFunction.INT			
        );
			case MgFormat.R16G16_SINT:
				return new WGLVertexAttributeInfo(					
					2
					, false
					, WGLVertexAttributeType.SHORT
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R16G16B16_SINT:
				return new WGLVertexAttributeInfo(				
					3
					, false
					, WGLVertexAttributeType.SHORT
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R16G16B16A16_SINT:
				return new WGLVertexAttributeInfo(				
					4
					, false
					, WGLVertexAttributeType.SHORT
					, WGLVertexAttribFunction.INT
        );

			case MgFormat.R32_SINT:
				return new WGLVertexAttributeInfo(				
					 1
					, false
					, WGLVertexAttributeType.INT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R32G32_SINT:
				return new WGLVertexAttributeInfo(					
					2
					, false
					, WGLVertexAttributeType.INT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R32G32B32_SINT:
				return new WGLVertexAttributeInfo(					
					3
					, false
					, WGLVertexAttributeType.INT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R32G32B32A32_SINT:
				return new WGLVertexAttributeInfo(					
					4
					, false
					, WGLVertexAttributeType.INT
					, WGLVertexAttribFunction.INT
        );

			case MgFormat.R8_UINT:
				return new WGLVertexAttributeInfo(				
					1
					, false
					, WGLVertexAttributeType.UNSIGNED_BYTE
					, WGLVertexAttribFunction.INT
        );			
			case MgFormat.R8G8_UINT:
				return new WGLVertexAttributeInfo(					
					2
					, false
					, WGLVertexAttributeType.UNSIGNED_BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R8G8B8_UINT:							
			case MgFormat.B8G8R8_UINT:	// TODO : swizzle	
				return new WGLVertexAttributeInfo(					
					3
					, false
					, WGLVertexAttributeType.UNSIGNED_BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R8G8B8A8_UINT:
				return new WGLVertexAttributeInfo(					
					4
					, false
					, WGLVertexAttributeType.UNSIGNED_BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R16_UINT:
				return new WGLVertexAttributeInfo(	
					1
					, false
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );				
			case MgFormat.R16G16_UINT:
				return new WGLVertexAttributeInfo(	
					2
					, false
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R16G16B16_UINT:
				return new WGLVertexAttributeInfo(
					3
					, false
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R16G16B16A16_UINT:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R32_UINT:
				return new WGLVertexAttributeInfo(	
					1
					, false
					, WGLVertexAttributeType.UNSIGNED_INT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R32G32_UINT:
				return new WGLVertexAttributeInfo(	
					2
					, false
					, WGLVertexAttributeType.UNSIGNED_INT
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R32G32B32_UINT:
				return new WGLVertexAttributeInfo(	
					3
					, false
					, WGLVertexAttributeType.UNSIGNED_INT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R32G32B32A32_UINT:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.UNSIGNED_INT
					, WGLVertexAttribFunction.INT
        );

			case MgFormat.R32_SFLOAT:
				return new WGLVertexAttributeInfo(	
					1
					, false
					, WGLVertexAttributeType.FLOAT
					, WGLVertexAttribFunction.FLOAT
        );	
			case MgFormat.R32G32_SFLOAT:
				return new WGLVertexAttributeInfo(	
					2
				 	, false
					, WGLVertexAttributeType.FLOAT
					, WGLVertexAttribFunction.FLOAT
        );	
			case MgFormat.R32G32B32_SFLOAT:
				return new WGLVertexAttributeInfo(	
					3
					, false
					, WGLVertexAttributeType.FLOAT
					, WGLVertexAttribFunction.FLOAT
        );	
			case MgFormat.R32G32B32A32_SFLOAT:
				return new WGLVertexAttributeInfo(	
					4
				 	, false
					, WGLVertexAttributeType.FLOAT
					, WGLVertexAttribFunction.FLOAT
        );
			case MgFormat.R16_SFLOAT:
				return new WGLVertexAttributeInfo(	
					1
				 	, false
					, WGLVertexAttributeType.HALF_FLOAT
					, WGLVertexAttribFunction.FLOAT
        );	
			case MgFormat.R16G16_SFLOAT:
				return new WGLVertexAttributeInfo(	
					2
				 	, false
					, WGLVertexAttributeType.HALF_FLOAT
					, WGLVertexAttribFunction.FLOAT
        );	
			case MgFormat.R16G16B16_SFLOAT:
				return new WGLVertexAttributeInfo(	
					3
				 	, false
					, WGLVertexAttributeType.HALF_FLOAT
					, WGLVertexAttribFunction.FLOAT
        );	
			case MgFormat.R16G16B16A16_SFLOAT:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.HALF_FLOAT
					, WGLVertexAttribFunction.FLOAT
        );
			case MgFormat.R64_SFLOAT:
				return new WGLVertexAttributeInfo(	
					1
				 	, false
					, WGLVertexAttributeType.DOUBLE
					, WGLVertexAttribFunction.DOUBLE
        );
			case MgFormat.R64G64_SFLOAT:
				return new WGLVertexAttributeInfo(	
					2
					, false
					, WGLVertexAttributeType.DOUBLE
					, WGLVertexAttribFunction.DOUBLE
        );
			case MgFormat.R64G64B64_SFLOAT:
				return new WGLVertexAttributeInfo(	
					3
					, false
					, WGLVertexAttributeType.DOUBLE
					, WGLVertexAttribFunction.DOUBLE
        );
			case MgFormat.R64G64B64A64_SFLOAT:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.DOUBLE
					, WGLVertexAttribFunction.DOUBLE
        );

			// NORMALIZED

			case MgFormat.R8_SNORM:
				return new WGLVertexAttributeInfo(	
					1
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );			
			case MgFormat.R8G8_SNORM:
				return new WGLVertexAttributeInfo(	
					2
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R8G8B8_SNORM:							
			case MgFormat.B8G8R8_SNORM:	// TODO : swizzle	
				return new WGLVertexAttributeInfo(	
					3
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R8G8B8A8_SNORM:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );

			case MgFormat.R16_UNORM:
				return new WGLVertexAttributeInfo(
					1
					, true
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );				
			case MgFormat.R16G16_UNORM:
				return new WGLVertexAttributeInfo(	
					2
					, true
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R16G16B16_UNORM:
				return new WGLVertexAttributeInfo(	
					3
					, true
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R16G16B16A16_UNORM:
				return new WGLVertexAttributeInfo(	
					4
					, true
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );		

			// A2B10G10R10
			case MgFormat.A2B10G10R10_SINT_PACK32:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.INT_2101010_REV
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.A2B10G10R10_SNORM_PACK32:
				return new WGLVertexAttributeInfo(	
					4
					, true
					, WGLVertexAttributeType.INT_2101010_REV
					, WGLVertexAttribFunction.FLOAT
        );

			case MgFormat.A2B10G10R10_SSCALED_PACK32:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.INT_2101010_REV
					, WGLVertexAttribFunction.FLOAT
        );

			case MgFormat.A2B10G10R10_UINT_PACK32:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.UNSIGNED_INT_2101010_REV
					, WGLVertexAttribFunction.FLOAT
        );

			case MgFormat.A2B10G10R10_UNORM_PACK32:
				return new WGLVertexAttributeInfo(	
					4
					, true
					, WGLVertexAttributeType.UNSIGNED_INT_2101010_REV
					, WGLVertexAttribFunction.FLOAT
        );

			case MgFormat.A2B10G10R10_USCALED_PACK32:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.UNSIGNED_INT_2101010_REV
					, WGLVertexAttribFunction.FLOAT
        );
			
			default:
				throw new Error('ERROR - not supported');
			}
		}    
  }
}