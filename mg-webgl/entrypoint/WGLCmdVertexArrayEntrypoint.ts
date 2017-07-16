import {IWGLCmdVertexArrayEntrypoint}
	from './IWGLCmdVertexArrayEntrypoint';	  
import {IWGLErrorHandler}
	from './IWGLErrorHandler';
import {WGLVertexAttributeType}
	from '../pipeline/WGLVertexAttributeType';	  
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';

export class WGLCmdVertexArrayEntrypoint implements IWGLCmdVertexArrayEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    glContext: IWGLBackbufferContext
    , errHandler: IWGLErrorHandler)
  {
    this.mGLContext = glContext;
    this.mErrHandler = errHandler;
  }

  bindVertexArray(vbo: WebGLVertexArrayObject|null) : void {
    this.mGLContext.gl.bindVertexArray(vbo);
  }

  unbindVertexArray() : void {
    this.mGLContext.gl.bindVertexArray(null);
  }    

  bindIndexBuffer(
    buffer: WebGLBuffer
  ) : void {
    const ELEMENT_ARRAY_BUFFER: number = 0x8893;

    this.mGLContext.gl.bindBuffer(ELEMENT_ARRAY_BUFFER, buffer);
    this.mErrHandler.logGLError("bindIndexBuffer");
  }

  // public void BindDoubleVertexAttribute (uint vbo, uint location, int size, WGLVertexAttributeType pointerType, uint offset)
  // {
  // 	GL.Ext.EnableVertexArrayAttrib (vbo, location);
  // 	GL.VertexArrayAttribLFormat (vbo, location, size, (All)GetVertexAttribType(pointerType), offset);
  //         mErrHandler.LogGLError(nameof(BindDoubleVertexAttribute));
  //     }

  bindIntVertexAttribute (
    location: number
    , size: number
    , pointerType: WGLVertexAttributeType
    , stride: number
    , offset: number
  ): void {
    this.mGLContext.gl.enableVertexAttribArray(location);
    /**
    https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/vertexAttribIPointer
    offset "must be a multiple of type."
    stride <= 255
    **/
    this.mGLContext.gl.vertexAttribIPointer(
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
    const BYTE: number = 0x1400;
    const SHORT: number = 0x1402;
    const UNSIGNED_BYTE: number = 0x1401;
    const UNSIGNED_SHORT: number = 0x1403;
    const FLOAT: number = 0x1406;                
    const HALF_FLOAT: number = 0x140B;   
    
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer      
    switch (pointerType) {
    case WGLVertexAttributeType.BYTE:
      return BYTE;
    case WGLVertexAttributeType.SHORT:
      return SHORT;

    case WGLVertexAttributeType.UNSIGNED_BYTE:
      return UNSIGNED_BYTE;
    case WGLVertexAttributeType.UNSIGNED_SHORT:
      return UNSIGNED_SHORT;

    case WGLVertexAttributeType.FLOAT:
      return FLOAT;
    case WGLVertexAttributeType.HALF_FLOAT:
      return HALF_FLOAT;

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
      location: number
    , size: number
    , pointerType: WGLVertexAttributeType
    , isNormalized: boolean
    , stride: number
    , offset: number) : void
  {
    this.mGLContext.gl.enableVertexAttribArray(location);
    this.mErrHandler.logGLError(
      "bindFloatVertexAttribute.EnableVertexArrayAttrib");
    /**
    https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer
    offset "must be a multiple of type."
    stride <= 255
    **/
    this.mGLContext.gl.vertexAttribPointer(
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
      location: number
    , divisor: number) : void
  {
    this.mGLContext.gl.vertexAttribDivisor(location, divisor);
    this.mErrHandler.logGLError("setupVertexAttributeDivisor");
  }

  generateVBO () : WebGLVertexArrayObject
  {			
    let result = this.mGLContext.gl.createVertexArray()
    this.mErrHandler.logGLError("GenerateVBO");
    return result as WebGLVertexArrayObject;
  }

  deleteVBO (vbo: WebGLVertexArrayObject) : void {
    //Debug.Assert (GL.IsVertexArray (vbo));
    this.mGLContext.gl.deleteVertexArray(vbo);
    this.mErrHandler.logGLError("deleteVBO");
  }
  // WARN : offsets must be long
  bindVertexBuffer(
      bufferId: WebGLBuffer|null
  ) : void {
    const ARRAY_BUFFER: number = 0x8892;

    this.mGLContext.gl.bindBuffer(ARRAY_BUFFER, bufferId);
    this.mErrHandler.logGLError("bindVertexBuffer");
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

