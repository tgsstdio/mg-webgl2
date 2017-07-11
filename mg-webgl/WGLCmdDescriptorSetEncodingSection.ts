import {IWGLCmdDescriptorSetEncodingSection}
	from './IWGLCmdDescriptorSetEncodingSection';	
import {IWGLDescriptorSetBinder}
	from './IWGLDescriptorSetBinder';	
import {WGLCmdDescriptorSetParameter}
	from './WGLCmdDescriptorSetParameter';	 
import {IWGLGraphicsPipeline}
	from './IWGLGraphicsPipeline';	
import {WGLCmdGraphicsBag}
	from './WGLCmdGraphicsBag';	       
import {WGLCmdEncoderContextSorter}
	from './WGLCmdEncoderContextSorter';
import {WGLCmdEncodingInstruction}
	from './WGLCmdEncodingInstruction';  
import {MgPipelineBindPoint}
	from '../mg/MgPipelineBindPoint';    
import {IMgDescriptorSet}
	from '../mg/IMgDescriptorSet'; 
import {IMgPipelineLayout}
	from '../mg/IMgPipelineLayout';    
import {WGLCmdEncoderCategory}
	from './WGLCmdEncoderCategory';	  
import {WGLCmdAction}
	from './WGLCmdAction';
import {WGLCmdCommandRecording}
	from './WGLCmdCommandRecording';	     	   

export class WGLCmdDescriptorSetEncodingSection
    implements IWGLCmdDescriptorSetEncodingSection {
  private mDSBinder: IWGLDescriptorSetBinder;
  constructor(dsBinder: IWGLDescriptorSetBinder) {
    this.mDSBinder = dsBinder;
    this.clear();
  }

  clear(): void {
    this.invalidate();
    this.mDSBinder.clear();
  }

  private mPastDescriptorSet: WGLCmdDescriptorSetParameter|null;
  invalidate(): void {
    this.mPastDescriptorSet = null;
  }

  pushIfRequired(
    pipeline: IWGLGraphicsPipeline|null
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter 
  ): void {
    if (pipeline == null) {
      return;
    }       

    if (this.mPastDescriptorSet == null) {
      let setBinder = this.mDSBinder as IWGLDescriptorSetBinder;

      let temp = new WGLCmdDescriptorSetParameter();
      temp.bindpoint = MgPipelineBindPoint.GRAPHICS;
      temp.layout = setBinder.boundPipelineLayout;  
      temp.descriptorSet = setBinder.boundDescriptorSet;
      temp.dynamicOffsets = setBinder.boundDynamicOffsets;
      
      this.mPastDescriptorSet = temp;         

      let nextIndex = bag.descriptorSets.push(this.mPastDescriptorSet);

      let instruction = new WGLCmdEncodingInstruction();           
      instruction.category = WGLCmdEncoderCategory.GRAPHICS;
      instruction.index = nextIndex,
      instruction.operation = new WGLCmdBindDescriptorSets();  

      instructions.add(instruction);            
    }
  }

  bind(
    layout: IMgPipelineLayout
    , firstSet: number
    , descriptorSetCount: number
    , pDescriptorSets: Array<IMgDescriptorSet>
    , pDynamicOffsets: Array<number>|null
  ) : void {
    this.mDSBinder.bind(
      MgPipelineBindPoint.GRAPHICS
      , layout
      , firstSet
      , descriptorSetCount
      , pDescriptorSets
      , pDynamicOffsets);

    if (this.mDSBinder.isInvalid) {
      this.invalidate();
    }
  }
}

class WGLCmdBindDescriptorSets implements WGLCmdAction {
  action(
    arg1: WGLCmdCommandRecording
    , arg2: number
  ): void {
  
    let context = arg1.graphics;
    if (context == null)
      return;

    let grid = context.grid;
    if (grid == null)
      return;

    let items = grid.descriptorSets;
    if (items == null)
      return; 

    let ds = items[arg2];

    let renderer = context.stateRenderer;
    if (renderer == null)
      return;

    renderer.bindDescriptorSets(ds);
  }  
}
