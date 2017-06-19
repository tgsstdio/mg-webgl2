namespace Magnesium {
  export interface IMgSwapchainCollection {
    readonly swapchain: IMgSwapchainKHR;
    readonly format: MgFormat;
    readonly width: number;
    readonly height: number;
    readonly buffers: Array<MgSwapchainBuffer>;

    create(
      cmd: IMgCommandBuffer
      , width: number
      , height:number
    ): void;
  }
}