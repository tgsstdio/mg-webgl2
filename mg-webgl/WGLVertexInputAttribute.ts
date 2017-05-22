/// <reference path="WGLVertexAttributeType.ts" />
/// <reference path="WGLVertexAttribFunction.ts" />

namespace Magnesium {
  export class WGLVertexInputAttribute {
    function: WGLVertexAttribFunction;
    binding: number;
    location: number;
    size: number;
    pointerType: WGLVertexAttributeType;
    isNormalized: boolean;
    stride: number;
    offset: number;
    divisor: number;
  }
}