/// <reference path="MgVertexInputBindingDescription.ts" />
/// <reference path="MgVertexInputAttributeDescription.ts" />

namespace Magnesium {
  export class MgPipelineVertexInputStateCreateInfo {
    flags : number;
    vertexBindingDescriptions : Array<MgVertexInputBindingDescription>;
    vertexAttributeDescriptions : Array<MgVertexInputAttributeDescription>;
  }
}