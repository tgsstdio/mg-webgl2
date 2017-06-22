/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgDisplayPlaneCapabilitiesKHR {
    supportedAlpha: MgDisplayPlaneAlphaFlagBitsKHR;
    minSrcPosition: MgOffset2D;
    maxSrcPosition: MgOffset2D;
    minSrcExtent: MgExtent2D;
    maxSrcExtent: MgExtent2D;
    minDstPosition: MgOffset2D;
    maxDstPosition: MgOffset2D;
    minDstExtent: MgExtent2D;
    maxDstExtent: MgExtent2D;
  }
}