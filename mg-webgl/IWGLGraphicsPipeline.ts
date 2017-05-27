/// <reference path="../mg/IMgPipeline.ts" />
/// <reference path="../mg/MgPolygonMode.ts" />
/// <reference path="GLInternalCache.ts" />
/// <reference path="IWGLPipelineLayout.ts" />
/// <reference path="GLGraphicsPipelineDynamicStateFlagBits.ts" />
/// <reference path="GLGraphicsPipelineBlendColorState.ts" />
/// <reference path="WGLCmdViewportParameter.ts" />
/// <reference path="GLCmdScissorParameter.ts" />
/// <reference path="GLGraphicsPipelineFlagBits.ts" />
/// <reference path="GLGraphicsPipelineStencilMasks.ts" />
/// <reference path="GLGraphicsPipelineDepthState.ts" />
/// <reference path="WGLVertexBufferBinder.ts" />
/// <reference path="GLGraphicsPipelineStencilState.ts" />

namespace Magnesium {
	export interface IWGLGraphicsPipeline extends IMgPipeline {
    // readonly programID : number;
    // readonly internalCache : GLInternalCache;
    // readonly layout : IGLPipelineLayout;
		readonly dynamicsStates : GLGraphicsPipelineDynamicStateFlagBits;
		// readonly colorBlendEnums : GLGraphicsPipelineBlendColorState;
		// readonly viewports : GLCmdViewportParameter;
		// readonly scissors : GLCmdScissorParameter;
		// readonly Flags : GLGraphicsPipelineFlagBits;
		// readonly polygonMode : MgPolygonMode;
		readonly front : GLGraphicsPipelineStencilMasks;
		readonly back : GLGraphicsPipelineStencilMasks;
		readonly topology : MgPrimitiveTopology;
		//readonly depthState : GLGraphicsPipelineDepthState;
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