/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgInstanceCreateInfo {
    flags : number;
    applicationInfo?: MgApplicationInfo;
    enabledLayerNames?: Array<string>;
    enabledExtensionNames?: Array<string>;
  }
}