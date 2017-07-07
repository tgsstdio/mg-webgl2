import { MgOffset3D } from '../mg/MgOffset3D'
import { expect } from 'chai'

describe('MgOffset3D', () => {
  it('should have all fields initialized after new()', () => {
    let temp = new MgOffset3D();

    expect(temp).to.have.property('x')
      .which.is.a('number')
      .and.eq(0);
    expect(temp).to.have.property('y')
      .which.is.a('number')
      .and.eq(0);  
    expect(temp).to.have.property('z')
      .which.is.a('number')
      .and.eq(0);                       
  });
});