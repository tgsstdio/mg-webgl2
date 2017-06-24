import {MgPrimitiveTopology} from '../mg/MgPrimitiveTopology'

export class WGLCmdInternalDraw {
  mode: MgPrimitiveTopology;
  firstVertex: number;
  indicesCount: number;
  instanceCount: number;
}
