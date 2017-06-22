/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgCommandBufferAllocateInfo {
    commandPool: IMgCommandPool;
    level: MgCommandBufferLevel;
    commandBufferCount: number;
  }
}