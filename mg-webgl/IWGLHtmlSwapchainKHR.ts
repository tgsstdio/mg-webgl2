import {IWGLSwapchainKHR} from './IWGLSwapchainKHR';

export interface IWGLHtmlSwapchainKHR extends IWGLSwapchainKHR {
  initialize(maxNoOfImages: number): void;
}
