namespace Magnesium {
	export class GLImageArraySubresource {		
    private mIndex : number;
    private mLevels: Array<GLImageLevelSubresource>;
    constructor (
      index: number
      , layers: Array<GLImageLevelSubresource>
    )	{
			this.mIndex = index;
			this.mLevels = layers;
		}

		get index() : number { 
      return this.mIndex;
    }

		get levels(): Array<GLImageLevelSubresource> {
      return this.mLevels;
    }
	}
}

