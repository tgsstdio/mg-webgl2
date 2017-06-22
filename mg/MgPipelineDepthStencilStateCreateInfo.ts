import {MgCompareOp} from './MgCompareOp'
import {MgStencilOpState} from './MgStencilOpState'

export class MgPipelineDepthStencilStateCreateInfo {
  flags : number;
  depthTestEnable : boolean;
  depthWriteEnable : boolean;
  depthCompareOp : MgCompareOp;
  depthBoundsTestEnable : boolean;
  stencilTestEnable : boolean;
  front : MgStencilOpState;
  back : MgStencilOpState;
  minDepthBounds : number;
  maxDepthBounds : number;
}
