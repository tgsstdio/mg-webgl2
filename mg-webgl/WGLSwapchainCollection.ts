import {IMgSwapchainCollection} from '../mg/IMgSwapchainCollection';
import {IWGLHtmlSwapchainKHR} from './IWGLHtmlSwapchainKHR';
import {WGLNullImageView} from './WGLNullImageView';
import {MgFormat} from '../mg/MgFormat';
import {IMgCommandBuffer} from '../mg/IMgCommandBuffer';
import {IMgSwapchainKHR} from '../mg/IMgSwapchainKHR';
import {MgSwapchainBuffer} from '../mg/MgSwapchainBuffer';

export class WGLSwapchainCollection implements IMgSwapchainCollection {
  private mSwapchain: IWGLHtmlSwapchainKHR;
  get swapchain(): IMgSwapchainKHR {
    return this.mSwapchain as IMgSwapchainKHR;
  }

  private mFormat: MgFormat;
  get format(): MgFormat {
    return this.mFormat;
  }

  private mWidth: number;
  get width(): number {
    return this.mWidth;
  }
  
  private mHeight : number;
  get height(): number {
    return this.mHeight;
  }

  private mBuffers: Array<MgSwapchainBuffer>;
  get buffers(): Array<MgSwapchainBuffer> {
    return this.mBuffers;
  }

  constructor(swapchain: IWGLHtmlSwapchainKHR) {
    const MAX_NO_OF_BUFFERS = 2;
    this.mBuffers = new Array<MgSwapchainBuffer>(MAX_NO_OF_BUFFERS);
    for (let i  = 0; i < MAX_NO_OF_BUFFERS; i += 1) {
      let buff = new MgSwapchainBuffer();
      buff.view = new WGLNullImageView();      
      this.mBuffers[i] = buff;
    }
    this.mSwapchain = swapchain;
    this.mSwapchain.initialize(MAX_NO_OF_BUFFERS);      
    this.mFormat = MgFormat.R8G8B8A8_UINT;
  }

  create(
    cmd: IMgCommandBuffer
    , width: number
    , height:number
  ): void {
    this.mWidth = width;
    this.mHeight = height;
  }
}
