namespace Magnesium {
  export class GLBindingPointOffsetInfo {
    binding: number;
    first: number;
    last: number;

		equals(other: GLBindingPointOffsetInfo) : boolean	{
			if (this.binding != other.binding)
				return false;

			if (this.first != other.first)
				return false;

			return this.last == other.last;
		}    
  }
}