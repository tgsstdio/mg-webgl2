/// <reference path="IWGLPipelineLayout.ts" />
/// <reference path="GLUniformBlockEntry.ts" />
/// <reference path="GLInternalCacheArrayMapper.ts" />

namespace Magnesium {
		export class GLInternalCache {
      private mArrayMapper: GLInternalCacheArrayMapper;

      constructor
      (
         pipelineLayout: IWGLPipelineLayout
        , blockEntries: Array<GLUniformBlockEntry>
        , arrayMapper: GLInternalCacheArrayMapper
      ) {
        this.mArrayMapper = arrayMapper;
        this.setupBlockBindings(blockEntries, this.mArrayMapper);
      }

      setupBlockBindings(
        blockEntries: Array<GLUniformBlockEntry>
        , arrayMapper: GLInternalCacheArrayMapper
      ) : void 
      {

      }
    }
}