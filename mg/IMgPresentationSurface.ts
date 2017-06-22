/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgPresentationSurface {
		initialize(
      width: number
      , height:number
    ) : void;
    
		readonly surface: IMgSurfaceKHR | null;
  }
}