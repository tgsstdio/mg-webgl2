/// <reference path="IWGLPipelineLayout.ts" />
/// <reference path="WGLUniformBlockNameInfo.ts" />
/// <reference path="GLInternalCacheArrayMapper.ts" />

namespace Magnesium {
		export class GLInternalCache {
      private mArrayMapper: GLInternalCacheArrayMapper;

      constructor
      (
         pipelineLayout: IWGLPipelineLayout
        , blockEntries: Array<WGLProgramUniformBlock>
        , arrayMapper: GLInternalCacheArrayMapper
      ) {
        this.mArrayMapper = arrayMapper;
        this.setupBlockBindings(blockEntries, this.mArrayMapper);
      }

      setupBlockBindings(
        blockEntries: Array<WGLProgramUniformBlock>
        , arrayMapper: GLInternalCacheArrayMapper
      ) : void 
      {

      }
    }
}