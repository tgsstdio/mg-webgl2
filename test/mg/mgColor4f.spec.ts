import { MgColor4f } from '../../mg/MgColor4f'
import { expect } from 'chai'

describe('MgColor4f', () => {
  it('should have all fields initialized after new()', () => {
    const EXPECTED_R = 0.25;
    const EXPECTED_G = 0;
    const EXPECTED_B = 0.75;
    const EXPECTED_A = 1.0;
    let temp = new MgColor4f(EXPECTED_R, EXPECTED_G, EXPECTED_B, EXPECTED_A);

    expect(temp).to.have.property('r')
      .which.is.a('number')
      .and.eq(EXPECTED_R);
    expect(temp).to.have.property('g')
      .which.is.a('number')
      .and.eq(EXPECTED_G);  
    expect(temp).to.have.property('b')
      .which.is.a('number')
      .and.eq(EXPECTED_B);     
    expect(temp).to.have.property('a')
      .which.is.a('number')
      .and.eq(EXPECTED_A);                           
  });
});