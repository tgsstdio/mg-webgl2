/// <reference path="IWGLPipelineLayout.ts" />
/// <reference path="WGLUniformBlockNameInfo.ts" />
/// <reference path="WGLInternalCacheArrayMapper.ts" />

namespace Magnesium {
  export class GLInternalCacheBlockBinding {
    blockName: string;
    activeIndex: number;
    bindingPoint: number;
  }

  export class GLInternalCache {
    private mBlockBindings: Array<GLInternalCacheBlockBinding>;

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
        this.mBlockBindings = new Array<GLInternalCacheBlockBinding>(count);
        for (let i = 0; i < count; i += 1) {
          let entry = blockEntries[i];
          let binding = new GLInternalCacheBlockBinding();
          binding.blockName = entry.blockName;
          binding.activeIndex = entry.activeIndex;
          binding.bindingPoint = arrayMapper.calculateArrayIndex(entry);
          this.mBlockBindings[i] = binding;
        }
    }
  }
}