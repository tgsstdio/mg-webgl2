import {MgGraphicsPipelineCreateInfo}
from '../../mg/MgGraphicsPipelineCreateInfo';  
import {MgShaderStageFlagBits}
from '../../mg/MgShaderStageFlagBits';   
import {WGLUniformBlockNameInfo}
from '../pipeline/WGLUniformBlockNameInfo';	  
import {WGLActiveUniformBlockInfo}
from '../pipeline/WGLActiveUniformBlockInfo';
import {IWGLUniformBlockEntrypoint}
from './IWGLUniformBlockEntrypoint';
import {IWGLGraphicsPipelineCompilerEntrypoint}
	from './IWGLGraphicsPipelineCompilerEntrypoint';	  
import {IWGLErrorHandler}
	from './IWGLErrorHandler';
import {IWGLShaderModuleEntrypoint}
	from './IWGLShaderModuleEntrypoint';	
import {IWGLGraphicsPipelineEntrypoint}
	from './IWGLGraphicsPipelineEntrypoint';	  
import {IWGLUniformBlockNameParser}
	from '../pipeline/IWGLUniformBlockNameParser';
import {WGLProgramUniformBlock}
	from '../pipeline/WGLProgramUniformBlock';
import {IWGLShaderModule}
	from '../pipeline/IWGLShaderModule';	

export class WGLGraphicsPipelineCompilerEntrypoint implements IWGLGraphicsPipelineCompilerEntrypoint {
	private mErrHandler: IWGLErrorHandler;
	private mShaders: IWGLShaderModuleEntrypoint;
	private mPrograms: IWGLGraphicsPipelineEntrypoint;
	private mUniforms: IWGLUniformBlockEntrypoint;
	private mParser: IWGLUniformBlockNameParser;
	constructor(
		errorHandler: IWGLErrorHandler
		, shaders: IWGLShaderModuleEntrypoint
		, programs: IWGLGraphicsPipelineEntrypoint
		, uniforms: IWGLUniformBlockEntrypoint
		, parser: IWGLUniformBlockNameParser
	) {
		this.mErrHandler = errorHandler;
		this.mShaders = shaders;
		this.mPrograms = programs;
		this.mUniforms = uniforms;
		this.mParser = parser;
	}

	public inspect(program: WebGLProgram) : Array<WGLProgramUniformBlock>
	{
			let count = this.mUniforms.getNoOfActiveUniformBlocks(program);
			let entries = new Array<WGLProgramUniformBlock>();
			for (let index = 0; index < count; index += 1)
			{
					let blockName : string = this.mUniforms.getActiveUniformBlockName(
						program, index);
					let token = this.mParser.parse(blockName);
					let blockInfo = this.mUniforms.getActiveUniformBlockInfo(
						program, index);
					token.bindingIndex = blockInfo.bindingIndex;

					let entry = new WGLProgramUniformBlock(
						blockName
						, index
						, blockInfo.stride
						, token);
					entries.push(entry);
			}
			return entries;
	}

	compile(info: MgGraphicsPipelineCreateInfo): WebGLProgram {
		let modules = new Array<WebGLShader>();
		if (info.stages != null) {
			for (let stageInfo of info.stages) {
				let sModule = stageInfo.module as IWGLShaderModule;
				let fileContents = sModule.code.substring(0, sModule.codeSize);
				const FILE_PREFIX = ""

				let shaderId = WGLGraphicsPipelineCompilerEntrypoint.compileShader(
					this.mShaders
					, stageInfo.stage
					, fileContents
					, FILE_PREFIX
					, stageInfo.name);
				modules.push(shaderId);
			}
		}
		return WGLGraphicsPipelineCompilerEntrypoint.linkShaders(
			this.mErrHandler
			, this.mPrograms
			, modules);
	}

	static linkShaders(
		errHandler: IWGLErrorHandler
		, programs: IWGLGraphicsPipelineEntrypoint
		, modules: Array<WebGLShader>
	) : WebGLProgram {
		let program = programs.createProgram();
		for (let shader of modules) {
			programs.attach(program, shader);
		}
		programs.link(program);

		let isCompiled = programs.isCompiled(program);

		let error = programs.getCompilerMessages(program);

		if (!isCompiled) {
			if (error.length > 0) {
				throw new Error(
					"ERROR : Shader compilation failed with messages - "
					+ error);	
			}
			else {
				throw new Error("ERROR : Shader compilation failed");				
			}
		}

		if (error.length > 0) {
			errHandler.trace(error);
		}

		return program;
	}

	static compileShader(
		entrypoint: IWGLShaderModuleEntrypoint
			, stage: MgShaderStageFlagBits
			, fileContents: string
			, shaderPrefix: string
			, functionName: string)
	{
		let shader = entrypoint.createShaderModule(stage);
		// GL.CreateShader(type);
		//string includePath = ".";

		// GLSL has this annoying feature that the #version directive must appear first. But we 
		// want to inject some #define shenanigans into the shader. 
		// So to do that, we need to split for the part of the shader up to the end of the #version line,
		// and everything after that. We can then inject our defines right there.
		let strTuple : {versionStr: string, shaderContents: string } = WGLGraphicsPipelineCompilerEntrypoint.versionSplit(fileContents);
		let versionStr  = strTuple.versionStr;
		let shaderContents  = strTuple.shaderContents;

		let builder : string = "";
		builder += versionStr;
		builder += shaderPrefix;
		builder += shaderContents;
					
		// APPEND custom function name to replicate custom function name
		builder += "void main() { ";
		builder += functionName;
		builder += "(); }";

		entrypoint.compileShaderModule(shader, builder);

		let isCompiled = entrypoint.isCompiled(shader);

		let error = entrypoint.getCompilerMessages(shader);
		if (error.length > 0) {
				throw new Error(
					"ERROR : Shader Compilation failed - " + error);
		}

		if (!isCompiled)
		{
			entrypoint.deleteShaderModule(shader);
			shader = 0;
		}

		return shader;
	}

	static versionSplit(srcString: string) : {versionStr: string, shaderContents: string}
	{
		let length = srcString.length;
		let substrStartPos = 0;
		let eolPos = 0;
		for (eolPos = substrStartPos; eolPos < length; eolPos += 1) {
			if (srcString[eolPos] != '\n') {
				continue;
			}

			if (WGLGraphicsPipelineCompilerEntrypoint.matchVersionLine(srcString, substrStartPos, eolPos + 1))
			{
				return WGLGraphicsPipelineCompilerEntrypoint.divideString(srcString, eolPos + 1);
			}

			substrStartPos = eolPos + 1;
		}

		// Could be on the last line (not really--the shader will be invalid--but we'll do it anyways)
		if (WGLGraphicsPipelineCompilerEntrypoint.matchVersionLine(srcString, substrStartPos, length))
		{
			return WGLGraphicsPipelineCompilerEntrypoint.divideString(srcString, eolPos + 1);
		}

		return {versionStr:"", shaderContents:srcString};
	}

	private static divideString(
		srcString: string
		, splitEndPos: number
	) : {versionStr: string, shaderContents: string} 
	{
		return {
			versionStr: srcString.substring(0, splitEndPos),
			shaderContents: srcString.substring(splitEndPos)
		};
	}

	private static matchVersionLine(
		srcString: string
		, startPos :number
		, endPos: number
	) : boolean
	{
		let checkPos = startPos;
		//Assert(_endPos <= _srcString.Length);

		// GCC doesn't support regexps yet, so we're doing a hand-coded look for 
		// ^\s*#\s*version\s+\d+\s*$
		// Annoying!

		// ^ was handled by the caller.

		// \s*
		while (checkPos < endPos && (srcString[checkPos] == ' ' || srcString[checkPos] == '\t'))
		{
			++checkPos;
		}

		if (checkPos == endPos)
		{
			return false;
		}

		// #
		if (srcString[checkPos] == '#')
		{
			++checkPos;
		}
		else {
			return false;
		}

		if (checkPos == endPos)
		{
			return false;
		}

		// \s*
		while (checkPos < endPos && (srcString[checkPos] == ' ' || srcString[checkPos] == '\t'))
		{
			++checkPos;
		}

		if (checkPos == endPos)
		{
			return false;
		}

		// version
		const kSearchString : string = "version";
		let kSearchStringLen : number = kSearchString.length;

		if (checkPos + kSearchStringLen >= endPos)
		{
			return false;
		}      

		if (srcString.includes(kSearchString, checkPos))
		{
			checkPos += kSearchStringLen;
		}
		else {
			return false;
		}

		// \s+ (as \s\s*)
		if (srcString[checkPos] == ' ' || srcString[checkPos] == '\t')
		{
			++checkPos;
		}
		else {
			return false;
		}

		while (checkPos < endPos && (srcString[checkPos] == ' ' || srcString[checkPos] == '\t'))
		{
			++checkPos;
		}

		if (checkPos == endPos)
		{
			return false;
		}

		// \d+ (as \d\d*)
		if (srcString[checkPos] >= '0' && srcString[checkPos] <= '9')
		{
			++checkPos;
		}
		else {
			return false;
		}

		// Check the version number
		while (checkPos < endPos && (srcString[checkPos] >= '0' && srcString[checkPos] <= '9'))
		{
			++checkPos;
		}

		while (checkPos < endPos && (srcString[checkPos] == ' ' || srcString[checkPos] == '\t'))
		{
			++checkPos;
		}

		while (checkPos < endPos && (srcString[checkPos] == '\r' || srcString[checkPos] == '\n'))
		{
			++checkPos;
		}

		// NOTE that if the string terminates here we're successful (unlike above)
		if (checkPos == endPos)
		{
			return true;
		}

		return false;
	}            
}
