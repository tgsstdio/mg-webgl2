/// <reference path="../mg-webgl/WGLEntrypoint.ts" />
/// <reference path="../mg/MgApplicationInfo.ts" />

/// <reference path="../mg-webgl/WGLDevice.ts" />

/// <reference path="../mg/MgDriverContext.ts" />
/// <reference path="../mg-webgl/WGLPresentationSurface.ts" />
/// <reference path="../mg-webgl/WGLDeviceEntrypoint.ts" />
/// <reference path="../mg-webgl/IWGLSemaphoreEntrypoint.ts" />


let appInfo = new Magnesium.MgApplicationInfo();
appInfo.application = "Hello World";
appInfo.apiVersion = Magnesium.MgApplicationInfo.generateApiVersion(1, 17, 0);
appInfo.engineName = "Engine";
appInfo.engineVersion = 1;


let canvas = document.getElementById('glCanvas') as HTMLCanvasElement;
let gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
if (gl == null)
  throw new Error();

let semaphores: Magnesium.IWGLSemaphoreEntrypoint = new Magnesium.WGLSemaphoreEntrypoint();
let draws = new Magnesium.WGLCmdDrawEntrypoint(gl);
let renderer: Magnesium.IWGLCmdStateRenderer = new Magnesium.WGLCmdStateRenderer(gl, draws);
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
let fences = new Magnesium.WGLFenceEntrypoint();
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
  , fences);

let device: Magnesium.IMgDevice = new Magnesium.WGLDevice(gl, queue, deviceEntrypoint, memoryTypeMap);
let physicalDevice: Magnesium.IMgPhysicalDevice = new Magnesium.WGLPhysicalDevice(device, memoryTypeMap);

let entrypoint = new Magnesium.WGLEntrypoint(device, physicalDevice);
let context = new Magnesium.MgDriverContext(entrypoint);
context.initializeWithExtensions(
  appInfo
  , Magnesium.MgInstanceExtensionOptions.ALL
); 

let presentationSurface = new Magnesium.WGLPresentationSurface('');
let graphicsConfiguration = new   Magnesium.MgDefaultGraphicsConfiguration(
  context
  , presentationSurface);


