export class WGLBindingPointOffsetInfo {
	binding: number;
	first: number;
	last: number;

	equals(other: WGLBindingPointOffsetInfo) : boolean	{
		if (this.binding != other.binding)
			return false;

		if (this.first != other.first)
			return false;

		return this.last == other.last;
	}    
}
