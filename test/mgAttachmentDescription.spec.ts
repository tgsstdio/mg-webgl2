import { MgAttachmentDescription } from '../mg/MgAttachmentDescription'
import { MgFormat } from '../mg/MgFormat'
import { MgAttachmentStoreOp } from '../mg/MgAttachmentStoreOp'
import { MgAttachmentLoadOp } from '../mg/MgAttachmentLoadOp'
import { MgImageLayout } from '../mg/MgImageLayout'
import { expect } from 'chai'

describe('MgAttachmentDescription', () => {
  it('should have all fields initialized after new()', () => {
    let info = new MgAttachmentDescription();

    expect(info).to.have.property('flags')
      .which.is.eq(0);
    expect(info).to.have.property('format')
      .which.is.eq(MgFormat.UNDEFINED);  
    expect(info).to.have.property('samples')
      .which.is.eq(0);   
    expect(info).to.have.property('loadOp')
      .which.is.eq(MgAttachmentLoadOp.LOAD);
    expect(info).to.have.property('storeOp')
      .which.is.eq(MgAttachmentStoreOp.STORE);                       
    expect(info).to.have.property('stencilLoadOp')
      .which.is.eq(MgAttachmentLoadOp.LOAD);
    expect(info).to.have.property('stencilStoreOp')
      .which.is.eq(MgAttachmentStoreOp.STORE);           
    expect(info).to.have.property('initialLayout')
      .which.is.eq(MgImageLayout.UNDEFINED);  
    expect(info).to.have.property('finalLayout')
      .which.is.eq(MgImageLayout.UNDEFINED);        
  });
});