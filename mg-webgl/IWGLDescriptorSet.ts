import {IWGLDescriptorPool} from './IWGLDescriptorPool';
import {WGLDescriptorPoolResourceInfo}
	from './WGLDescriptorPoolResourceInfo';

export interface IWGLDescriptorSet {
	readonly key: number;
	readonly parent: IWGLDescriptorPool|null;
	readonly resources: Array<WGLDescriptorPoolResourceInfo>;

	initialize(resources: Array<WGLDescriptorPoolResourceInfo>): void;
	readonly isValidDescriptorSet: boolean;
	invalidate() : void;
	isDifferent(other: IWGLDescriptorSet|null): boolean;
}
