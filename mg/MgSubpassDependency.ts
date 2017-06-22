/// <reference path="Magnesium.ts" />

import * as MgPipelineStageFlagBits from './MgPipelineStageFlagBits'
import * as MgAccessFlagBits from './MgAccessFlagBits'
import * as MgDependencyFlagBits from './MgDependencyFlagBits'

export class MgSubpassDependency {
  srcSubpass: number;
  dstSubpass: number;
  srcStageMask: MgPipelineStageFlagBits;
  dstStageMask: MgPipelineStageFlagBits;
  srcAccessMask: MgAccessFlagBits;
  dstAccessMask: MgAccessFlagBits;
  dependencyFlags: MgDependencyFlagBits;
}
