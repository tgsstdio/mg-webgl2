namespace Magnesium {
  export interface IWGLCmdVertexArrayEntrypoint {
		bindIndexBuffer (
      vbo: WebGLVertexArrayObject
      , bufferId: number
    ): void;

		bindIntVertexAttribute(
      vbo: WebGLVertexArrayObject
      , location: number
      , size: number
      , pointerType: WGLVertexAttributeType
      , stride: number
      , offset: number): void;

		bindFloatVertexAttribute(
      vbo: WebGLVertexArrayObject
      , location: number
      , size: number
      , pointerType: WGLVertexAttributeType
      , isNormalized: boolean
      , stride: number
      , offset: number): void;

		setupVertexAttributeDivisor(
      vbo: WebGLVertexArrayObject
      , location: number
      , divisor: number) : void;

		generateVBO (): WebGLVertexArrayObject;

		deleteVBO(vbo: WebGLVertexArrayObject): void;

    // WARN : offsets must be long
		// associateBufferToLocation(
    //   vbo: WebGLVertexArrayObject
    //   , location: number
    //   , bufferId: number
    //   , offsets: number
    //   , stride: number): void;
  }
}