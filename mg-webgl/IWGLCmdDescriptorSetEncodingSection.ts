namespace Magnesium {
  export interface IWGLCmdDescriptorSetEncodingSection {
    clear(): void;
    invalidate(): void;
    pushIfRequired(
      pipeline: IWGLGraphicsPipeline|null
      , bag: WGLCmdGraphicsBag
      , instructions: WGLCmdEncoderContextSorter 
    ): void;    
		bind(
      layout: IMgPipelineLayout
      , firstSet: number
      , descriptorSetCount: number
      , pDescriptorSets: Array<IMgDescriptorSet>
      , pDynamicOffsets: Array<number>|null
    ) : void;    
  }
}