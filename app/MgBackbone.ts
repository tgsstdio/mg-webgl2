class MgBackbone {
  private mGL: WebGL2RenderingContext;
  private mContext: Magnesium.MgDriverContext;
  get context(): Magnesium.MgDriverContext {
    return this.mContext;
  }

  private mEntrypoint: Magnesium.IMgEntrypoint;
  get entrypoint(): Magnesium.IMgEntrypoint {
    return this.mEntrypoint;
  }

  // private mPresentationSurface: IMgPresentationSurface;
  // get surface(): IMgPresentationSurface {
  //   return this.mPresentationSurface;
  // }

  private mConfiguration: Magnesium.IMgGraphicsConfiguration;
  get configuration(): Magnesium.IMgGraphicsConfiguration {
    return this.mConfiguration;
  }

  private mGraphicsDevice: Magnesium.IMgGraphicsDevice;
  get graphicsDevice(): Magnesium.IMgGraphicsDevice {
    return this.mGraphicsDevice;
  }

  private mSwapchains: Magnesium.IMgSwapchainCollection;
  get swapchains(): Magnesium.IMgSwapchainCollection {
    return this.mSwapchains;
  }

  private mPresentationLayer: Magnesium.IMgPresentationLayer;
  get presentationLayer(): Magnesium.IMgPresentationLayer {
    return this.mPresentationLayer;
  } 

  constructor(
    appInfo: Magnesium.MgApplicationInfo
    , canvas: HTMLCanvasElement
  ) {
    // let appInfo = new Magnesium.MgApplicationInfo();
    // appInfo.application = "Hello World";
    // appInfo.apiVersion = Magnesium.MgApplicationInfo.generateApiVersion(1, 17, 0);
    // appInfo.engineName = "Engine";
    // appInfo.engineVersion = 1;

    // let canvas = document.getElementById(elementName) as HTMLCanvasElement;
    let gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
    if (gl == null)
      throw new Error('WebGL 2 context missing');

    this.mGL = gl;

    let semaphores: Magnesium.IWGLSemaphoreEntrypoint = new Magnesium.WGLSemaphoreEntrypoint();
    let draws = new Magnesium.WGLCmdDrawEntrypoint(gl);
    let rendererCache = new Magnesium.WGLCmdStateRendererCacheEntrypoint(gl);
    let cache = new Magnesium.WGLCmdShaderProgramCache(rendererCache);
    let renderer: Magnesium.IWGLCmdStateRenderer = new Magnesium.WGLCmdStateRenderer(gl, draws, cache);
    let blit: Magnesium.IWGLBlitOperationEntrypoint = new Magnesium.WGLBlitOperationEntrypoint();
    let queue: Magnesium.IWGLQueue = new Magnesium.WGLCmdQueue(semaphores, renderer, blit);
    let memoryTypeMap = new Magnesium.WGLDeviceMemoryTypeMap(gl);
    let deviceMemory = new Magnesium.WGLDeviceMemoryEntrypoint(gl, memoryTypeMap);
    let deviceImage = new Magnesium.WGLDeviceImageEntrypoint(gl);
    let shaders = new Magnesium.WGLShaderModuleEntrypoint(gl);
    let programs = new Magnesium.WGLGraphicsPipelineEntrypoint(gl);
    let errorHandler = new Magnesium.WGLErrorHandler(gl);
    let uniforms = new Magnesium.WGLUniformBlockEntrypoint(gl, errorHandler);
    let parser = new Magnesium.WGLUniformBlockNameParser();
    let compiler = new Magnesium.WGLGraphicsPipelineCompiler(
      errorHandler
      , shaders
      , programs
      , uniforms
      , parser);
    let sampler = new Magnesium.WGLSamplerEntrypoint(gl, errorHandler);
    let imageDescriptor = new Magnesium.WGLImageDescriptorEntrypoint();
    let desciptorPool = new Magnesium.WGLDescriptorPoolEntrypoint(imageDescriptor);
    let descriptorSets = new Magnesium.WGLDescriptorSetEntrypoint();
    let vertexArrays = new Magnesium.WGLCmdVertexArrayEntrypoint(gl, errorHandler);
    let imageFormat = new Magnesium.WGLImageFormatEntrypoint();
    let fences = new Magnesium.WGLFenceEntrypoint(gl);
    let buffers = new Magnesium.WGLBufferEntrypoint(gl);
    let deviceEntrypoint = new Magnesium.WGLDeviceEntrypoint(
      deviceMemory
      , deviceImage
      , compiler
      , programs
      , sampler
      , desciptorPool
      , descriptorSets
      , vertexArrays
      , imageFormat
      , semaphores
      , fences
      , buffers);

    let device: Magnesium.IMgDevice = new Magnesium.WGLDevice(gl, queue, deviceEntrypoint, memoryTypeMap);
    let physicalDevice: Magnesium.IMgPhysicalDevice = new Magnesium.WGLPhysicalDevice(device, memoryTypeMap);

    this.mEntrypoint = new Magnesium.WGLEntrypoint(device, physicalDevice);
    this.mContext = new Magnesium.MgDriverContext(this.mEntrypoint);
    this.mContext.initializeWithExtensions(
      appInfo
      , Magnesium.MgInstanceExtensionOptions.ALL
    ); 

    let presentationSurface = new Magnesium.WGLPresentationSurface(canvas);
    this.mConfiguration = new Magnesium.MgDefaultGraphicsConfiguration(
      this.mContext
      , presentationSurface);

    let cmdRenderer = new Magnesium.WGLCmdRenderer(renderer);
    this.mGraphicsDevice = new Magnesium.WGLGraphicsDevice(cmdRenderer, this.mConfiguration);

    let swKHR = new Magnesium.WGLHtmlSwapchainKHR();
    this.mSwapchains = new Magnesium.WGLSwapchainCollection(swKHR);

    let barriers = new Magnesium.WGLPresentationBarrierEntrypoint();
    this.mPresentationLayer = new Magnesium.MgPresentationLayer(
      this.mConfiguration
      , this.mSwapchains
      , barriers);
  }    
}

export default MgBackbone;