import {WGLImageLevelSubresource} from './WGLImageLevelSubresource'

export class WGLImageArraySubresource {		
  private mIndex : number;
  private mLevels: Array<WGLImageLevelSubresource>;
  constructor (
    index: number
    , layers: Array<WGLImageLevelSubresource>
  )	{
    this.mIndex = index;
    this.mLevels = layers;
  }

  get index() : number { 
    return this.mIndex;
  }

  get levels(): Array<WGLImageLevelSubresource> {
    return this.mLevels;
  }
}


