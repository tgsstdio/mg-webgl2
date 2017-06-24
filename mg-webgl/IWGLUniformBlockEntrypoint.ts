import {WGLActiveUniformBlockInfo}
	from './WGLActiveUniformBlockInfo';

export interface IWGLUniformBlockEntrypoint {
	getNoOfActiveUniformBlocks(program: WebGLProgram) : number;
	getActiveUniformBlockName(
		program: WebGLProgram
		, index: number
	) : string;
	getActiveUniformBlockInfo(
		program: WebGLProgram
		, index: number
	) : WGLActiveUniformBlockInfo;
}
