import { MgBufferCreateInfo } from '../mg/MgBufferCreateInfo'
import { MgSharingMode } from '../mg/MgSharingMode'
import { expect } from 'chai'

describe('MgBufferCreateInfo', () => {
  it('should have all fields initialized after new()', () => {
    let copy = new MgBufferCreateInfo();
    expect(copy).to.have.property('flags')
      .which.is.eq(0);  
    expect(copy).to.have.property('size')
      .which.is.a('number')
      .and.eq(0);  
    expect(copy).to.have.property('usage')
      .which.is.eq(0);    
    expect(copy).to.have.property('sharingMode')
      .which.is.eq(MgSharingMode.EXCLUSIVE);   
    expect(copy).to.have.property('queueFamilyIndexCount')
      .which.is.a('number')
      .and.eq(0);   
    expect(copy).to.have.property('queueFamilyIndices')
      .which.is.eq(null);
                                
  });
});
