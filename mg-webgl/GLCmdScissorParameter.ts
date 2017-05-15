namespace Magnesium {
  export class GLCmdScissorParameter {
    // TODO: STUB FOR NOW
  }

  /**

  export class GLCmdViewportParameter {
    first: number;
    count: number;
    viewport: GLCmdArraySlice<number>;
    depthRange: GLCmdArraySlice<number>;

		constructor(first: number, viewports: Array<MgViewport>) {
			this.first = first;
			this.count = viewports.length;

			this.viewport = ConvertTo2DViewports(first, viewports);
			this.depthRange = ConvertToDepthRanges(first, viewports);
		}

		convertTo2DViewports(
      first: number
      , viewports: Array<MgViewport>
    ) : GLCmdArraySlice<number>	{
			const FACTOR : number = 4;
			let count = viewports.length;
			let values = new Array<number>(FACTOR * count);

			let copyFn = (dest, offset, vp) => {
				dest [0 + offset] = vp.X;
				dest [1 + offset] = vp.Y;
				dest [2 + offset] = vp.Width;
				dest [3 + offset] = vp.Height;
				return 4;
			};

			GLCmdArraySlice<float>.CopyValues<MgViewport>(values, 0, viewports, copyFn);

			return new GLCmdArraySlice<float> (values, FACTOR, first, count);
		}    

  }
  **/
}