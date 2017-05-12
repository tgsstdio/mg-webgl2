/// <reference path="IMgSampler.ts" />
/// <reference path="IMgImageView.ts" />
/// <reference path="MgImageLayout.ts" />

namespace Magnesium {
  export class MgDescriptorImageInfo {
    sampler : IMgSampler;
    imageView : IMgImageView;
    imageLayout : MgImageLayout;
	}
}