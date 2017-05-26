namespace Magnesium {
	export class WGLCmdVertexArrayEntrypoint implements IWGLCmdVertexArrayEntrypoint {
    private mGL: WebGL2RenderingContext;
    private mErrHandler: IWGLErrorHandler;
    constructor(
      gl: WebGL2RenderingContext
      , errHandler: IWGLErrorHandler)
    {
      this.mGL = gl;
      this.mErrHandler = errHandler;
    }

		bindIndexBuffer(
      vbo: WebGLVertexArrayObject
      , buffer: WebGLBuffer
    ) : void {
      this.mGL.bindVertexArray(vbo);
      this.mGL.bindBuffer(this.mGL.ELEMENT_ARRAY_BUFFER, buffer);
      this.mErrHandler.logGLError("bindIndexBuffer");
		}

		// public void BindDoubleVertexAttribute (uint vbo, uint location, int size, WGLVertexAttributeType pointerType, uint offset)
		// {
		// 	GL.Ext.EnableVertexArrayAttrib (vbo, location);
		// 	GL.VertexArrayAttribLFormat (vbo, location, size, (All)GetVertexAttribType(pointerType), offset);
    //         mErrHandler.LogGLError(nameof(BindDoubleVertexAttribute));
    //     }

	  bindIntVertexAttribute (
      vbo: WebGLVertexArrayObject
      , location: number
      , size: number
      , pointerType: WGLVertexAttributeType
      , stride: number
      , offset: number
    ): void {
      this.mGL.bindVertexArray(vbo);
			this.mGL.enableVertexAttribArray(location);
      /**
      https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/vertexAttribIPointer
      offset "must be a multiple of type."
      stride <= 255
      **/
			this.mGL.vertexAttribIPointer(
        location
        , size
        , this.getVertexAttribType(pointerType)
        , stride
        , offset);
      this.mErrHandler.logGLError("bindIntVertexAttribute");
		}

		private getVertexAttribType (
      pointerType: WGLVertexAttributeType
    ) : number {
      // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer      
			switch (pointerType)
			{
			case WGLVertexAttributeType.BYTE:
				return this.mGL.BYTE;
			case WGLVertexAttributeType.SHORT:
				return this.mGL.SHORT;

			case WGLVertexAttributeType.UNSIGNED_BYTE:
				return this.mGL.UNSIGNED_BYTE;
			case WGLVertexAttributeType.UNSIGNED_SHORT:
				return this.mGL.UNSIGNED_SHORT;

			case WGLVertexAttributeType.FLOAT:
				return this.mGL.FLOAT;
			case WGLVertexAttributeType.HALF_FLOAT:
				return this.mGL.HALF_FLOAT;

      // FORMAT UNAVAILABLE to WebGL2 in OpenGL 4
			// case WGLVertexAttributeType.DOUBLE:
			// 	return this.mGL.DOUBLE;

			// case WGLVertexAttributeType.INT:
			// 	return this.mGL.INT;
			// case WGLVertexAttributeType.UNSIGNED_INT:
			// 	return this.mGL.UNSIGNED_INT;

			// case WGLVertexAttributeType.INT_2101010_REV:
			// 	return this.mGL.INT_2_10_10_10_REV;
			// case WGLVertexAttributeType.UNSIGNED_INT_2101010_REV:
			// 	return this.mGL.UNSIGNED_INT_2_10_10_10_REV;

			default:
				throw new Error("getVertexAttribType : not supported");
			}
		}

		bindFloatVertexAttribute(
      vbo: WebGLVertexArrayObject
      , location: number
      , size: number
      , pointerType: WGLVertexAttributeType
      , isNormalized: boolean
      , stride: number
      , offset: number) : void
		{
      this.mGL.bindVertexArray(vbo);
			this.mGL.enableVertexAttribArray(location);
      this.mErrHandler.logGLError(
        "bindFloatVertexAttribute.EnableVertexArrayAttrib");
      /**
      https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer
      offset "must be a multiple of type."
      stride <= 255
      **/
      this.mGL.vertexAttribPointer(
        location
        , size
        , this.getVertexAttribType(pointerType)
        , isNormalized
        , stride
        , offset);
      this.mErrHandler.logGLError(
        "bindFloatVertexAttribute.VertexArrayAttribFormat");
		}

		setupVertexAttributeDivisor(
      vbo: WebGLVertexArrayObject
      , location: number
      , divisor: number) : void
		{
      this.mGL.bindVertexArray(vbo);
			this.mGL.vertexAttribDivisor(location, divisor);
      this.mErrHandler.logGLError("setupVertexAttributeDivisor");
		}

		generateVBO () : WebGLVertexArrayObject
		{			
			let result = this.mGL.createVertexArray()
      this.mErrHandler.logGLError("GenerateVBO");
			if (!this.mGL.isVertexArray (result)) 
        throw new Error("generateVBO");
			return result as WebGLVertexArrayObject;
		}

		deleteVBO (vbo: WebGLVertexArrayObject) : void {
			//Debug.Assert (GL.IsVertexArray (vbo));
			this.mGL.deleteVertexArray(vbo);
      this.mErrHandler.logGLError("deleteVBO");
    }

		// public void AssociateBufferToLocation (uint vbo, uint location, uint bufferId, long offsets, uint stride)
		// {
		// 	if (stride >= (uint)int.MaxValue)
		// 	{
		// 		throw new ArgumentOutOfRangeException ("stride", "stride >= int.MaxValue");
		// 	}

		// 	GL.VertexArrayVertexBuffer (vbo, location, bufferId, new IntPtr (offsets), (int)stride);
    //         mErrHandler.LogGLError(nameof(AssociateBufferToLocation));
    //     }
    // }
	}
}
