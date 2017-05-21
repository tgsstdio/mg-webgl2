/// <reference path="../mg-webgl/IWGLPipelineLayout.ts" />
/// <reference path="WGLProgramUniformBlock.ts" />
/// <reference path="WGLUniformBlockGroupInfo.ts" />

namespace Magnesium {
  export class WGLInternalCacheArrayMapper {
    private mLayout: IWGLPipelineLayout;
    private mCollator: WGLUniformBlockGroupCollator;
    private mGroups:Map<number, WGLUniformBlockGroupInfo>;
    constructor(
      layout: IWGLPipelineLayout
      , blockEntries: Array<WGLProgramUniformBlock>
    ) {
      this.mLayout = layout;
      this.mCollator = new WGLUniformBlockGroupCollator();
      for (let entry of blockEntries) {
        this.mCollator.add(entry.token);
      }

      this.mGroups = this.mCollator.collate();
      this.deriveFirstBindings(blockEntries);
    }

    private deriveFirstBindings(
        blockEntries: Array<WGLProgramUniformBlock>
    ) {
        for (let entry of blockEntries) {
            let prefix = entry.token.prefix;
            if (this.mCollator.prefixes.has(prefix)) {            
              let found = this.mCollator.prefixes.get(prefix) as WGLUniformBlockGroupInfo;
              entry.firstBinding = found.firstBinding;            
            }
        }
    }

    calculateArrayIndex(
      entry: WGLProgramUniformBlock
    ) : number {
			let bindingPoint = 0;

      if (this.mGroups.has(entry.firstBinding)) {
			  let mapGroup = this.mGroups.get(entry.firstBinding) as WGLUniformBlockGroupInfo;

        // ROW-ORDER 
        bindingPoint += entry.token.x;
        bindingPoint += (mapGroup.arrayStride * entry.token.y);
        bindingPoint += (mapGroup.matrixStride * entry.token.z);

        if (this.mLayout.ranges.has(entry.firstBinding)) {
          let arrayOffset = this.mLayout.ranges.get(entry.firstBinding) as GLBindingPointOffsetInfo;
          bindingPoint += arrayOffset.first;
        }
      }
			return bindingPoint;
		}        
  }
}