/// <reference path="GLDescriptorPoolResourceInfo.ts" />
/// <reference path="IGLNextDescriptorPool.ts" />

namespace Magnesium {
  export class IGLDescriptorSet {
    readonly key: number;
    readonly parent: IGLNextDescriptorPool;
    readonly resources: Array<GLDescriptorPoolResourceInfo>;
  }
}