/// <reference path="MgViewport.ts" />
/// <reference path="MgRect2D.ts" />

namespace Magnesium {
  export class MgPipelineViewportStateCreateInfo {
    flags : number;
    viewports : Array<MgViewport>;
    scissors : Array<MgRect2D>;
	}
}
