/// <reference path="../mg/MgBlendFactor.ts" />
/// <reference path="../mg/MgColorComponentFlagBits.ts" />
/// <reference path="../mg/MgBlendOp.ts" />

namespace Magnesium {
  export class GLGraphicsPipelineBlendColorAttachmentState {
    blendEnable: boolean;
    srcColorBlendFactor: MgBlendFactor;
    dstColorBlendFactor: MgBlendFactor;
    colorBlendOp: MgBlendOp;
    srcAlphaBlendFactor: MgBlendFactor;
    dstAlphaBlendFactor: MgBlendFactor;
    alphaBlendOp: MgBlendOp;
    colorWriteMask: MgColorComponentFlagBits;

		equals (other: GLGraphicsPipelineBlendColorAttachmentState) : boolean
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
}