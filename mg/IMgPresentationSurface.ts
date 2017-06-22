/// <reference path="Magnesium.ts" />

export interface IMgPresentationSurface {
  initialize(
    width: number
    , height:number
  ) : void;
  
  readonly surface: IMgSurfaceKHR | null;
}
