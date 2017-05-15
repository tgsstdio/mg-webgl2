/// <reference path="GLVertexAttributeType.ts" />
/// <reference path="GLVertexAttribFunction.ts" />

namespace Magnesium {
  export class GLVertexInputAttribute {
    function: GLVertexAttribFunction;
    binding: number;
    location: number;
    size: number;
    pointerType: GLVertexAttributeType;
    isNormalized: boolean;
    stride: number;
    offset: number;
    divisor: number;
  }
}