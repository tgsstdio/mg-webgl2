import {IMgPipeline} from '../mg/IMgPipeline';
import {MgPolygonMode} from '../mg/MgPolygonMode';
import {MgCompareOp} from '../mg/MgCompareOp';
import {MgColor4f} from '../mg/MgColor4f';
import {MgPrimitiveTopology} from '../mg/MgPrimitiveTopology';
import {WGLInternalBlockCache} from './WGLInternalBlockCache';
import {IWGLPipelineLayout} from './IWGLPipelineLayout';
import {WGLGraphicsPipelineDynamicStateFlagBits} from './WGLGraphicsPipelineDynamicStateFlagBits';
import WGLGraphicsPipelineBlendColorState} from './WGLGraphicsPipelineBlendColorState';
import {WGLCmdViewportParameter} from './WGLCmdViewportParameter';
import {WGLCmdScissorParameter} from './WGLCmdScissorParameter';
import {WGLGraphicsPipelineFlagBits} from './WGLGraphicsPipelineFlagBits';
import {WGLGraphicsPipelineStencilMasks} from './WGLGraphicsPipelineStencilMasks';
import {WGLVertexBufferBinder} from './WGLVertexBufferBinder';
import {WGLGraphicsPipelineStencilState} from './WGLGraphicsPipelineStencilState';


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
	readonly front : WGLGraphicsPipelineStencilMasks;
	readonly back : WGLGraphicsPipelineStencilMasks;
	readonly topology : MgPrimitiveTopology;
	readonly depthBufferFunction : MgCompareOp;
	readonly vertexInput : WGLVertexBufferBinder;
	readonly blendConstants : MgColor4f;
	// readonly minDepthBounds : number;
	// readonly maxDepthBounds : number;
	readonly depthBiasSlopeFactor : number;
	readonly depthBiasClamp : number;
	readonly depthBiasConstantFactor : number;
	// readonly lineWidth : number;
	readonly stencilState : WGLGraphicsPipelineStencilState;
}
