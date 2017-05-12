/// <reference path="IMgImage.ts" />
/// <reference path="MgImageViewType.ts" />
/// <reference path="MgFormat.ts" />
/// <reference path="MgComponentMapping.ts" />
/// <reference path="MgImageSubresourceRange.ts" />

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