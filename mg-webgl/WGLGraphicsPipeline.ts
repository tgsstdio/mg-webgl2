import {IWGLGraphicsPipeline} from './IWGLGraphicsPipeline';
import {IWGLGraphicsPipelineEntrypoint} from './IWGLGraphicsPipelineEntrypoint';
import {WGLInternalBlockCache} from './WGLInternalBlockCache';
import {IWGLPipelineLayout} from './IWGLPipelineLayout';
import {MgGraphicsPipelineCreateInfo} from '../mg/MgGraphicsPipelineCreateInfo';
import {WGLCmdViewportParameter} from './WGLCmdViewportParameter';
import {WGLCmdScissorParameter} from './WGLCmdScissorParameter';
import {MgPipelineViewportStateCreateInfo}
	from '../mg/MgPipelineViewportStateCreateInfo';
import {WGLGraphicsPipelineBlendColorState}
	from './WGLGraphicsPipelineBlendColorState';
import {MgColor4f} from '../mg/MgColor4f';
import {MgPipelineColorBlendStateCreateInfo} from '../mg/MgPipelineColorBlendStateCreateInfo';
import {WGLGraphicsPipelineBlendColorAttachmentState}
	from './WGLGraphicsPipelineBlendColorAttachmentState';
import {MgLogicOp}
	from '../mg/MgLogicOp';	
import {MgPipelineDynamicStateCreateInfo}
	from '../mg/MgPipelineDynamicStateCreateInfo';	
import {MgDynamicState}
	from '../mg/MgDynamicState';	
import {WGLGraphicsPipelineStencilMasks}
	from './WGLGraphicsPipelineStencilMasks';	
import {WGLGraphicsPipelineDynamicStateFlagBits}
	from './WGLGraphicsPipelineDynamicStateFlagBits';	
import {MgCompareOp}
	from '../mg/MgCompareOp';	
import {WGLGraphicsPipelineStencilState}
	from './WGLGraphicsPipelineStencilState';	
import {MgPipelineDepthStencilStateCreateInfo}
	from '../mg/MgPipelineDepthStencilStateCreateInfo';					
import {WGLGraphicsPipelineFlagBits}
	from './WGLGraphicsPipelineFlagBits';		
import {MgStencilOp}
	from '../mg/MgStencilOp';		
import {MgPolygonMode}
	from '../mg/MgPolygonMode';
import {MgPipelineRasterizationStateCreateInfo}
	from '../mg/MgPipelineRasterizationStateCreateInfo';
import {MgCullModeFlagBits}
	from '../mg/MgCullModeFlagBits';
import {MgFrontFace}
	from '../mg/MgFrontFace';
import {MgPrimitiveTopology}
	from '../mg/MgPrimitiveTopology';		
import {MgPipelineInputAssemblyStateCreateInfo}
	from '../mg/MgPipelineInputAssemblyStateCreateInfo';							
import {WGLVertexBufferBinder}
	from './WGLVertexBufferBinder';	
import {MgPipelineVertexInputStateCreateInfo}
	from '../mg/MgPipelineVertexInputStateCreateInfo';	
import {WGLVertexBufferBinding}
	from './WGLVertexBufferBinding';	
import {WGLVertexInputAttribute}
	from './WGLVertexInputAttribute';	
import {MgVertexInputRate}
	from '../mg/MgVertexInputRate';
import {WGLVertexAttributeInfo}
	from './WGLVertexAttributeInfo';
import {WGLVertexAttributeType}
	from './WGLVertexAttributeType';	
import {MgFormat}
	from '../mg/MgFormat';
import {WGLVertexAttribFunction}
	from './WGLVertexAttribFunction';								

export class WGLGraphicsPipeline implements IWGLGraphicsPipeline {    
	private mEntrypoint: IWGLGraphicsPipelineEntrypoint;
	private mProgram: WebGLProgram;
	get programID(): WebGLProgram {
		return this.mProgram;
	}
	private mInternalCache: WGLInternalBlockCache;
	get internalCache(): WGLInternalBlockCache {
		return this.mInternalCache;
	}
	private mLayout: IWGLPipelineLayout;   
	get layout():  IWGLPipelineLayout {
		return this.mLayout;
	}

	constructor(
		entrypoint: IWGLGraphicsPipelineEntrypoint
		, program: WebGLProgram
		, info: MgGraphicsPipelineCreateInfo
		, internalCache: WGLInternalBlockCache
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
	get viewports(): WGLCmdViewportParameter {
		return this.mViewports;
	}

	private mScissors: WGLCmdScissorParameter;
	get scissors(): WGLCmdScissorParameter {
		return this.mScissors;
	}

	populateViewports (
		viewportState: MgPipelineViewportStateCreateInfo|null
	) : void {
		let vp = new WGLCmdViewportParameter();
		let sci = new WGLCmdScissorParameter();

		if (viewportState != null) { 
			if (viewportState.viewports) {
				if (viewportState.viewports.length >= 1) {
					let firstVp = viewportState.viewports[0];
					vp.first = 0;
					vp.x = firstVp.x;
					vp.y = firstVp.y;
					vp.width = firstVp.width;
					vp.height = firstVp.height;
					vp.zNear = firstVp.minDepth;
					vp.zFar = firstVp.maxDepth;
				}
			}				

			if (viewportState.scissors) {
				if (viewportState.scissors.length >= 1) {
					let first = viewportState.scissors[0];
					sci.first = 0;
					sci.x = first.offset.x;
					sci.y = first.offset.y;
					sci.width = first.extent.width;
					sci.height = first.extent.height;
				}		 
			}
		}
		this.mViewports = vp;		
		this.mScissors = sci;					
	}		

	private mColorBlendEnums: WGLGraphicsPipelineBlendColorState;
	get colorBlendEnums(): WGLGraphicsPipelineBlendColorState {
		return this.mColorBlendEnums;
	}

	private mBlendConstants: MgColor4f;
	get blendConstants(): MgColor4f {
		return this.mBlendConstants;
	}

	private populateColorBlend(
		colorBlend: MgPipelineColorBlendStateCreateInfo|null
	) : void {

		this.mColorBlendEnums = new WGLGraphicsPipelineBlendColorState ();
		if (colorBlend != null)	{
			this.mBlendConstants = colorBlend.blendConstants;

			this.mColorBlendEnums.logicOpEnable = colorBlend.logicOpEnable;
			this.mColorBlendEnums.logicOp = colorBlend.logicOp;

			if (colorBlend.attachments != null)	{
				let colorAttachments = new Array<WGLGraphicsPipelineBlendColorAttachmentState>(colorBlend.attachments.length);

				for(let i = 0; i < colorBlend.attachments.length; i += 1)	{
					let src = colorBlend.attachments[i];

					let dst = new WGLGraphicsPipelineBlendColorAttachmentState();
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
				this.mColorBlendEnums.attachments = new Array<WGLGraphicsPipelineBlendColorAttachmentState>(0);
			}
		} 
		else {
			this.mBlendConstants = new MgColor4f( 0, 0, 0, 0 );
			this.mColorBlendEnums.attachments = new Array<WGLGraphicsPipelineBlendColorAttachmentState>(0);

			this.mColorBlendEnums.logicOpEnable = false;
			this.mColorBlendEnums.logicOp = MgLogicOp.COPY;
		}
	}

	private mDynamicStates: WGLGraphicsPipelineDynamicStateFlagBits;
	get dynamicStates(): WGLGraphicsPipelineDynamicStateFlagBits {
		return this.mDynamicStates;
	}

	private populateDynamicStates(
		dynamicStates: MgPipelineDynamicStateCreateInfo|null
	) : void {
		let flags : WGLGraphicsPipelineDynamicStateFlagBits = 0;

		if (dynamicStates != null) {
			for (let state of dynamicStates.dynamicStates) {
				switch (state)
				{
				case MgDynamicState.VIEWPORT:
					flags |= WGLGraphicsPipelineDynamicStateFlagBits.VIEWPORT;
					break;
				case MgDynamicState.SCISSOR:
					flags |= WGLGraphicsPipelineDynamicStateFlagBits.SCISSOR;
					break;
				case MgDynamicState.BLEND_CONSTANTS:
					flags |= WGLGraphicsPipelineDynamicStateFlagBits.BLEND_CONSTANTS;
					break;
				case MgDynamicState.STENCIL_COMPARE_MASK:
					flags |= WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_COMPARE_MASK;
					break;
				case MgDynamicState.STENCIL_REFERENCE:
					flags |= WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_REFERENCE;
					break;
				case MgDynamicState.STENCIL_WRITE_MASK:
					flags |= WGLGraphicsPipelineDynamicStateFlagBits.STENCIL_WRITE_MASK;
					break;
				case MgDynamicState.LINE_WIDTH:
					flags |= WGLGraphicsPipelineDynamicStateFlagBits.LINE_WIDTH;
					break;
				case MgDynamicState.DEPTH_BIAS:
					flags |= WGLGraphicsPipelineDynamicStateFlagBits.DEPTH_BIAS;
					break;
				case MgDynamicState.DEPTH_BOUNDS:
					flags |= WGLGraphicsPipelineDynamicStateFlagBits.DEPTH_BOUNDS;
					break;					
				}
			}
			this.mDynamicStates = flags;
		}
	}

	private mFront: WGLGraphicsPipelineStencilMasks;
	get front(): WGLGraphicsPipelineStencilMasks {
		return this.mFront;
	}

	private mBack: WGLGraphicsPipelineStencilMasks;
	get back(): WGLGraphicsPipelineStencilMasks {
		return this.mBack;
	}

	private mMaxDepthBounds: number;
	private mMinDepthBounds: number;
	private mDepthBufferFunction: MgCompareOp;		
	get depthBufferFunction(): MgCompareOp {
		return this.mDepthBufferFunction;
	}

	private mStencilState: WGLGraphicsPipelineStencilState;
	get stencilState(): WGLGraphicsPipelineStencilState {
		return this.mStencilState;
	}

	private populateDepthStencilState (
		depthStencilState: MgPipelineDepthStencilStateCreateInfo|null
	) : void {
		let flags: WGLGraphicsPipelineFlagBits = 0;

		// VULKAN DOC : The scissor test is always performed.
		//  Applications can effectively disable the scissor test by specifying a
		//  scissor rectangle that encompasses the entire framebuffer.
		flags |= WGLGraphicsPipelineFlagBits.SCISSOR_TEST_ENABLED;

		if (depthStencilState != null)
		{
			flags |= (depthStencilState.depthTestEnable) 
				? WGLGraphicsPipelineFlagBits.DEPTH_BUFFER_ENABLED
				: 0;
			flags |= (depthStencilState.stencilTestEnable)
				? WGLGraphicsPipelineFlagBits.StencilEnabled
				: 0;
			flags |= (depthStencilState.depthWriteEnable)
				? WGLGraphicsPipelineFlagBits.DEPTH_BUFFER_WRITE_ENABLED
				: 0;

			flags |= WGLGraphicsPipelineFlagBits.TwoSidedStencilMode;

			// SAME STENCIL MODE USED FOR FRONT AND BACK
			let front = new WGLGraphicsPipelineStencilMasks();				
			front.compareMask = depthStencilState.front.compareMask;
			front.writeMask = depthStencilState.front.writeMask;
			front.reference = depthStencilState.front.reference,				

			this.mFront = front;

			let back = new WGLGraphicsPipelineStencilMasks();				
			back.compareMask = depthStencilState.back.compareMask;
			back.writeMask = depthStencilState.back.writeMask;
			back.reference = depthStencilState.back.reference;				

			this.mBack = back;

			let stencilState = new WGLGraphicsPipelineStencilState();

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
			flags |= WGLGraphicsPipelineFlagBits.DEPTH_BUFFER_ENABLED;
			flags |= WGLGraphicsPipelineFlagBits.DEPTH_BUFFER_WRITE_ENABLED;

			let front = new WGLGraphicsPipelineStencilMasks();				
			front.compareMask = 0x7FFFFFFF;
			front.writeMask = 0xFFFFFFFF,
			front.reference = 0x7FFFFFFF;			
			this.mFront = front;

			let back = new WGLGraphicsPipelineStencilMasks()				
			back.compareMask = 0x7FFFFFFF;
			back.writeMask = 0xFFFFFFFF;
			back.reference = 0x7FFFFFFF;
			this.mBack = back;

			let stencilState = new WGLGraphicsPipelineStencilState();

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
	private mFlags: WGLGraphicsPipelineFlagBits;
	get flags(): WGLGraphicsPipelineFlagBits {
		return this.mFlags;
	}

	private mDepthClampEnable: boolean;

	private populatePipelineConstants (
			rasterization: MgPipelineRasterizationStateCreateInfo
	) : void {
		let flags : WGLGraphicsPipelineFlagBits = 0;

		flags |= ((rasterization.cullMode & MgCullModeFlagBits.FRONT_AND_BACK) > 0) ? WGLGraphicsPipelineFlagBits.CULLING_ENABLED : 0;
		flags |= ((rasterization.cullMode & MgCullModeFlagBits.FRONT_BIT) > 0) ? WGLGraphicsPipelineFlagBits.CULL_FRONT_FACES : 0;
		flags |= ((rasterization.cullMode & MgCullModeFlagBits.BACK_BIT) > 0) ? WGLGraphicsPipelineFlagBits.CULL_BACK_FACES : 0;
		flags |= (rasterization.frontFace == MgFrontFace.COUNTER_CLOCKWISE) ? WGLGraphicsPipelineFlagBits.USE_COUNTER_CLOCKWISE_WINDINGS : 0;

		this.mPolygonMode = rasterization.polygonMode;
		this.mRasterizerDiscardEnable = rasterization.rasterizerDiscardEnable;

		flags |= (rasterization.depthBiasEnable) ? WGLGraphicsPipelineFlagBits.DepthBiasEnabled : 0;

		this.mDepthClampEnable = rasterization.depthClampEnable;

		this.mFlags |= flags;
	}

	private mDepthBiasConstantFactor: number;
	get depthBiasConstantFactor() : number {
		return this.mDepthBiasConstantFactor;
	}

	private mDepthBiasClamp: number;
	get depthBiasClamp(): number {
		return this.mDepthBiasClamp;
	}

	private mDepthBiasSlopeFactor: number;
	get depthBiasSlopeFactor(): number {
		return this.mDepthBiasSlopeFactor;
	}

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
	get vertexInput(): WGLVertexBufferBinder {
		return this.mVertexInput;
	}
	private populateVertexDefinition(
		input: MgPipelineVertexInputStateCreateInfo
	): void {
		let perInstance = new Map<number, WGLVertexBufferBinding>();

		for (let vbuf of input.vertexBindingDescriptions) {
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
		for (let vertAttrDesc of input.vertexAttributeDescriptions)
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
