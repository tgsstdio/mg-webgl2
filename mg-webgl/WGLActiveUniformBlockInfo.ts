/// <reference path="../mg/MgShaderStageFlagBits.ts" />

namespace Magnesium {
  export class WGLActiveUniformBlockInfo {
    stage: MgShaderStageFlagBits;
    bindingIndex: number;
    stride: number;
  }
}