namespace Magnesium {
	export class WGLQueueRendererStencilState	{
		flags: WGLGraphicsPipelineFlagBits;
		settings: GLGraphicsPipelineStencilState;
		front: GLGraphicsPipelineStencilMasks;
		back: GLGraphicsPipelineStencilMasks;
	}
}