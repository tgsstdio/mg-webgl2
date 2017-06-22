import {WGLPoolResourceTicket} from './WGLPoolResourceTicket'

export interface IWGLDescriptorPoolResource<T> {
  readonly items: Array<T>;
  readonly count: number;
  allocate(
    request: number
    , out: {range: WGLPoolResourceTicket|null}
  ): boolean;
  free(ticket: WGLPoolResourceTicket) : boolean;
}  
