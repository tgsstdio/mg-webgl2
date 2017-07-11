import { MgApplicationInfo } from '../../mg/MgApplicationInfo'
import { expect } from 'chai'

describe('MgApplicationInfo', () => {
  it('should have all fields initialized after new()', () => {
    let info = new MgApplicationInfo();

    expect(info).to.have.property('applicationName')
      .which.is.a('string')
      .and.eq('');
    expect(info).to.have.property('applicationVersion')
      .which.is.a('number')
      .and.eq(0);  
    expect(info).to.have.property('engineName')
      .which.is.a('string')
      .and.eq('');   
    expect(info).to.have.property('engineVersion')
      .which.is.a('number')
      .and.eq(0);  
    expect(info).to.have.property('apiVersion')
      .which.is.a('number')
      .and.eq(0);                       
  });
});