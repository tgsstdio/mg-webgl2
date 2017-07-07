import { MgExtent3D } from '../mg/MgExtent3D'
import { expect } from 'chai'

describe('MgExtent3D', () => {
  it('should have all fields initialized after new()', () => {
    let temp = new MgExtent3D();

    expect(temp).to.have.property('width')
      .which.is.a('number')
      .and.eq(0);
    expect(temp).to.have.property('height')
      .which.is.a('number')
      .and.eq(0);  
    expect(temp).to.have.property('depth')
      .which.is.a('number')
      .and.eq(0);                       
  });
});