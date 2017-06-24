import {MgShaderStageFlagBits} from '../mg/MgShaderStageFlagBits';

export interface IWGLShaderModuleEntrypoint {
	createShaderModule(stage: MgShaderStageFlagBits) : WebGLShader;
	compileShaderModule(shader:WebGLShader, builder: string): void;
	deleteShaderModule(shader:WebGLShader): void;
	getCompilerMessages(shader:WebGLShader): string;
	isCompiled(shader:WebGLShader) : boolean;
}
