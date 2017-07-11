import {IMgGraphicsDevice}
	from '../mg/IMgGraphicsDevice';  
import {IMgGraphicsConfiguration}
	from '../mg/IMgGraphicsConfiguration';
import {IMgImageView}
	from '../mg/IMgImageView';  
import {IMgRenderPass}
	from '../mg/IMgRenderPass';        
import {IWGLRenderer}
	from './renderer/IWGLRenderer';	  
import {WGLNullImageView}
	from './WGLNullImageView';
import {IWGLRenderPass}
	from './IWGLRenderPass';
import {WGLRenderPass}
	from './WGLRenderPass';	  
import {MgFramebufferCollection}
	from '../mg/MgFramebufferCollection';  
import {IMgFramebuffer}
	from '../mg/IMgFramebuffer';
import {MgGraphicsDeviceCreateInfo}
	from '../mg/MgGraphicsDeviceCreateInfo';  
import {MgFormat}
	from '../mg/MgFormat';
import {MgAttachmentDescription}
	from '../mg/MgAttachmentDescription';  
import {MgAttachmentLoadOp}
	from '../mg/MgAttachmentLoadOp';
import {MgAttachmentStoreOp}
	from '../mg/MgAttachmentStoreOp';  
import {MgViewport}
	from '../mg/MgViewport';
import {MgRect2D}
	from '../mg/MgRect2D';  
import {IMgCommandBuffer}
	from '../mg/IMgCommandBuffer';
import {IMgSwapchainCollection}
	from '../mg/IMgSwapchainCollection';  
import {MgExtent2D}
	from '../mg/MgExtent2D';
import {MgOffset2D}
	from '../mg/MgOffset2D';                          	  

export class WGLGraphicsDevice implements IMgGraphicsDevice {      
  private mRenderer: IWGLRenderer;
  private mGraphicsConfiguration: IMgGraphicsConfiguration;
  private mView: IMgImageView;
  private mFramebuffers: MgFramebufferCollection;  
  constructor(renderer: IWGLRenderer, configuration:IMgGraphicsConfiguration) {
    this.mRenderer = renderer;
    this.mGraphicsConfiguration = configuration;
    this.mView = new WGLNullImageView ();
    this.mFramebuffers = new MgFramebufferCollection(configuration);
  }
  
  get depthStencilImageView(): IMgImageView {
    return this.mView;
  }

  private mRenderpass: IWGLRenderPass;
  get renderpass(): IMgRenderPass {
    return this.mRenderpass;
  }


  get framebuffers(): Array<IMgFramebuffer> {
    return this.mFramebuffers.framebuffers;
  }

  private setupContext (
    createInfo: MgGraphicsDeviceCreateInfo
    , colorPassFormat: MgFormat
    , depthPassFormat: MgFormat
  ) : void {
    // mBBContext.SetupContext(mWindow.WindowInfo, colorPassFormat, depthPassFormat, createInfo);

    // mExtensions.Initialize ();
    // mSelector.Initialize();
    this.mRenderer.initialize ();
  }

  private setupRenderpass(
    colorPassFormat: MgFormat
    , depthPassFormat: MgFormat
  ): void	{

    let color = new MgAttachmentDescription();
    color.format = colorPassFormat;
    color.loadOp = MgAttachmentLoadOp.CLEAR;
    color.storeOp = MgAttachmentStoreOp.STORE;
    color.stencilLoadOp = MgAttachmentLoadOp.DONT_CARE;
    color.stencilStoreOp = MgAttachmentStoreOp.DONT_CARE;

    let depth = new MgAttachmentDescription();
    depth.format = depthPassFormat;
    depth.loadOp = MgAttachmentLoadOp.CLEAR;
    depth.storeOp = MgAttachmentStoreOp.STORE;
    depth.stencilLoadOp = MgAttachmentLoadOp.CLEAR;
    depth.stencilStoreOp = MgAttachmentStoreOp.STORE;

    this.mRenderpass = new WGLRenderPass ([color, depth]);
  }    

  private mCurrentViewport: MgViewport;
  get currentViewport(): MgViewport {
    return this.mCurrentViewport;
  }

  private mScissor: MgRect2D
  get scissor() : MgRect2D {
    return this.mScissor;
  }

  create(
    setupCmdBuffer: IMgCommandBuffer
    , swapchainCollection: IMgSwapchainCollection
    , createInfo: MgGraphicsDeviceCreateInfo
  ): void {
    if (setupCmdBuffer == null) {
      throw new Error("setupCmdBuffer is null");
    }

    if (swapchainCollection == null) {
      throw new Error("swapchainCollection is null");
    }

    if (createInfo == null) {
      throw new Error("createInfo is null");
    }

    this.releaseUnmanagedResources ();
    this.mDeviceCreated = false;

    // MANDATORY
    swapchainCollection.create (setupCmdBuffer, createInfo.width, createInfo.height);

    let colorPassFormat = this.overrideColorFormat(createInfo.color, swapchainCollection.format);
    let depthPassFormat = this.overrideDepthStencilFormat(createInfo.depthStencil);

    this.setupContext(createInfo, colorPassFormat, depthPassFormat);
    this.setupRenderpass(colorPassFormat, depthPassFormat);

    this.mFramebuffers.create(
      swapchainCollection
      , this.mRenderpass
      , this.mView
      , createInfo.width
      , createInfo.height);

    this.mScissor = new MgRect2D();
    this.mScissor.extent = new MgExtent2D();
    this.mScissor.extent.width = createInfo.width;
    this.mScissor.extent.height = createInfo.height;
    this.mScissor.offset = new MgOffset2D(); 
    this.mScissor.offset.x = 0;
    this.mScissor.offset.y = 0;

    // initialize viewport
    this.mCurrentViewport = new MgViewport();
    this.mCurrentViewport.width = createInfo.width;
    this.mCurrentViewport.height = createInfo.height;
    this.mCurrentViewport.x = 0;
    this.mCurrentViewport.y = 0;
    this.mCurrentViewport.minDepth = 0;
    this.mCurrentViewport.maxDepth = 1;			

    this.mDeviceCreated = true;
  }

  private overrideDepthStencilFormat(
    overrideColor: MgFormat
  ) : MgFormat {
    if (overrideColor == MgFormat.UNDEFINED) {
      return MgFormat.D24_UNORM_S8_UINT;
    }
    else {
      return overrideColor;
    }
  }    

  private overrideColorFormat(
    overrideColor: MgFormat
    , swapchainFormat: MgFormat
  ): MgFormat {
    if (overrideColor == MgFormat.UNDEFINED) {
      return swapchainFormat;
    }
    else {
      return overrideColor;
    }
  }

  private mDeviceCreated: boolean = false;
  deviceCreated () : boolean {
    return this.mDeviceCreated;
  }

  private releaseUnmanagedResources(): void {
    this.mFramebuffers.clear();
    if (this.mRenderpass != null)	{
      this.mRenderpass.destroyRenderPass (
        this.mGraphicsConfiguration.device
        , null);
    }
  }
  private mIsDisposed: boolean = false;
  dispose() :void {
    if (this.mIsDisposed)
      return;

    this.releaseUnmanagedResources();

    this.mIsDisposed = true;
  }    
}
