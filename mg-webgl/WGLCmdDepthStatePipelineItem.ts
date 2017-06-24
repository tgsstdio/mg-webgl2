import {WGLGraphicsPipelineFlagBits}
	from './WGLGraphicsPipelineFlagBits';
import {MgCompareOp}
	from '../mg/MgCompareOp';  

export class WGLCmdDepthStatePipelineItem {
	flags: WGLGraphicsPipelineFlagBits;
	depthBufferFunction: MgCompareOp;

	equals (
		other: WGLCmdDepthStatePipelineItem
	) : boolean {
		if (!(this.flags == other.flags))
			return false;

		return this.depthBufferFunction == other.depthBufferFunction;
	}
}
