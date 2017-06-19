namespace Magnesium {
  export interface IWGLSwapchainKHR extends IMgSwapchainKHR {
    getNextImage(): number;
    swapBuffers() : void;
  }
}