import {WGLUniformBlockNameInfo}
	from './WGLUniformBlockNameInfo';	  
import {IWGLUniformBlockNameParser}
	from './IWGLUniformBlockNameParser';

export class WGLUniformBlockNameParser
	implements IWGLUniformBlockNameParser {
	parse(name: string) : WGLUniformBlockNameInfo
	{
		let tokens = name.split(/\[|\]|\s/).filter(x => x.length > 0);
		let prefix = "";

		if (tokens.length >= 1)
		{
			prefix = tokens[0];
		}

		let x = 0;
		if (tokens.length >= 2)
		{
			x = Number.parseInt(tokens[1]);
		}

		let y = 0;
		if (tokens.length >= 3)
		{
			y = Number.parseInt(tokens[2]);
		}

		let z = 0;
		if (tokens.length >= 4)
		{
			z = Number.parseInt(tokens[3]);
		}

		return new WGLUniformBlockNameInfo(prefix, x,	y, z);
	}

}

