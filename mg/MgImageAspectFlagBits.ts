/// <reference path="Magnesium.ts" />

namespace Magnesium {
	export enum MgImageAspectFlagBits	{
		COLOR_BIT = 1 << 0,
		DEPTH_BIT = 1 << 1,
		STENCIL_BIT = 1 << 2,
		METADATA_BIT = 1 << 3,
	}
}