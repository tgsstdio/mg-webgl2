/// <reference path="../mg/MgCompareOp.ts" />

namespace Magnesium {
  export class GLGraphicsPipelineDepthState {
    depthBufferFunction: MgCompareOp;

		equals (other: GLGraphicsPipelineDepthState) : boolean
		{
			return	this.depthBufferFunction == other.depthBufferFunction;
		}    
  }
}