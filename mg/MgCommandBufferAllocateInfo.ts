/// <reference path="MgCommandBufferLevel.ts" />
/// <reference path="IMgCommandPool.ts" />

namespace Magnesium {
  export class MgCommandBufferAllocateInfo {
    commandPool: IMgCommandPool;
    level: MgCommandBufferLevel;
    commandBufferCount: number;
  }
}