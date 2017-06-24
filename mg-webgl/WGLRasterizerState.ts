import {WGLGraphicsPipelineFlagBits}
	from './WGLGraphicsPipelineFlagBits';	
import {WGLCmdDepthBiasParameter}
	from './WGLCmdDepthBiasParameter';

export class WGLRasterizerState	{
  flags: WGLGraphicsPipelineFlagBits;
  depthBias: WGLCmdDepthBiasParameter;

  equals (other: WGLRasterizerState): boolean	{
    if (this.flags != other.flags) {
      return false;
    }

    if (
      Math.abs (
        this.depthBias.depthBiasConstantFactor
          - other.depthBias.depthBiasConstantFactor
        ) > Number.EPSILON
    ) {
      return false;
    }


    if (
      Math.abs (
        this.depthBias.depthBiasSlopeFactor
          - other.depthBias.depthBiasSlopeFactor
      ) > Number.EPSILON
    )  {
        return false;
    }

    return (
      Math.abs (
        this.depthBias.depthBiasClamp
          - other.depthBias.depthBiasClamp
      ) <= Number.EPSILON
    );      
  }
}

