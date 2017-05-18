/// <reference path="../mg-webgl/WGLEntrypoint.ts" />
/// <reference path="../mg/MgApplicationInfo.ts" />

/// <reference path="MgDriverContext.ts" />
/// <reference path="WGLPresentationSurface.ts" />


let appInfo = new Magnesium.MgApplicationInfo();
appInfo.application = "Hello World";
appInfo.apiVersion = Magnesium.MgApplicationInfo.generateApiVersion(1, 17, 0);
appInfo.engineName = "Engine";
appInfo.engineVersion = 1;

let gl : WebGL2RenderingContext = null;
let entrypoint = new Magnesium.WGLEntrypoint(gl);
let context = new Magnesium.MgDriverContext(entrypoint);
context.initializeWithExtensions(
  appInfo
  , Magnesium.MgInstanceExtensionOptions.ALL
); 

let presentationSurface = new Magnesium.WGLPresentationSurface('');
let graphicsConfiguration = new   Magnesium.MgDefaultGraphicsConfiguration(
  context
  , presentationSurface);


