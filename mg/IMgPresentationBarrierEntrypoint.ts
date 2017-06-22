/// <reference path="Magnesium.ts" />

namespace Magnesium {
	export interface IMgPresentationBarrierEntrypoint	{
		submitPrePresentBarrier(prePresent: IMgCommandBuffer, image: IMgImage): void;
		submitPostPresentBarrier(postPresent: IMgCommandBuffer, image: IMgImage): void;
	}
}