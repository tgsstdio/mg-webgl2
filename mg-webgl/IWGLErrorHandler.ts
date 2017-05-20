namespace Magnesium {
	export interface IWGLErrorHandler {
		checkError() : void;
		trace(message: string) : void;		
	}
}