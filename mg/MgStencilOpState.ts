import { MgStencilOp } from './MgStencilOp'
import { MgCompareOp } from './MgCompareOp'

export class MgStencilOpState	{
  failOp : MgStencilOp;
  passOp : MgStencilOp;
  depthFailOp : MgStencilOp;
  compareOp : MgCompareOp;
  compareMask : number;
  writeMask : number;
  reference : number;
}
