namespace Magnesium {
	export interface IWGLCmdDepthEntrypoint {
		getDefaultEnums() : MgCompareOp;

		initialize() : MgCompareOp;

		//bool IsDepthBufferEnabled { get; }		
		enableDepthBuffer(): void;
		disableDepthBuffer(): void;

		setDepthBufferFunc(func: MgCompareOp): void;
		setDepthMask(isMaskOn :boolean): void;

		//void SetClipControl(bool usingLowerLeftCorner, bool zeroToOneRange);
    //void SetDepthBounds(float min, float max);
  }
}
