namespace Magnesium {
	export interface IWGLDescriptorSetBinder	{
		clear() : void;
		bind(
      pipelineBindPoint: MgPipelineBindPoint
      , layout: IMgPipelineLayout
      , firstSet: number
      , descriptorSetCount: number
      , pDescriptorSets: Array<IMgDescriptorSet>
      , pDynamicOffsets: Array<number>|null) : void;
    readonly isInvalid: boolean;
		readonly boundPipelineLayout: IWGLPipelineLayout|null;
		readonly boundDynamicOffsets: Array<number>|null;
		readonly boundDescriptorSet: IWGLDescriptorSet|null;
	}
}
