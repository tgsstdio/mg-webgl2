import {IWGLCmdDescriptorSetEncodingSection}
	from '../mg-webgl/cmdbuf/IWGLCmdDescriptorSetEncodingSection';
import {IWGLGraphicsPipeline}
	from '../mg-webgl/pipeline/IWGLGraphicsPipeline'; 
import {WGLCmdGraphicsBag}
	from '../mg-webgl/cmdbuf/WGLCmdGraphicsBag';
import {WGLCmdEncoderContextSorter}
	from '../mg-webgl/cmdbuf/WGLCmdEncoderContextSorter';
import {IMgPipelineLayout}
	from '../mg/IMgPipelineLayout'; 
import {IMgDescriptorSet}
	from '../mg/IMgDescriptorSet'; 

export class MockWGLCmdDescriptorSetEncodingSection implements IWGLCmdDescriptorSetEncodingSection {
  clear(): void {

  }

  invalidate(): void {

  }

  pushIfRequired(
    pipeline: IWGLGraphicsPipeline|null
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter 
  ): void {

  }

  bind(
    layout: IMgPipelineLayout
    , firstSet: number
    , descriptorSetCount: number
    , pDescriptorSets: Array<IMgDescriptorSet>
    , pDynamicOffsets: Array<number>|null
  ) : void {

  }
}