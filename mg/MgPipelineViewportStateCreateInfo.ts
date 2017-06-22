/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgPipelineViewportStateCreateInfo {
    flags : number;
    viewports : Array<MgViewport>;
    scissors : Array<MgRect2D>;
	}
}
