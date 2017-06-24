import {WGLUniformBlockNameInfo}
	from './WGLUniformBlockNameInfo';	 

export interface IWGLUniformBlockNameParser  {
		parse(name: string) : WGLUniformBlockNameInfo;
}
