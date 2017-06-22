import { IMgRenderPass } from './IMgRenderPass'
import { IMgFramebuffer } from './IMgFramebuffer'
import { MgRect2D } from './MgRect2D'
import { MgClearValue } from './MgClearValue'

export class MgRenderPassBeginInfo {
  renderPass: IMgRenderPass;
  framebuffer: IMgFramebuffer;
  renderArea: MgRect2D;
  clearValues: Array<MgClearValue>;
}
