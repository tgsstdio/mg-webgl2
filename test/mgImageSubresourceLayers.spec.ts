import { MgImageSubresourceLayers } from '../mg/MgImageSubresourceLayers'
import {MgImageAspectFlagBits} from '../mg/MgImageAspectFlagBits'
import { expect } from 'chai'

describe('MgImageSubresourceLayers', () => {
  it('should have all fields initialized after new()', () => {
    let layers = new MgImageSubresourceLayers();
    expect(layers).to.have.property('aspectMask')
      .which.is.eq(0);  
    expect(layers).to.have.property('mipLevel')
      .which.is.a('number')
      .and.eq(0);  
    expect(layers).to.have.property('baseArrayLayer')
      .which.is.a('number')
      .and.eq(0); 
    expect(layers).to.have.property('layerCount')
      .which.is.a('number')
      .and.eq(0);            
  })
});