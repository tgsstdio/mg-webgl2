/// <reference path="../mg/IMgPipeline.ts" />
/// <reference path="../mg/MgPolygonMode.ts" />
/// <reference path="GLInternalCache.ts" />
/// <reference path="IGLPipelineLayout.ts" />
/// <reference path="GLGraphicsPipelineDynamicStateFlagBits.ts" />
/// <reference path="GLGraphicsPipelineBlendColorState.ts" />
/// <reference path="GLCmdViewportParameter.ts" />
/// <reference path="GLCmdScissorParameter.ts" />
/// <reference path="GLGraphicsPipelineFlagBits.ts" />
/// <reference path="GLGraphicsPipelineStencilMasks.ts" />
/// <reference path="GLGraphicsPipelineDepthState.ts" />
/// <reference path="GLVertexBufferBinder.ts" />
/// <reference path="GLGraphicsPipelineStencilState.ts" />

namespace Magnesium {
	export interface IGLGraphicsPipeline extends IMgPipeline {
    readonly programID : number;
    readonly internalCache : GLInternalCache;
    readonly layout : IGLPipelineLayout;
		readonly dynamicsStates : GLGraphicsPipelineDynamicStateFlagBits;
		readonly colorBlendEnums : GLGraphicsPipelineBlendColorState;
		readonly viewports : GLCmdViewportParameter;
		readonly scissors : GLCmdScissorParameter;
		readonly Flags : GLGraphicsPipelineFlagBits;
		readonly polygonMode : MgPolygonMode;
		readonly Front : GLGraphicsPipelineStencilMasks;
		readonly Back : GLGraphicsPipelineStencilMasks;
		readonly Topology : MgPrimitiveTopology;
		readonly DepthState : GLGraphicsPipelineDepthState;
		readonly vertexInput : GLVertexBufferBinder;
		readonly blendConstants : MgColor4f;
		readonly minDepthBounds : number;
		readonly maxDepthBounds : number;
		readonly DepthBiasSlopeFactor : number;
		readonly depthBiasClamp : number;
		readonly depthBiasConstantFactor : number;
		readonly lineWidth : number;
		readonly stencilState : GLGraphicsPipelineStencilState;
  }
}