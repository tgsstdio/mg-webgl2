import {WGLGraphicsPipelineFlagBits}
	from './WGLGraphicsPipelineFlagBits';
import {WGLGraphicsPipelineStencilState}
	from './WGLGraphicsPipelineStencilState';
import {WGLGraphicsPipelineStencilMasks} from './WGLGraphicsPipelineStencilMasks';

export class WGLQueueRendererStencilState	{
	flags: WGLGraphicsPipelineFlagBits;
	settings: WGLGraphicsPipelineStencilState;
	front: WGLGraphicsPipelineStencilMasks;
	back: WGLGraphicsPipelineStencilMasks;
}
