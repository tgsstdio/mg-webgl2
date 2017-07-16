import {IWGLSemaphoreEntrypoint}
	from './IWGLSemaphoreEntrypoint';	  
import {WGLSemaphore}
	from '../WGLSemaphore';
import {IWGLSemaphore}
	from '../IWGLSemaphore';	
import {WGLSyncObject}
  from '../WGLSyncObject';
import {IWGLBackbufferContext} from '../IWGLBackbufferContext'

export class WGLSemaphoreEntrypoint implements IWGLSemaphoreEntrypoint {
  private mContext: IWGLBackbufferContext;
  constructor(context:IWGLBackbufferContext) {
    this.mContext = context;
  }  
  
  createSemaphore() : IWGLSemaphore {
    let syncObject = new WGLSyncObject(this.mContext.gl);    
    return new WGLSemaphore(syncObject);
  }
}
