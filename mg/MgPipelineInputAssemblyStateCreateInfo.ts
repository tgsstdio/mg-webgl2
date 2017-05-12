/// <reference path="MgPrimitiveTopology.ts" />

namespace Magnesium {  
  export class MgPipelineInputAssemblyStateCreateInfo {
    flags : number;
    topology : MgPrimitiveTopology;
    primitiveRestartEnable : boolean;
  }
}