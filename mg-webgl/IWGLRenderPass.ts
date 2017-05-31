namespace Magnesium {
  export interface IWGLRenderPass extends IMgRenderPass {
    readonly attachmentFormats: Array<WGLClearAttachmentInfo>;
  }
}