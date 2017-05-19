namespace Magnesium {
  export interface IWGLShaderModuleEntrypoint {
      createShaderModule(stage: MgShaderStageFlagBits) : any;
      compileShaderModule(shader:any, builder: string): void;
      deleteShaderModule(shader:any): void;
      getCompilerMessages(shader:any): string;
      hasCompilerMessages(shader:any): boolean;
      isCompiled(shader:any) : boolean;
  }

	export class WGLGraphicsPipelineCompiler implements IWGLGraphicsPipelineCompiler {
		compile(info: MgGraphicsPipelineCreateInfo): number {
      let modules = new Array<number>();
      if (info.stages != null) {
        for (let stage of info.stages) {
          let module : WGLShaderModule = stage.module as WGLShaderModule;
          
        }
      }
      return 0;
    }

		static compileShader(
      entrypoint: IWGLShaderModuleEntrypoint
       , stage: MgShaderStageFlagBits
       , fileContents: string
       , shaderPrefix: string
       , functionName: string)
		{
			let retVal = entrypoint.createShaderModule(stage);
			// GL.CreateShader(type);
			//string includePath = ".";

			// GLSL has this annoying feature that the #version directive must appear first. But we 
			// want to inject some #define shenanigans into the shader. 
			// So to do that, we need to split for the part of the shader up to the end of the #version line,
			// and everything after that. We can then inject our defines right there.
			let strTuple : {versionStr: string, shaderContents: string } = WGLGraphicsPipelineCompiler.versionSplit(fileContents);
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

      entrypoint.compileShaderModule(retVal, builder);

			//GL.ShaderSource(retVal, builder.ToString());
			//GL.CompileShader(retVal);

			let isCompiled = entrypoint.isCompiled(retVal);

			let hasMessages : boolean = entrypoint.hasCompilerMessages(retVal);

			if (hasMessages)
			{
				let buffer = entrypoint.getCompilerMessages(retVal);
				if (!isCompiled)
				{
					throw new Error("Shader Compilation failed for shader with the following errors: " + buffer);
				}
			}

			if (!isCompiled)
			{
				entrypoint.deleteShaderModule(retVal);
				retVal = 0;
			}

			return retVal;
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

				if (WGLGraphicsPipelineCompiler.matchVersionLine(srcString, substrStartPos, eolPos + 1))
				{
					return WGLGraphicsPipelineCompiler.divideString(srcString, eolPos + 1);
				}

				substrStartPos = eolPos + 1;
			}

			// Could be on the last line (not really--the shader will be invalid--but we'll do it anyways)
			if (WGLGraphicsPipelineCompiler.matchVersionLine(srcString, substrStartPos, length))
			{
				return WGLGraphicsPipelineCompiler.divideString(srcString, eolPos + 1);
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
}