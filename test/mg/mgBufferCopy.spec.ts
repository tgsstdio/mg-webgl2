import { MgBufferCopy } from '../../mg/MgBufferCopy'
import { expect } from 'chai'

describe('MgBufferCopy', () => {
  it('should have all fields initialized after new()', () => {
    let copy = new MgBufferCopy();
    expect(copy).to.have.property('srcOffset')
      .which.is.a('number')
      .and.eq(0);  
    expect(copy).to.have.property('dstOffset')
      .which.is.a('number')
      .and.eq(0);  
    expect(copy).to.have.property('size')
      .which.is.a('number')
      .and.eq(0);                  
  });
});
