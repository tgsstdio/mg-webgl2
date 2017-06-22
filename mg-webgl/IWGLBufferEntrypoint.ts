import {IWGLBuffer} from './IWGLBuffer'
import {MgBufferCreateInfo} from '../mg/MgBufferCreateInfo'

export interface IWGLBufferEntrypoint {
  createBuffer(createInfo: MgBufferCreateInfo): IWGLBuffer;
}
