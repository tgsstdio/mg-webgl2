/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgPipelineVertexInputStateCreateInfo {
    flags : number;
    vertexBindingDescriptions : Array<MgVertexInputBindingDescription>;
    vertexAttributeDescriptions : Array<MgVertexInputAttributeDescription>;
  }
}