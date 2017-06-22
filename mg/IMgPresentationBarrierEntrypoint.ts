import {IMgCommandBuffer} from './IMgCommandBuffer'
import {IMgImage} from './IMgImage'

export interface IMgPresentationBarrierEntrypoint	{
	submitPrePresentBarrier(
		prePresent: IMgCommandBuffer
		, image: IMgImage
	): void;
	submitPostPresentBarrier(
		postPresent: IMgCommandBuffer
		, image: IMgImage
	): void;
}
