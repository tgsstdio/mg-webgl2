import { MgBufferImageCopy } from '../../mg/MgBufferImageCopy'
import { expect } from 'chai'
import {WGLGraphicsPipeline}
	from '../../mg-webgl/pipeline/WGLGraphicsPipeline';
import {IWGLGraphicsPipelineEntrypoint} from '../../mg-webgl/entrypoint/IWGLGraphicsPipelineEntrypoint';
import {MgGraphicsPipelineCreateInfo} from '../../mg/MgGraphicsPipelineCreateInfo';
import {WGLInternalBlockCache} from '../../mg-webgl/pipeline/WGLInternalBlockCache';
import {IWGLPipelineLayout} from '../../mg-webgl/pipeline/IWGLPipelineLayout';
import {WGLBindingPointOffsetInfo} from '../../mg-webgl/pipeline/WGLBindingPointOffsetInfo';
import {WGLDynamicOffsetInfo} from '../../mg-webgl/WGLDynamicOffsetInfo';
import {WGLUniformBinding} from '../../mg-webgl/pipeline/WGLUniformBinding';
import {IMgDevice} from '../../mg/IMgDevice';
import {IMgAllocationCallbacks} from '../../mg/IMgAllocationCallbacks';

import {WGLProgramUniformBlock} from '../../mg-webgl/pipeline/WGLProgramUniformBlock';
import {WGLInternalCacheArrayMapper} from '../../mg-webgl/pipeline/WGLInternalCacheArrayMapper';
import {MgColor4f} from '../../mg/MgColor4f';
import {MgPipelineVertexInputStateCreateInfo} from '../../mg/MgPipelineVertexInputStateCreateInfo';
import {MgPipelineInputAssemblyStateCreateInfo}
  from '../../mg/MgPipelineInputAssemblyStateCreateInfo'
import {MgPipelineRasterizationStateCreateInfo}
  from '../../mg/MgPipelineRasterizationStateCreateInfo'
import {MgVertexInputAttributeDescription}
  from '../../mg/MgVertexInputAttributeDescription'
import {MgVertexInputBindingDescription}
  from '../../mg/MgVertexInputBindingDescription'  

class MockWGLGraphicsEntrypoint implements IWGLGraphicsPipelineEntrypoint {
  constructor() {

  }

	createProgram() : WebGLProgram {
    return null;
  }

	attach(
		program: WebGLProgram
		, shader: WebGLShader) : void {

  }
	link(program: WebGLProgram): void {

  }
	isCompiled(program: WebGLProgram): boolean {
    return true;
  }
	getCompilerMessages(program: WebGLProgram): string {
    return '';
  }
	deleteProgram(program: WebGLProgram) : void {

  }
}

class MockWGLPipelineLayout implements IWGLPipelineLayout {  
  bindings: Array<WGLUniformBinding>;
  noOfBindingPoints: number;
  ranges: Map<number, WGLBindingPointOffsetInfo>;
  noOfStorageBuffers: number;
  noOfExpectedDynamicOffsets: number;
  offsetDestinations: Array<WGLDynamicOffsetInfo>;
  destroyPipelineLayout(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void {

  }  
}

describe('MgBufferImageCopy', () => {
  it('should have all fields initialized after new()', () => {
    let entrypoint = new MockWGLGraphicsEntrypoint();
    let program = null;
    let info = new MgGraphicsPipelineCreateInfo();
    let vis = new MgPipelineVertexInputStateCreateInfo();
    vis.vertexAttributeDescriptions = new Array<MgVertexInputAttributeDescription>(0);
    vis.vertexBindingDescriptions = new 
    Array<MgVertexInputBindingDescription>(0);

    info.vertexInputState = vis;
    info.inputAssemblyState = new MgPipelineInputAssemblyStateCreateInfo();
    info.rasterizationState = new MgPipelineRasterizationStateCreateInfo();    

    let layout = new MockWGLPipelineLayout();
    let blockEntries = new Array<WGLProgramUniformBlock>(0);
    let arrayMapper = new WGLInternalCacheArrayMapper(layout, blockEntries);

    let cache = new WGLInternalBlockCache(
      layout, blockEntries, arrayMapper);

    let temp = new WGLGraphicsPipeline(entrypoint, program, info, cache, layout);

    expect(temp).to.have.property('blendConstants')
      .which.is.a.instanceOf(MgColor4f)
      .and.is.not.null;
  })
});