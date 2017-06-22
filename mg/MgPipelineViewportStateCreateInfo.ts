import { MgViewport } from './MgViewport'
import { MgRect2D } from './MgRect2D'

export class MgPipelineViewportStateCreateInfo {
  flags : number;
  viewports : Array<MgViewport>;
  scissors : Array<MgRect2D>;
}

