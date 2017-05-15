/// <reference path="GLPoolResourceTicket.ts" />

namespace Magnesium {
  export interface IGLDescriptorPoolResource<T> {
    readonly items: Array<T>;
		readonly count: number;
		allocate(request: number, out: {ticket: GLPoolResourceTicket} ): boolean;
		free(ticket: GLPoolResourceTicket) : boolean;
  }  
}