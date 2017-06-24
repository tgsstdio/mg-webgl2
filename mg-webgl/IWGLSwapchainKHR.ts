import {IMgSwapchainKHR} from '../mg/IMgSwapchainKHR';

export interface IWGLSwapchainKHR extends IMgSwapchainKHR {
  getNextImage(): number;
  swapBuffers() : void;
}
