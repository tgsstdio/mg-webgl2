import {IWGLShaderModuleEntrypoint} from './IWGLShaderModuleEntrypoint';
import {MgShaderStageFlagBits} from '../../mg/MgShaderStageFlagBits';

export class WGLShaderModuleEntrypoint implements IWGLShaderModuleEntrypoint {
	private mGL: WebGLRenderingContext;
	constructor(gl: WebGLRenderingContext) {
		this.mGL= gl;
	}

	createShaderModule(stage: MgShaderStageFlagBits) : WebGLShader {
		let shaderType = this.mGL.VERTEX_SHADER;
		switch (stage)
		{
			case MgShaderStageFlagBits.FRAGMENT_BIT:
				shaderType = this.mGL.FRAGMENT_SHADER;
				break;
			case MgShaderStageFlagBits.VERTEX_BIT:
				shaderType = this.mGL.VERTEX_SHADER;
				break;
			default:
				throw new Error('shader stage not supported');
		}
		return this.mGL.createShader(shaderType) as WebGLShader;
	}

	compileShaderModule(
		shader:WebGLShader
		, builder: string
	): void {
		this.mGL.shaderSource(shader, builder);
		this.mGL.compileShader(shader);			
	}

	deleteShaderModule(shader:WebGLShader): void {
		this.mGL.deleteShader(shader);
	}

	isCompiled(shader:WebGLShader): boolean {
		let isCompiled: boolean = this.mGL.getShaderParameter(
			shader
			, this.mGL.COMPILE_STATUS) as boolean;
		return isCompiled;
	}

	getCompilerMessages(shader:WebGLShader): string {
		let error = this.mGL.getShaderInfoLog(shader) as string;
		return error;
	}	
}
