namespace Magnesium {
  export class WGLDescriptorSet
    implements IWGLDescriptorSet {

    private mKey : number;
    get key(): number {
      return this.mKey;
    }

    private mParent: IWGLDescriptorPool|null;
    get parent(): IWGLDescriptorPool|null {
      return this.mParent;
    }

    private mIsValidDescriptorSet: boolean;
    get isValidDescriptorSet() : boolean {
      return this.mIsValidDescriptorSet;
    }

    constructor(
      key: number
      , parent: IWGLDescriptorPool
    ) {
      this.mKey = key;
      this.mParent = parent;
      this.mIsValidDescriptorSet = false;
    }

    private mResources: Array<GLDescriptorPoolResourceInfo>|null;
    get resources(): Array<GLDescriptorPoolResourceInfo> {
      if (this.mResources == null)
        throw new Error('this.mResources is null');

      return this.mResources as Array<GLDescriptorPoolResourceInfo>;
    }

    initialize(resources: Array<GLDescriptorPoolResourceInfo>) {
      this.mResources = resources;
      this.mIsValidDescriptorSet = true;
    }

    invalidate(): void {
      this.mResources = null;
      this.mIsValidDescriptorSet = false;
    }
  }
}