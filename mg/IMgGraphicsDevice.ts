import {IMgDisposable}
	from './IMgDisposable';	  
import {MgRect2D}
	from './MgRect2D';
import {MgViewport}
	from './MgViewport';	  
import {IMgImageView}
	from './IMgImageView';	    
import {IMgRenderPass}
	from './IMgRenderPass';	  
import {IMgFramebuffer}
	from './IMgFramebuffer';
import {IMgCommandBuffer}
	from './IMgCommandBuffer';	  
import {IMgSwapchainCollection}
	from './IMgSwapchainCollection';	  
import {MgGraphicsDeviceCreateInfo}
	from './MgGraphicsDeviceCreateInfo';  

export interface IMgGraphicsDevice extends IMgDisposable {
  readonly scissor : MgRect2D;
  readonly currentViewport: MgViewport;
  readonly depthStencilImageView: IMgImageView;
  readonly renderpass: IMgRenderPass;
  readonly framebuffers: Array<IMgFramebuffer>;

  create(
    setupCmdBuffer: IMgCommandBuffer
    , mSwapchainCollection: IMgSwapchainCollection
    , dsCreateInfo: MgGraphicsDeviceCreateInfo): void;
  deviceCreated(): boolean;
}
