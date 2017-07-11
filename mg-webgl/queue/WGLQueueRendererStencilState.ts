import {WGLGraphicsPipelineFlagBits}
	from '../pipeline/WGLGraphicsPipelineFlagBits';
import {WGLGraphicsPipelineStencilState}
	from '../pipeline/WGLGraphicsPipelineStencilState';
import {WGLGraphicsPipelineStencilMasks} from '../pipeline/WGLGraphicsPipelineStencilMasks';

export class WGLQueueRendererStencilState	{
	flags: WGLGraphicsPipelineFlagBits;
	settings: WGLGraphicsPipelineStencilState;
	front: WGLGraphicsPipelineStencilMasks;
	back: WGLGraphicsPipelineStencilMasks;
}
