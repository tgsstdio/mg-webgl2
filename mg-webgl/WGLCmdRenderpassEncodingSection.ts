namespace Magnesium {
  export class WGLCmdRenderpassEncodingSection {
    boundRenderPass: WGLCmdBeginRenderpassRecord|null;
    clear(): void {
      this.boundRenderPass = null;
    }

    isBound(): boolean {
      return this.boundRenderPass != null;
    }

    begin(
      bag: WGLCmdGraphicsBag
      , instructions: WGLCmdEncoderContextSorter
      , pRenderPassBegin: MgRenderPassBeginInfo
      , contents: MgSubpassContents
    ) {
      this.boundRenderPass = this.initializeRenderpassInfo(
        pRenderPassBegin);

      let nextIndex = bag.renderPasses.push(this.boundRenderPass);

      let instruction = new WGLCmdEncodingInstruction();
      instruction.category = WGLCmdEncoderCategory.GRAPHICS;
      instruction.index = nextIndex;
      instruction.operation = new WGLCmdBeginRenderPass;

      instructions.add(instruction);
    }

    end() : void {
      this.boundRenderPass = null;
    }

    private initializeRenderpassInfo(
      pass: MgRenderPassBeginInfo
    ) : WGLCmdBeginRenderpassRecord {

      let glPass = pass.renderPass as IWGLRenderPass;

      let noOfAttachments = glPass.attachmentFormats == null 
        ? 0 
        : glPass.attachmentFormats.length;
      let noOfClearValues = pass.clearValues == null 
        ? 0
        : pass.clearValues.length;

      let finalLength = Math.min(noOfAttachments, noOfClearValues);

      let attachments = new Array<WGLCmdClearValueArrayItem>(finalLength);

      let combinedMask: GLQueueClearBufferMask = 0;
      for (let i = 0; i < finalLength; i += 1) {
        let attachment = glPass.attachmentFormats[i];
        let colorValue : MgColor4f = new MgColor4f(0, 0, 0 ,0);
        switch (attachment.attachmentType) {
          case WGLClearAttachmentType.COLOR_INT:
            colorValue = this.extractColorI(attachment, pass.clearValues[i].color.int32);
            combinedMask |= GLQueueClearBufferMask.Color;
            break;
          case WGLClearAttachmentType.COLOR_UINT:
            colorValue = this.extractColorUi(attachment, pass.clearValues[i].color.uint32);
            combinedMask |= GLQueueClearBufferMask.Color;
            break;
          case WGLClearAttachmentType.COLOR_FLOAT:
              colorValue = pass.clearValues[i].color.float32;
              combinedMask |= GLQueueClearBufferMask.Color;
              break;
          case WGLClearAttachmentType.DEPTH_STENCIL:
              //clearValue.Value = pass.ClearValues[i];
              combinedMask |= GLQueueClearBufferMask.Depth;
              break;
          default:
              break;
        }

        let clearValue = new WGLCmdClearValueArrayItem();
        clearValue.attachment = attachment;
        clearValue.color = colorValue;
        clearValue.value = pass.clearValues[i];
        attachments[i] = clearValue;
      }

      let result = new WGLCmdBeginRenderpassRecord();
      result.bitmask = combinedMask;
      result.clearState = new WGLCmdClearValuesParameter();
      result.clearState.attachments = attachments;
      return result;  
    }    

    private extractColorI(
       attachment: WGLClearAttachmentInfo
       , initialValue: MgVec4i
    ) : MgColor4f {

      let r = Math.max(
                Math.min(initialValue.x, attachment.divisor)
                , -attachment.divisor
              ) / attachment.divisor;

      let g = Math.max(
                Math.min(initialValue.y, attachment.divisor)
                , -attachment.divisor
              ) / attachment.divisor;
      let b = Math.max(
                Math.min(initialValue.z, attachment.divisor)
                , -attachment.divisor
              ) / attachment.divisor;
      let a = Math.max(
                Math.min(initialValue.w, attachment.divisor)
                , -attachment.divisor
              ) / attachment.divisor;
      return new MgColor4f(r, g, b, a);    
    }

    private extractColorUi(
      attachment: WGLClearAttachmentInfo
      ,  initialValue: MgVec4Ui
    ) : MgColor4f {
      let r = Math.min(initialValue.x, attachment.divisor) 
        / attachment.divisor;
      let g = Math.min(initialValue.y, attachment.divisor)
         / attachment.divisor;
      let b = Math.min(initialValue.z, attachment.divisor) 
        / attachment.divisor;
      let a = Math.min(initialValue.w, attachment.divisor) 
        / attachment.divisor;
      return new MgColor4f(r, g, b, a);  
    }
  }

  class WGLCmdBeginRenderPass implements WGLCmdAction {
    action(
      arg1: WGLCmdCommandRecording
      , arg2: number
    ) : void {
      let context = arg1.graphics;
      if (context == null)
        return;
      let grid = context.grid;
      if (grid == null)
        return;
      let items = grid.renderPasses;
      if(items == null)
        return;
      let passInfo = items[arg2];
      if(passInfo == null)
        return;
      renderer.beginRenderpass(passInfo);
    }
  }
}