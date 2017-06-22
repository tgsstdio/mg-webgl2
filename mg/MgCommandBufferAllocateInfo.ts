/// <reference path="Magnesium.ts" />

export class MgCommandBufferAllocateInfo {
  commandPool: IMgCommandPool;
  level: MgCommandBufferLevel;
  commandBufferCount: number;
}
