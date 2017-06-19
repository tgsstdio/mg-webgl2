namespace Magnesium {
  export class WGLCmdRenderer implements IWGLRenderer {
    private mStateRenderer: IWGLCmdStateRenderer;
    constructor(
      stateRenderer: IWGLCmdStateRenderer
    ) {
      this.mStateRenderer = stateRenderer;
    }

    initialize(): void {
      this.mStateRenderer.initialize();
    }    
  }
}