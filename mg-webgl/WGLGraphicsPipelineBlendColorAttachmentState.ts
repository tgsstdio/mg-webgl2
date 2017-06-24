import {MgColorComponentFlagBits} from '../mg/MgColorComponentFlagBits'
import {MgBlendFactor} from '../mg/MgBlendFactor';
import {MgBlendOp} from '../mg/MgBlendOp';

export class WGLGraphicsPipelineBlendColorAttachmentState {
	blendEnable: boolean;
	srcColorBlendFactor: MgBlendFactor;
	dstColorBlendFactor: MgBlendFactor;
	colorBlendOp: MgBlendOp;
	srcAlphaBlendFactor: MgBlendFactor;
	dstAlphaBlendFactor: MgBlendFactor;
	alphaBlendOp: MgBlendOp;
	colorWriteMask: MgColorComponentFlagBits;

	equals (other: WGLGraphicsPipelineBlendColorAttachmentState) : boolean
	{
		return this.blendEnable == other.blendEnable
			&& this.colorBlendOp == other.colorBlendOp
			&& this.alphaBlendOp == other.alphaBlendOp
			&& this.srcColorBlendFactor == other.srcColorBlendFactor
			&& this.dstColorBlendFactor == other.dstColorBlendFactor
			&& this.srcAlphaBlendFactor == other.srcAlphaBlendFactor
			&& this.dstAlphaBlendFactor == other.dstAlphaBlendFactor
			&& this.colorWriteMask == other.colorWriteMask;
	}    
}
