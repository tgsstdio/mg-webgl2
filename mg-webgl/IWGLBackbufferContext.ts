import {MgFormat} from '../mg/MgFormat'
import {MgGraphicsDeviceCreateInfo} from '../mg/MgGraphicsDeviceCreateInfo'

export interface IWGLBackbufferContext {
  initialize(
    colorPassFormat: MgFormat
    , depthPassFormat: MgFormat
    , createInfo: MgGraphicsDeviceCreateInfo
  ): void;

  readonly gl: WebGL2RenderingContext;
}
