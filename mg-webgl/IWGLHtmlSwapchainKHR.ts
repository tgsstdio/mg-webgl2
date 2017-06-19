namespace Magnesium {
  export interface IWGLHtmlSwapchainKHR extends IWGLSwapchainKHR {
    initialize(maxNoOfImages: number): void;
  }
}