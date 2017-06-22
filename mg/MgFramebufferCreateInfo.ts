import {IMgRenderPass} from './IMgRenderPass'
import {IMgImageView} from './IMgImageView'

export class MgFramebufferCreateInfo {
  flags: number;
  renderPass: IMgRenderPass;
  attachments: Array<IMgImageView>;
  width: number;
  height: number;
  layers: number;
}