/// <reference path="../mg-webgl/WGLEntrypoint.ts" />
/// <reference path="../mg/MgApplicationInfo.ts" />

/// <reference path="../mg-webgl/WGLDevice.ts" />

/// <reference path="MgDriverContext.ts" />
/// <reference path="WGLPresentationSurface.ts" />
/// <reference path="../mg-webgl/IWGLSemaphoreEntrypoint.ts" />


let appInfo = new Magnesium.MgApplicationInfo();
appInfo.application = "Hello World";
appInfo.apiVersion = Magnesium.MgApplicationInfo.generateApiVersion(1, 17, 0);
appInfo.engineName = "Engine";
appInfo.engineVersion = 1;


let canvas = document.getElementById('glCanvas');
let gl = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
if (gl == null)
  throw new Error();

let semaphores: Magnesium.IWGLSemaphoreEntrypoint = new Magnesium.WGLSemaphoreEntrypoint();
let renderer: Magnesium.IGLCmdStateRenderer = new Magnesium.WGLCmdStateRenderer();
let blit: Magnesium.IGLBlitOperationEntrypoint = new Magnesium.WGLBlitOperationEntrypoint();
let queue: Magnesium.IWGLQueue = new Magnesium.WGLCmdQueue(semaphores, renderer, blit);
let deviceEntrypoint = new Magnesium.WGLDeviceEntrypoint();
let device: Magnesium.IMgDevice = new Magnesium.WGLDevice(gl, queue, deviceEntrypoint);

let entrypoint = new Magnesium.WGLEntrypoint(device);
let context = new Magnesium.MgDriverContext(entrypoint);
context.initializeWithExtensions(
  appInfo
  , Magnesium.MgInstanceExtensionOptions.ALL
); 

let presentationSurface = new Magnesium.WGLPresentationSurface('');
let graphicsConfiguration = new   Magnesium.MgDefaultGraphicsConfiguration(
  context
  , presentationSurface);


