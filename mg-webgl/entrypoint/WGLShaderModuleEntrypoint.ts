import {IWGLShaderModuleEntrypoint} from './IWGLShaderModuleEntrypoint';
import {MgShaderStageFlagBits} from '../../mg/MgShaderStageFlagBits';
import {IWGLBackbufferContext} from '../IWGLBackbufferContext';

export class WGLShaderModuleEntrypoint implements IWGLShaderModuleEntrypoint {
	private mGLContext: IWGLBackbufferContext;
	constructor(glContext: IWGLBackbufferContext) {
		this.mGLContext= glContext;
	}

	createShaderModule(stage: MgShaderStageFlagBits) : WebGLShader {
		const VERTEX_SHADER: number = 0x8B31;
		const FRAGMENT_SHADER: number = 0x8B30;

		let shaderType: number = VERTEX_SHADER;
		switch (stage)
		{
			case MgShaderStageFlagBits.FRAGMENT_BIT:
				shaderType = FRAGMENT_SHADER;
				break;
			case MgShaderStageFlagBits.VERTEX_BIT:
				shaderType = VERTEX_SHADER;
				break;
			default:
				throw new Error('shader stage not supported');
		}
		return this.mGLContext.gl.createShader(shaderType) as WebGLShader;
	}

	compileShaderModule(
		shader:WebGLShader
		, builder: string
	): void {
		this.mGLContext.gl.shaderSource(shader, builder);
		this.mGLContext.gl.compileShader(shader);			
	}

	deleteShaderModule(shader:WebGLShader): void {
		this.mGLContext.gl.deleteShader(shader);
	}

	isCompiled(shader:WebGLShader): boolean {
		const COMPILE_STATUS: number = 0x8B81;

		let isCompiled: boolean = this.mGLContext.gl.getShaderParameter(
			shader
			, COMPILE_STATUS) as boolean;
		return isCompiled;
	}

	getCompilerMessages(shader:WebGLShader): string {
		let error = this.mGLContext.gl.getShaderInfoLog(shader) as string;
		return error;
	}	
}
