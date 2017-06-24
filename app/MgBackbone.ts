class MgBackbone {
  private mGL: WebGL2RenderingContext;
  private mContext: .MgDriverContext;
  get context(): .MgDriverContext {
    return this.mContext;
  }

  private mEntrypoint: .IMgEntrypoint;
  get entrypoint(): .IMgEntrypoint {
    return this.mEntrypoint;
  }

  // private mPresentationSurface: IMgPresentationSurface;
  // get surface(): IMgPresentationSurface {
  //   return this.mPresentationSurface;
  // }

  private mConfiguration: .IMgGraphicsConfiguration;
  get configuration(): .IMgGraphicsConfiguration {
    return this.mConfiguration;
  }

  private mGraphicsDevice: .IMgGraphicsDevice;
  get graphicsDevice(): .IMgGraphicsDevice {
    return this.mGraphicsDevice;
  }

  private mSwapchains: .IMgSwapchainCollection;
  get swapchains(): .IMgSwapchainCollection {
    return this.mSwapchains;
  }

  private mPresentationLayer: .IMgPresentationLayer;
  get presentationLayer(): .IMgPresentationLayer {
    return this.mPresentationLayer;
  } 

  constructor(
    appInfo: .MgApplicationInfo
    , canvas: HTMLCanvasElement
  ) {
    // let appInfo = new .MgApplicationInfo();
    // appInfo.application = "Hello World";
    // appInfo.apiVersion = .MgApplicationInfo.generateApiVersion(1, 17, 0);
    // appInfo.engineName = "Engine";
    // appInfo.engineVersion = 1;

    // let canvas = document.getElementById(elementName) as HTMLCanvasElement;
    let gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
    if (gl == null)
      throw new Error('WebGL 2 context missing');

    this.mGL = gl;

    let semaphores: .IWGLSemaphoreEntrypoint = new .WGLSemaphoreEntrypoint();
    let draws = new .WGLCmdDrawEntrypoint(gl);
    let rendererCache = new .WGLCmdStateRendererCacheEntrypoint(gl);
    let cache = new .WGLCmdShaderProgramCache(rendererCache);
    let renderer: .IWGLCmdStateRenderer = new .WGLCmdStateRenderer(gl, draws, cache);
    let blit: .IWGLBlitOperationEntrypoint = new .WGLBlitOperationEntrypoint();
    let queue: .IWGLQueue = new .WGLCmdQueue(semaphores, renderer, blit);
    let memoryTypeMap = new .WGLDeviceMemoryTypeMap(gl);
    let deviceMemory = new .WGLDeviceMemoryEntrypoint(gl, memoryTypeMap);
    let deviceImage = new .WGLDeviceImageEntrypoint(gl);
    let shaders = new .WGLShaderModuleEntrypoint(gl);
    let programs = new .WGLGraphicsPipelineEntrypoint(gl);
    let errorHandler = new .WGLErrorHandler(gl);
    let uniforms = new .WGLUniformBlockEntrypoint(gl, errorHandler);
    let parser = new .WGLUniformBlockNameParser();
    let compiler = new .WGLGraphicsPipelineCompiler(
      errorHandler
      , shaders
      , programs
      , uniforms
      , parser);
    let sampler = new .WGLSamplerEntrypoint(gl, errorHandler);
    let imageDescriptor = new .WGLImageDescriptorEntrypoint();
    let desciptorPool = new .WGLDescriptorPoolEntrypoint(imageDescriptor);
    let descriptorSets = new .WGLDescriptorSetEntrypoint();
    let vertexArrays = new .WGLCmdVertexArrayEntrypoint(gl, errorHandler);
    let imageFormat = new .WGLImageFormatEntrypoint();
    let fences = new .WGLFenceEntrypoint(gl);
    let buffers = new .WGLBufferEntrypoint(gl);
    let deviceEntrypoint = new .WGLDeviceEntrypoint(
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

    let device: .IMgDevice = new .WGLDevice(gl, queue, deviceEntrypoint, memoryTypeMap);
    let physicalDevice: .IMgPhysicalDevice = new .WGLPhysicalDevice(device, memoryTypeMap);

    this.mEntrypoint = new .WGLEntrypoint(device, physicalDevice);
    this.mContext = new .MgDriverContext(this.mEntrypoint);
    this.mContext.initializeWithExtensions(
      appInfo
      , .MgInstanceExtensionOptions.ALL
    ); 

    let presentationSurface = new .WGLPresentationSurface(canvas);
    this.mConfiguration = new .MgDefaultGraphicsConfiguration(
      this.mContext
      , presentationSurface);

    let cmdRenderer = new .WGLCmdRenderer(renderer);
    this.mGraphicsDevice = new .WGLGraphicsDevice(cmdRenderer, this.mConfiguration);

    let swKHR = new .WGLHtmlSwapchainKHR();
    this.mSwapchains = new .WGLSwapchainCollection(swKHR);

    let barriers = new .WGLPresentationBarrierEntrypoint();
    this.mPresentationLayer = new .MgPresentationLayer(
      this.mConfiguration
      , this.mSwapchains
      , barriers);
  }    
}

export default MgBackbone;