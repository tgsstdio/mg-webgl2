import {MgShaderStageFlagBits}
	from '../mg/MgShaderStageFlagBits'; 

export class WGLActiveUniformBlockInfo {
  stage: MgShaderStageFlagBits;
  bindingIndex: number;
  stride: number;
}
