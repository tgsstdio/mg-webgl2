/// <reference path="MgImageAspectFlagBits.ts" />
/// <reference path="MgClearValue.ts" />

namespace Magnesium {
  export class MgClearAttachment {
    aspectMask: MgImageAspectFlagBits;
    colorAttachment: number;
    clearValue: MgClearValue;
  }
}