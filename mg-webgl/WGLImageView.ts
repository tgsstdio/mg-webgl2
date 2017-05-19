namespace Magnesium {
  export class WGLImageView implements IMgImageView {
		private mTexture: WebGLTexture;
    constructor(texture: WebGLTexture) {
      this.mTexture = texture;
    }
    
    destroyImageView(
      device : IMgDevice
      , allocator : IMgAllocationCallbacks|null
    ) : void  {

    }
  }
}