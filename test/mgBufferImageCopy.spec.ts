import { MgBufferImageCopy } from '../mg/MgBufferImageCopy'
import { expect } from 'chai'
import {MgOffset3D}
	from '../mg/MgOffset3D';
import {MgExtent3D}
	from '../mg/MgExtent3D';
  import {MgImageSubresourceLayers}
	from '../mg/MgImageSubresourceLayers';	

describe('MgBufferImageCopy', () => {
  it('should have all fields initialized after new()', () => {
    let copy = new MgBufferImageCopy();
    expect(copy).to.have.property('bufferOffset')
      .which.is.a('number')
      .and.eq(0);  
    expect(copy).to.have.property('bufferRowLength')
      .which.is.a('number')
      .and.eq(0);  
    expect(copy).to.have.property('bufferImageHeight')
      .which.is.a('number')
      .and.eq(0);                  
    expect(copy).to.have.property('imageSubresource')
      .which.is.an.instanceOf(MgImageSubresourceLayers); 
    expect(copy).to.have.property('imageOffset')
      .which.is.an.instanceOf(MgOffset3D);
    expect(copy).to.have.property('imageExtent')
      .which.is.an.instanceOf(MgExtent3D);                 
  });
});