/// <reference path="GLUniformBinding.ts" />
/// <reference path="GLDynamicOffsetInfo.ts" />
/// <reference path="GLBindingPointOffsetInfo.ts" />

namespace Magnesium {
  export interface IGLPipelineLayout {
    readonly bindings: Array<GLUniformBinding>;
    readonly noOfBindingPoints: number;
    readonly ranges: Map<number, GLBindingPointOffsetInfo>;
    readonly noOfStorageBuffers: number;
    readonly noOfExpectedDynamicOffsets: number;
    readonly offsetDestinations: Array<GLDynamicOffsetInfo>;
  }
}