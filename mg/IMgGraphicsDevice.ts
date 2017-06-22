/// <reference path="Magnesium.ts" />

namespace Magnesium {
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
}