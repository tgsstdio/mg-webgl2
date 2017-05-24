namespace Magnesium {
  export class WGLDescriptorPoolResource<TData>
    implements IGLDescriptorPoolResource<TData> {
    private mItems: Array<TData>;
    get items(): Array<TData> {
      return this.mItems;
    }

    private mCount: number;
    get count() : number {
      return this.mCount;
    }

    private mHead: WGLPoolResourceNode|null;

    constructor(
      count:number
      , items: Array<TData>
    ) {
      this.mItems = items;
      this.mCount = count;

      let head = new WGLPoolResourceNode();
      head.first = 0;
      head.last = (count > 0) ? count - 1 : 0;
      head.count = count;
      head.next = null;

      this.mHead = head;
    }

    allocate(
      request: number
      , out: { range: GLPoolResourceTicket|null }
    ) : boolean {
      if (request == 0) {
        throw new Error('request must be greater than 0');
      }

      {
				// FIRST LOOP : SCAN FOR EXACT MATCHES
				let current: WGLPoolResourceNode|null = this.mHead;
				let previous: WGLPoolResourceNode|null = null;

        while (current != null) {
          if (current.count == request) {
            let result_0 = new GLPoolResourceTicket();
            result_0.first = current.first;
            result_0.last = current.last;
            result_0.count = current.count;

            out.range = result_0;

            // remove current from linked list
            if (previous != null) {
              let lastNode = previous as WGLPoolResourceNode;
              lastNode.next = current.next; 
            }

            if (this.mHead === current) {
              this.mHead = current.next;
            }

            return true;
          }
					previous = current;
					current = current.next;
        }
      }

      {
				// SECOND LOOP : FIND FIRST BLOCK LARGE ENOUGH AND SPLIT 
				let current: WGLPoolResourceNode|null = this.mHead;
        while (current != null) {
          if (current.count > request) {

            let result_1 = new GLPoolResourceTicket();
            result_1.first = current.first;
            result_1.last = request + current.first - 1;
            result_1.count = request;

            // adjust current
            current.first += request;
            current.count -= request;

            out.range = result_1;
            return true;
          }
					current = current.next;          
        }           
      }

			// NOT FOUND
      out.range = null;
      return false;
    }

    free(ticket: GLPoolResourceTicket) : boolean {
      if (this.mHead == null) {
        let head = new WGLPoolResourceNode();
        head.first = ticket.first;
        head.last = ticket.last;
        head.count = ticket.count;
        this.mHead = head;

        return true;
      }
      else {
				let previous: WGLPoolResourceNode|null = null;        
				let current: WGLPoolResourceNode|null = this.mHead;

        while (current != null) {
          // SAME TICKET RANGE RECOVERY
          if (ticket.first == current.first) {
            // DO NOTHING IF INSIDE RANGE
						if (ticket.last <= current.last && ticket.count <= current.count)	{
							return true;
						}
						else {
							this.adjustTicketsSpan(ticket, current);
							return true;
						}
          }
          // GAP-BASED SLOT RECOVERY
          else if (ticket.first < current.first) {
            this.performMerge(previous, ticket, current);
            return true;
          }

					previous = current;
					current = current.next;          
        }

				// At end of linked list
				this.performMerge(previous, ticket, null);
				return true;
      }
    }

    private adjustTicketsSpan(
      ticket: GLPoolResourceTicket
      , parent: WGLPoolResourceNode|null
    ) : void {
      let lastNode: WGLPoolResourceNode|null = null;
			let intercepts: boolean = false;

      let parentNode: WGLPoolResourceNode = parent as WGLPoolResourceNode;
      let current:WGLPoolResourceNode|null = parentNode.next;
      while (current != null) {
        lastNode = current;
				if (current.last > ticket.last)	{
					intercepts = (current.first <= ticket.last);
					break;
				}

				// remove from the list
				parentNode.next = current.next;
				current = current.next;               
      }

			parentNode.last = (lastNode != null && intercepts) ? lastNode.last : ticket.last;
			parentNode.count = parentNode.last - parentNode.first + 1;      

      if (current == null) {
				// ITERATED THRU THEN POINT TO END
				parentNode.next = null;
			}
			else if (lastNode != null && intercepts) {
				// INCLUDE LAST NODE
				parentNode.next = lastNode.next;
			}
			else {
				// OUTSIDE OF LAST NODE
				parentNode.next = lastNode;
			}
    }

    private performMerge(
      left:WGLPoolResourceNode|null
      , ticket: GLPoolResourceTicket
      , right:WGLPoolResourceNode|null
    ) : void {
      let leftMerge:boolean = left != null && (ticket.first == (left.last + 1));
      let rightMerge:boolean = right != null && ((ticket.last + 1) == right.first);

      this.validateTicket(ticket);
      this.validateLocation(left, ticket, right);

      if (leftMerge && rightMerge) {
        let leftNode = left as WGLPoolResourceNode;
        let rightNode = right as WGLPoolResourceNode;

				let finalCount = leftNode.count + ticket.count + rightNode.count;

				leftNode.count = finalCount;
				leftNode.last = rightNode.last;
				leftNode.next = rightNode.next;        
      }
      else if (leftMerge) {
        let leftNode = left as WGLPoolResourceNode;

		    let finalCount = leftNode.count + ticket.count;

				leftNode.count = finalCount;
				leftNode.last = ticket.last;        
      }
      else if (rightMerge) {
        let rightNode = right as WGLPoolResourceNode;

        let finalCount = rightNode.count + ticket.count;

				rightNode.count = finalCount;
				rightNode.first = ticket.first;
      }
      else {
        let inbetween = new WGLPoolResourceNode();
				inbetween.first = ticket.first;
				inbetween.last = ticket.last;
				inbetween.count = ticket.count;
				
        if (left == null) {
          inbetween.next = this.mHead;
          this.mHead = inbetween;
        }
        else {
          left.next = inbetween;
          inbetween.next = right;
        }
      }
    }

    private validateTicket(ticket: GLPoolResourceTicket) {
      if ((ticket.first + ticket.count) > this.mCount) {
        throw new Error('validateTicket: invalid operation');
      }

			if (ticket.count == 0) {
        throw new Error('validateTicket: invalid operation');
      }

			if ((ticket.first + ticket.count - 1) != ticket.last) {
       throw new Error('validateTicket: invalid operation');
      }

			if (ticket.last > this.mCount) {
       throw new Error('validateTicket: invalid operation');
      }
    }

		private validateLocation(
      previous: WGLPoolResourceNode|null 
      , ticket: GLPoolResourceTicket 
      , current: WGLPoolResourceNode|null 
    ) : void {
			if (previous != null && previous.last >= ticket.first) {
        throw new Error('validateLocation: invalid operation');
      }

			if (current != null && current.first <= ticket.last) {
        throw new Error('validateLocation: invalid operation');
      }
		}    
  }
}