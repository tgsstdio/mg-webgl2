/// <reference path="WGLVertexAttributeType.ts" />
/// <reference path="WGLVertexAttribFunction.ts" />

namespace Magnesium {
  export class WGLVertexAttributeInfo {
    pointerType: WGLVertexAttributeType;
    size: number;
    isNormalized: boolean;
    function: WGLVertexAttribFunction;

    constructor(
      attributeSize: number
      , isNormalized: boolean
      , pointerType: WGLVertexAttributeType
      , attributeFunction: WGLVertexAttribFunction
    ) {
      this.size = attributeSize;
      this.isNormalized = isNormalized;
      this.pointerType = pointerType;
      this.function = attributeFunction;
    }
  }
}