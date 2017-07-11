import {IMgShaderModule} from '../../mg/IMgShaderModule';

export interface IWGLShaderModule extends IMgShaderModule {
  readonly code: string;
  readonly codeSize: number;
}
