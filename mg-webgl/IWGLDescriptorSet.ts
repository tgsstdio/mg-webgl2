namespace Magnesium {
  export interface IWGLDescriptorSet {
    readonly key: number;
		readonly parent: IWGLDescriptorPool|null;
		readonly resources: Array<GLDescriptorPoolResourceInfo>;

		initialize(resources: Array<GLDescriptorPoolResourceInfo>): void;
		readonly isValidDescriptorSet: boolean;
		invalidate() : void;
		isDifferent(other: IWGLDescriptorSet|null): boolean;
  }
}