import {IMgGraphicsConfiguration} from './IMgGraphicsConfiguration'
import {IMgFramebuffer} from './IMgFramebuffer'
import {IMgSwapchainCollection} from './IMgSwapchainCollection'
import {IMgRenderPass} from './IMgRenderPass'
import {IMgImageView} from './IMgImageView'
import {MgFramebufferCreateInfo} from './MgFramebufferCreateInfo'
import {MgResult} from './MgResult'

export class MgFramebufferCollection {
  private mGraphicsConfiguration: IMgGraphicsConfiguration;
  constructor(configuration: IMgGraphicsConfiguration) {
    this.mGraphicsConfiguration = configuration;
  }

  private mFramebuffers: Array<IMgFramebuffer>;
  get framebuffers(): Array<IMgFramebuffer> {
    return this.mFramebuffers;    
  }

  create(
    swapchains: IMgSwapchainCollection
    , pass: IMgRenderPass
    , depthStencilView: IMgImageView
    , width: number
    , height: number
  ): void {
    if (this.mGraphicsConfiguration.partition != null) {
      // Create frame buffers for every swap chain image
      let noOfFrameBuffers : number = swapchains.buffers.length;
      let frameBuffers = new Array<IMgFramebuffer>(noOfFrameBuffers);
      for (let i = 0; i < noOfFrameBuffers; i++) {
        let createInfo = new MgFramebufferCreateInfo();
        createInfo.renderPass = pass;
        createInfo.attachments = [swapchains.buffers[i].view, depthStencilView];
        createInfo.width = width;
        createInfo.height = height;
        createInfo.layers = 1;

        let outFB
          : {pFramebuffer:IMgFramebuffer|null}
          = {pFramebuffer:null};
        let err = this.mGraphicsConfiguration
                    .partition
                    .device
                    .createFramebuffer(createInfo, null, outFB);
        if (err != MgResult.SUCCESS) {
          throw new Error(err.toString());
        }            
        frameBuffers[i] = outFB.pFramebuffer as IMgFramebuffer;
      }         

      this.mFramebuffers = frameBuffers;
    }
  }

  clear(): void {
    for (let fb of this.mFramebuffers) {
      fb.destroyFramebuffer(
        this.mGraphicsConfiguration.partition.device, null);
    }
    this.mFramebuffers = new Array<IMgFramebuffer>(0);      
  }
}

