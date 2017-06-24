import {IWGLDescriptorSetBinder}
	from './IWGLDescriptorSetBinder';	  
import {IWGLPipelineLayout}
	from './IWGLPipelineLayout';	  
import {IWGLDescriptorSet}
	from './IWGLDescriptorSet';	  
import {MgPipelineBindPoint}
	from '../mg/MgPipelineBindPoint';  
import {IMgDescriptorSet}
	from '../mg/IMgDescriptorSet';   
import {IMgPipelineLayout}
	from '../mg/IMgPipelineLayout';  

export class WGLDescriptorSetBinder implements IWGLDescriptorSetBinder	{
	constructor()	{
		this.clear();
	}

	private mBoundPipelineLayout: IWGLPipelineLayout|null;
	get boundPipelineLayout(): IWGLPipelineLayout|null {
		return this.mBoundPipelineLayout;
	}

	private mBoundDynamicOffsets: Array<number>|null;
	get boundDynamicOffsets(): Array<number>|null {
		return this.mBoundDynamicOffsets;
	}

	public mBoundDescriptorSet: IWGLDescriptorSet|null;
	get boundDescriptorSet(): IWGLDescriptorSet|null {
		return this.mBoundDescriptorSet;
	}

	clear() : void {
		this.mIsInvalid = false;
		this.mBoundPipelineLayout = null;
		this.mBoundDynamicOffsets = null;
		this.mBoundDescriptorSet = null;
	}

	private mIsInvalid: boolean;
	get isInvalid() : boolean {
		return this.mIsInvalid;
	}

	bind(
		pipelineBindPoint: MgPipelineBindPoint
		, layout: IMgPipelineLayout
		, firstSet: number
		, descriptorSetCount:number
		, pDescriptorSets: Array<IMgDescriptorSet>
		, pDynamicOffsets: Array<number>
	) : void {
		if (layout == null)	{
			throw new Error("layout is null");
		}

		if (pDescriptorSets == null) {
			throw new Error("pDescriptorSets is null");
		}

		if (firstSet != 0)
		{
			throw new Error("descriptor set 0 can be bound.");
		}

		let bLayout : IWGLPipelineLayout = layout as IWGLPipelineLayout; 

		this.mIsInvalid = false;

		if (!(bLayout === this.mBoundPipelineLayout))	{
			this.mBoundPipelineLayout = bLayout;
			this.mIsInvalid = true;
		}

		let isArrayDifferent = this.copyDynamicOffsetsIfDifferent(pDynamicOffsets);
		this.mIsInvalid = this.mIsInvalid && isArrayDifferent;

		let bDescSet = pDescriptorSets[0] as IWGLDescriptorSet;
		// EXACT DSET ONLY
		if (bDescSet.isDifferent(this.mBoundDescriptorSet))	{
			this.mBoundDescriptorSet = bDescSet;
			this.mIsInvalid = true;
		}
	}

	private copyDynamicOffsetsIfDifferent(
		pDynamicOffsets: Array<number>|null
	): boolean {
		let needsChange: boolean = false;

		if (pDynamicOffsets == null) {
			// SHOULD BE ALL ZEROS
			let layout = this.mBoundPipelineLayout as IWGLPipelineLayout;

			this.mBoundDynamicOffsets = new Array<number>(
				layout.noOfExpectedDynamicOffsets);
			needsChange = true;
		}

		let suppliedLength = pDynamicOffsets == null ? 0 : pDynamicOffsets.length;
		
		
		let boundOffsets = this.mBoundDynamicOffsets as Array<number>;
		let finalLoopCount = Math.min(suppliedLength, boundOffsets.length);

		if (pDynamicOffsets != null) {
			let dynamics = pDynamicOffsets as Array<number>;

			for (let i = 0; i < finalLoopCount; i += 1)	{
				if (dynamics[i] != boundOffsets[i]) {
					boundOffsets[i] = dynamics[i];
					needsChange = true;
				}
			}
		}

		return needsChange;
	}
}

