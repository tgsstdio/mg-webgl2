import {IMgDisposable} from '../../mg/IMgDisposable';
import {IWGLCmdVertexArrayEntrypoint} from '../entrypoint/IWGLCmdVertexArrayEntrypoint';

export class WGLCmdVertexBufferObject implements IMgDisposable {
  private mVertexArray : WebGLVertexArrayObject|null;
  get vertexArray(): WebGLVertexArrayObject|null {
    return this.mVertexArray;
  }

  private mFactory: IWGLCmdVertexArrayEntrypoint;
  constructor(
    vbo: WebGLVertexArrayObject|null
    , factory : IWGLCmdVertexArrayEntrypoint
  ) {
    this.mVertexArray = vbo;
    this.mFactory = factory;
  }

  private mDisposed: boolean = false;
  dispose(): void {
    if (this.mDisposed)
      return;

    if (this.mFactory != null && this.mVertexArray != null)
      this.mFactory.deleteVBO(this.mVertexArray);

    this.mDisposed = true;
  }    
}
