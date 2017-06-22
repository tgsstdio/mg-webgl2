/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgImageViewCreateInfo {
    flags : number;
    image : IMgImage;
    viewType : MgImageViewType;
    format : MgFormat;
    components : MgComponentMapping;
    subresourceRange : MgImageSubresourceRange;
  }
}