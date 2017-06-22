import {MgPrimitiveTopology} from './MgPrimitiveTopology'
 
export class MgPipelineInputAssemblyStateCreateInfo {
  flags : number;
  topology : MgPrimitiveTopology;
  primitiveRestartEnable : boolean;
}
