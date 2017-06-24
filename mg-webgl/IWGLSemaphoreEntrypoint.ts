import {IWGLSemaphore}
	from './IWGLSemaphore';

export interface IWGLSemaphoreEntrypoint {
  createSemaphore() : IWGLSemaphore;
}
