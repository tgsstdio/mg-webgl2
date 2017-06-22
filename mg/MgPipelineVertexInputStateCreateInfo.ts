import {MgVertexInputBindingDescription} 
  from './MgVertexInputBindingDescription'
import {MgVertexInputAttributeDescription}
  from './MgVertexInputAttributeDescription'

export class MgPipelineVertexInputStateCreateInfo {
  flags : number;
  vertexBindingDescriptions : Array<MgVertexInputBindingDescription>;
  vertexAttributeDescriptions : Array<MgVertexInputAttributeDescription>;
}
