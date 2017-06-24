import {MgPipelineStageFlagBits} from './MgPipelineStageFlagBits'
import {MgAccessFlagBits} from './MgAccessFlagBits'
import {MgDependencyFlagBits} from './MgDependencyFlagBits'

export class MgSubpassDependency {
  srcSubpass: number;
  dstSubpass: number;
  srcStageMask: MgPipelineStageFlagBits;
  dstStageMask: MgPipelineStageFlagBits;
  srcAccessMask: MgAccessFlagBits;
  dstAccessMask: MgAccessFlagBits;
  dependencyFlags: MgDependencyFlagBits;
}
