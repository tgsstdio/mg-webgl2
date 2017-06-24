import {IMgSurfaceKHR}
	from './IMgSurfaceKHR';	

export interface IMgPresentationSurface {
  initialize(
    width: number
    , height:number
  ) : void;
  
  readonly surface: IMgSurfaceKHR | null;
}
