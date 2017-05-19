namespace Magnesium {
  export interface IWGLImage extends IMgImage {
    readonly width: number;
    readonly height: number;
    readonly depth: number;
    readonly format: MgFormat;
    readonly imageType: MgImageType;
    readonly levels: number;
    readonly layers: number;
    readonly arrayLayers: Array<GLImageArraySubresource>;
  }
}