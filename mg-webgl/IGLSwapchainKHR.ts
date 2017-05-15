namespace Magnesium {
  export interface IGLSwapchainKHR extends IMgSwapchainKHR {
		getNextImage () : number;
		swapBuffers() : void;
  }
}