/// <reference path="WGLUniformBlockNameInfo.ts" />

namespace Magnesium {
  export class WGLProgramUniformBlock {
    constructor(
      blockName: string
      , index: number
      , stride: number
      , token: WGLUniformBlockNameInfo
    ) {
      this.blockName = blockName;
      this.activeIndex = index;
      this.stride = stride;
      this.token = token;
    }

    activeIndex: number;
    blockName: string;
    firstBinding: number;
    stride: number;
    token: WGLUniformBlockNameInfo;
  }
}