/// <reference path="WGLUniformBlockNameInfo.ts" />

namespace Magnesium {
	export class WGLUniformBlockNameParser
    implements IWGLUniformBlockNameParser {
		parse(name: string) : WGLUniformBlockNameInfo
		{
			var tokens = name.split("[]");
			var prefix = "";

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
}
