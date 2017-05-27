namespace Magnesium {
  export interface IWGLImageFormatEntrypoint {
    getGLFormat(
      format: MgFormat
      , supportsSRgb: boolean
    ) : number;
  }
}