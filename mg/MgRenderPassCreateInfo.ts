import { MgAttachmentDescription } from './MgAttachmentDescription'
import { MgSubpassDependency } from './MgSubpassDependency'
import { MgSubpassDescription } from './MgSubpassDescription'

export class MgRenderPassCreateInfo {
  flags: number;
  attachments: Array<MgAttachmentDescription>;
  subpasses: Array<MgSubpassDescription>;
  dependencies: Array<MgSubpassDependency>;
}
