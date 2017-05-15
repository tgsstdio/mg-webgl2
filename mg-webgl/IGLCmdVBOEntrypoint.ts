namespace Magnesium {
	export interface IGLCmdVBOEntrypoint
	{
		bindIndexBuffer (vbo: number, bufferId: number) : void;
		bindDoubleVertexAttribute(
      vbo: number
      , location: number
      , size: number
      , pointerType: GLVertexAttributeType
      , offset: number);
		bindIntVertexAttribute(
      vbo: number
      , location: number
      , size: number
      , pointerType: GLVertexAttributeType
      , offset: number) : void;
		bindFloatVertexAttribute (
      vbo: number
      , location: number
      , size: number
      , pointerType: GLVertexAttributeType
      , isNormalized: boolean
      , offset: number) : void;

		setupVertexAttributeDivisor (
      vbo: number
      , location: number
      , divisor: number) : void;

		generateVBO () : number;

		deleteVBO(vbo: number) : void;

		associateBufferToLocation (
      vbo: number
      , location: number
      , bufferId: number
      , offsets: number
      , stride: number) : void;
	}
}