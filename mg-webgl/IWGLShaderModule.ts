namespace Magnesium {
  export interface IWGLShaderModule extends IMgShaderModule {
    readonly code: string;
    readonly codeSize: number;
  }
}