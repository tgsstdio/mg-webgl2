import {IWGLPipelineLayout} from './IWGLPipelineLayout';
import {WGLUniformBlockNameInfo} from './WGLUniformBlockNameInfo';
import {WGLInternalCacheArrayMapper} from './WGLInternalCacheArrayMapper';
import {WGLInternalCacheBlockBinding} from './WGLInternalCacheBlockBinding'
import {WGLProgramUniformBlock} from './WGLProgramUniformBlock';

export class WGLInternalBlockCache {
  private mBlockBindings: Array<WGLInternalCacheBlockBinding>;
  get blockBindings(): Array<WGLInternalCacheBlockBinding> {
    return this.mBlockBindings;
  }

  private mArrayMapper: WGLInternalCacheArrayMapper;
  constructor
  (
      pipelineLayout: IWGLPipelineLayout
    , blockEntries: Array<WGLProgramUniformBlock>
    , arrayMapper: WGLInternalCacheArrayMapper
  ) {
    this.mArrayMapper = arrayMapper;
    this.setupBlockBindings(blockEntries, this.mArrayMapper);
  }

  setupBlockBindings(
    blockEntries: Array<WGLProgramUniformBlock>
    , arrayMapper: WGLInternalCacheArrayMapper
  ) : void 
  {
      let count = blockEntries.length;
      this.mBlockBindings = new Array<WGLInternalCacheBlockBinding>(count);
      for (let i = 0; i < count; i += 1) {
        let entry = blockEntries[i];
        let binding = new WGLInternalCacheBlockBinding();
        binding.blockName = entry.blockName;
        binding.activeIndex = entry.activeIndex;
        binding.bindingPoint = arrayMapper.calculateArrayIndex(entry);
        this.mBlockBindings[i] = binding;
      }
  }
}
