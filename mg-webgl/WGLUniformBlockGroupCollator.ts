namespace Magnesium {
  export class WGLUniformBlockGroupCollator {
    private mPrefixes: Map<string, WGLUniformBlockGroupInfo>;

    get prefixes(): Map<string, WGLUniformBlockGroupInfo> {
      return this.mPrefixes;
    }

    constructor() {
      this.mPrefixes = new Map<string, WGLUniformBlockGroupInfo>();
    }

    add(entry: WGLUniformBlockNameInfo) {
      if(this.mPrefixes.has(entry.prefix)) {
        let found = this.mPrefixes.get(entry.prefix) as WGLUniformBlockGroupInfo;
        
        if (entry.x == 0 && entry.y == 0 && entry.z == 0) {
          found.firstBinding = entry.bindingIndex;
        }

        found.arrayStride = Math.max(found.arrayStride, entry.x + 1);
        found.highestRow = Math.max(found.highestRow, entry.y + 1);
        found.highestLayer = Math.max(found.highestLayer, entry.z + 1);
        found.count += 1;
      }
      else {
        let group = new WGLUniformBlockGroupInfo();
        group.prefix = entry.prefix;
        group.firstBinding = entry.bindingIndex;
        group.count = 1;
        group.arrayStride = entry.x + 1;
        group.highestRow = entry.y + 1;
        group.highestLayer = entry.z + 1;
        this.mPrefixes.set(entry.prefix, group);
      }
    }

    collate() : Map<number, WGLUniformBlockGroupInfo> {
      let sortedResults = new Map<number, WGLUniformBlockGroupInfo>();
      for (let group of this.mPrefixes.values()) {
        group.matrixStride = (group.arrayStride * Math.max(group.highestRow, 1));
        group.cubeStride = (group.matrixStride * Math.max(group.highestLayer, 1));
        sortedResults.set(group.firstBinding, group);
      }
      return sortedResults;
    }
  }
}