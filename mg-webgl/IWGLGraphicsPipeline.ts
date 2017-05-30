/// <reference path="../mg/IMgPipeline.ts" />
/// <reference path="../mg/MgPolygonMode.ts" />
/// <reference path="WGLInternalBlockCache.ts" />
/// <reference path="IWGLPipelineLayout.ts" />
/// <reference path="WGLGraphicsPipelineDynamicStateFlagBits.ts" />
/// <reference path="WGLGraphicsPipelineBlendColorState.ts" />
/// <reference path="WGLCmdViewportParameter.ts" />
/// <reference path="WGLCmdScissorParameter.ts" />
/// <reference path="WGLGraphicsPipelineFlagBits.ts" />
/// <reference path="GLGraphicsPipelineStencilMasks.ts" />
/// <reference path="WGLVertexBufferBinder.ts" />
/// <reference path="GLGraphicsPipelineStencilState.ts" />

namespace Magnesium {
	export interface IWGLGraphicsPipeline extends IMgPipeline {
    readonly programID : WebGLProgram;
    readonly internalCache : WGLInternalBlockCache;
    readonly layout : IWGLPipelineLayout;
		readonly dynamicStates : WGLGraphicsPipelineDynamicStateFlagBits;
		readonly colorBlendEnums : WGLGraphicsPipelineBlendColorState;
		readonly viewports : WGLCmdViewportParameter;
		readonly scissors : WGLCmdScissorParameter;
		readonly flags : WGLGraphicsPipelineFlagBits;
		// readonly polygonMode : MgPolygonMode;
		readonly front : GLGraphicsPipelineStencilMasks;
		readonly back : GLGraphicsPipelineStencilMasks;
		readonly topology : MgPrimitiveTopology;
		readonly depthBufferFunction : MgCompareOp;
		//readonly vertexInput : GLVertexBufferBinder;
		readonly blendConstants : MgColor4f;
		// readonly minDepthBounds : number;
		// readonly maxDepthBounds : number;
		readonly depthBiasSlopeFactor : number;
		readonly depthBiasClamp : number;
		readonly depthBiasConstantFactor : number;
		// readonly lineWidth : number;
		readonly stencilState : GLGraphicsPipelineStencilState;
  }
}