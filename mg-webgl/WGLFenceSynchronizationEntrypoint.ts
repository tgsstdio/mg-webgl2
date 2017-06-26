import {IWGLFenceSynchronizationEntrypoint}
	from './IWGLFenceSynchronizationEntrypoint';	  

export class WGLFenceSynchronizationEntrypoint implements IWGLFenceSynchronizationEntrypoint {
  private mIncrementalTimeoutStep: number;
  // step: time in milliseconds
  constructor(step: number) {
    this.mIncrementalTimeoutStep = step;
  }

  get incrementalTimeoutStep(): number {
    return this.mIncrementalTimeoutStep;
  }

  set incrementalTimeoutStep(value: number) {
    this.mIncrementalTimeoutStep = value;
  }
}