/// <reference path="Magnesium.ts" />

namespace Magnesium {  
  export class MgPipelineInputAssemblyStateCreateInfo {
    flags : number;
    topology : MgPrimitiveTopology;
    primitiveRestartEnable : boolean;
  }
}