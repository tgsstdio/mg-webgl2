import {MgResult}
	from '../mg/MgResult';  
import {IWGLSyncObject}
	from './IWGLSyncObject';	

export class WGLSyncTaskInfo {
  constructor(
    resolve: (value: MgResult) => void
    , syncObjects: Array<IWGLSyncObject>
    , waitAll: boolean
    , timeout: number
    , step: number
  ) {
    const NANO_TO_MILLISECONDS = 1000000;	

    this.resolve = resolve;
    this.syncObjects = syncObjects;
    this.required = (waitAll) ? syncObjects.length : 1;
    this.timeout = timeout / NANO_TO_MILLISECONDS;	    
    this.atStart = performance.now();
    this.step = step;
  }

  step: number;
  atStart: number;
  timeout: number;
  resolve: (value: MgResult) => void;
  syncObjects: Array<IWGLSyncObject>;
  required: number;

  static evaluate(
    task: WGLSyncTaskInfo
  ): void {
    let current = performance.now();	
    let diff = current - task.atStart;
    
    let count = task.syncObjects.length;
    let noOfCompletedTasks = 0;
    for (let i = 0; i < count; i += 1) {		
      if (task.syncObjects[i].isReady(diff)) {
        noOfCompletedTasks += 1;
      }
    }
    
    if (noOfCompletedTasks >= task.required) {
      task.resolve(MgResult.SUCCESS);
    }			
    else if (diff < task.timeout) {
      setTimeout(WGLSyncTaskInfo.evaluate, task.step, task)
    }
    else {
      task.resolve(MgResult.TIMEOUT);
    }	 
  }

  schedule(): void { 
    setTimeout(WGLSyncTaskInfo.evaluate, this.step, this);
  }
}