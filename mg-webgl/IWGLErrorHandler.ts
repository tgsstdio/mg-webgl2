export interface IWGLErrorHandler {
	checkError() : void;
	logGLError(message: string) : void;
	trace(message: string) : void;
}
