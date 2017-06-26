import {MgDriverContext}
	from '../mg/MgDriverContext';  
import {IMgEntrypoint}
	from '../mg/IMgEntrypoint'; 
import {IMgGraphicsConfiguration}
	from '../mg/IMgGraphicsConfiguration';  
import {IMgGraphicsDevice}
	from '../mg/IMgGraphicsDevice'; 
import {IMgSwapchainCollection}
	from '../mg/IMgSwapchainCollection';  
import {IMgPresentationLayer}
	from '../mg/IMgPresentationLayer'; 
import {MgApplicationInfo}
	from '../mg/MgApplicationInfo';  
import {IMgDevice}
	from '../mg/IMgDevice'; 
import {IMgPhysicalDevice}
	from '../mg/IMgPhysicalDevice';  
import {MgInstanceExtensionOptions}
	from '../mg/MgInstanceExtensionOptions';   
import {MgDefaultGraphicsConfiguration}
	from '../mg/MgDefaultGraphicsConfiguration';  
import {MgPresentationLayer}
	from '../mg/MgPresentationLayer';  

import {IWGLSemaphoreEntrypoint}
	from '../mg-webgl/IWGLSemaphoreEntrypoint';  
import {WGLSemaphoreEntrypoint}
	from '../mg-webgl/WGLSemaphoreEntrypoint';  
import {WGLCmdDrawEntrypoint}
	from '../mg-webgl/WGLCmdDrawEntrypoint';
import {WGLCmdStateRendererCacheEntrypoint}
	from '../mg-webgl/WGLCmdStateRendererCacheEntrypoint';  
import {WGLCmdShaderProgramCache}
	from '../mg-webgl/WGLCmdShaderProgramCache';  
import {IWGLCmdStateRenderer}
	from '../mg-webgl/IWGLCmdStateRenderer';  
import {WGLCmdStateRenderer}
	from '../mg-webgl/WGLCmdStateRenderer';  
import {IWGLBlitOperationEntrypoint}
	from '../mg-webgl/IWGLBlitOperationEntrypoint';  
import {WGLBlitOperationEntrypoint}
	from '../mg-webgl/WGLBlitOperationEntrypoint';
import {IWGLQueue}
	from '../mg-webgl/IWGLQueue';  
import {WGLCmdQueue}
	from '../mg-webgl/WGLCmdQueue';
import {WGLDeviceMemoryTypeMap}
	from '../mg-webgl/WGLDeviceMemoryTypeMap';  
import {WGLDeviceMemoryEntrypoint}
	from '../mg-webgl/WGLDeviceMemoryEntrypoint';
import {WGLDeviceImageEntrypoint}
	from '../mg-webgl/WGLDeviceImageEntrypoint';  
import {WGLShaderModuleEntrypoint}
	from '../mg-webgl/WGLShaderModuleEntrypoint';
import {WGLGraphicsPipelineEntrypoint}
	from '../mg-webgl/WGLGraphicsPipelineEntrypoint';  
import {WGLErrorHandler}
	from '../mg-webgl/WGLErrorHandler';      
import {WGLUniformBlockEntrypoint}
	from '../mg-webgl/WGLUniformBlockEntrypoint';
import {WGLUniformBlockNameParser}
	from '../mg-webgl/WGLUniformBlockNameParser';  
import {WGLGraphicsPipelineCompiler}
	from '../mg-webgl/WGLGraphicsPipelineCompiler';     
import {WGLSamplerEntrypoint}
	from '../mg-webgl/WGLSamplerEntrypoint';
import {WGLImageDescriptorEntrypoint}
	from '../mg-webgl/WGLImageDescriptorEntrypoint';  
import {WGLDescriptorPoolEntrypoint}
	from '../mg-webgl/WGLDescriptorPoolEntrypoint';     
import {WGLDescriptorSetEntrypoint}
	from '../mg-webgl/WGLDescriptorSetEntrypoint';
import {WGLCmdVertexArrayEntrypoint}
	from '../mg-webgl/WGLCmdVertexArrayEntrypoint';  
import {WGLImageFormatEntrypoint}
	from '../mg-webgl/WGLImageFormatEntrypoint';  
import {WGLSynchronizableFenceEntrypoint}
	from '../mg-webgl/WGLSynchronizableFenceEntrypoint';  
import {WGLBufferEntrypoint}
	from '../mg-webgl/WGLBufferEntrypoint';
import {WGLDeviceEntrypoint}
	from '../mg-webgl/WGLDeviceEntrypoint';  
import {WGLDevice}
	from '../mg-webgl/WGLDevice';           
import {WGLPhysicalDevice}
	from '../mg-webgl/WGLPhysicalDevice';
import {WGLEntrypoint}
	from '../mg-webgl/WGLEntrypoint';
import {WGLPresentationSurface}
	from '../mg-webgl/WGLPresentationSurface';
import {WGLCmdRenderer}
	from '../mg-webgl/WGLCmdRenderer';
import {WGLGraphicsDevice}
	from '../mg-webgl/WGLGraphicsDevice';
import {WGLHtmlSwapchainKHR}
	from '../mg-webgl/WGLHtmlSwapchainKHR';          
import {WGLSwapchainCollection}
	from '../mg-webgl/WGLSwapchainCollection';  
import {WGLPresentationBarrierEntrypoint}
	from '../mg-webgl/WGLPresentationBarrierEntrypoint';  
import {WGLCmdBlendEntrypoint}
	from '../mg-webgl/WGLCmdBlendEntrypoint';  
import {WGLCmdStencilEntrypoint}
	from '../mg-webgl/WGLCmdStencilEntrypoint';  
import {WGLCmdDepthEntrypoint}
	from '../mg-webgl/WGLCmdDepthEntrypoint';	  
import {WGLCmdRasterizationEntrypoint}
	from '../mg-webgl/WGLCmdRasterizationEntrypoint';  
import {WGLCmdScissorsEntrypoint}
	from '../mg-webgl/WGLCmdScissorsEntrypoint';  
import {WGLCmdClearEntrypoint}
	from '../mg-webgl/WGLCmdClearEntrypoint';  
import {WGLFenceSynchronizationEntrypoint}
	from '../mg-webgl/WGLFenceSynchronizationEntrypoint';    

export class MgBackbone {
  private mGL: WebGL2RenderingContext;
  private mContext: MgDriverContext;
  get context(): MgDriverContext {
    return this.mContext;
  }

  private mEntrypoint: IMgEntrypoint;
  get entrypoint(): IMgEntrypoint {
    return this.mEntrypoint;
  }

  // private mPresentationSurface: IMgPresentationSurface;
  // get surface(): IMgPresentationSurface {
  //   return this.mPresentationSurface;
  // }

  private mConfiguration: IMgGraphicsConfiguration;
  get configuration(): IMgGraphicsConfiguration {
    return this.mConfiguration;
  }

  private mGraphicsDevice: IMgGraphicsDevice;
  get graphicsDevice(): IMgGraphicsDevice {
    return this.mGraphicsDevice;
  }

  private mSwapchains: IMgSwapchainCollection;
  get swapchains(): IMgSwapchainCollection {
    return this.mSwapchains;
  }

  private mPresentationLayer: IMgPresentationLayer;
  get presentationLayer(): IMgPresentationLayer {
    return this.mPresentationLayer;
  } 

  constructor(
    appInfo: MgApplicationInfo
    , canvas: HTMLCanvasElement
  ) {
    // let appInfo = new MgApplicationInfo();
    // appInfo.application = "Hello World";
    // appInfo.apiVersion = MgApplicationInfo.generateApiVersion(1, 17, 0);
    // appInfo.engineName = "Engine";
    // appInfo.engineVersion = 1;

    // let canvas = document.getElementById(elementName) as HTMLCanvasElement;
    let gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
    if (gl == null)
      throw new Error('WebGL 2 context missing');

    this.mGL = gl;

    let semaphores: IWGLSemaphoreEntrypoint = new WGLSemaphoreEntrypoint();
    let draws = new WGLCmdDrawEntrypoint(gl);
    let rendererCache = new WGLCmdStateRendererCacheEntrypoint(gl);
    let cache = new WGLCmdShaderProgramCache(rendererCache);
        let errorHandler = new WGLErrorHandler(gl);
    let blend = new WGLCmdBlendEntrypoint(gl, errorHandler);
    let stencil = new WGLCmdStencilEntrypoint(gl, errorHandler);
    let depth = new WGLCmdDepthEntrypoint(gl, errorHandler);
    let raster = new WGLCmdRasterizationEntrypoint(gl, errorHandler);
    let scissor = new WGLCmdScissorsEntrypoint(gl, errorHandler);
    let clear = new WGLCmdClearEntrypoint(gl, errorHandler);
    let renderer: IWGLCmdStateRenderer = new WGLCmdStateRenderer(
      gl
      , draws
      , cache
      , blend
      , stencil
      , depth
      , raster
      , scissor
      , clear
      );
    let blit: IWGLBlitOperationEntrypoint = new WGLBlitOperationEntrypoint(gl);
    let queue: IWGLQueue = new WGLCmdQueue(semaphores, renderer, blit);
    let memoryTypeMap = new WGLDeviceMemoryTypeMap(gl);
    let deviceMemory = new WGLDeviceMemoryEntrypoint(gl, memoryTypeMap);
    let deviceImage = new WGLDeviceImageEntrypoint(gl);
    let shaders = new WGLShaderModuleEntrypoint(gl);
    let programs = new WGLGraphicsPipelineEntrypoint(gl);

    let uniforms = new WGLUniformBlockEntrypoint(gl, errorHandler);
    let parser = new WGLUniformBlockNameParser();
    let compiler = new WGLGraphicsPipelineCompiler(
      errorHandler
      , shaders
      , programs
      , uniforms
      , parser);
    let sampler = new WGLSamplerEntrypoint(gl, errorHandler);
    let imageDescriptor = new WGLImageDescriptorEntrypoint();
    let desciptorPool = new WGLDescriptorPoolEntrypoint(imageDescriptor);
    let descriptorSets = new WGLDescriptorSetEntrypoint();
    let vertexArrays = new WGLCmdVertexArrayEntrypoint(gl, errorHandler);
    let imageFormat = new WGLImageFormatEntrypoint();
    let fences = new WGLSynchronizableFenceEntrypoint(gl);
    let buffers = new WGLBufferEntrypoint(gl);
    let deviceEntrypoint = new WGLDeviceEntrypoint(
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

    let fenceSynchronization = new WGLFenceSynchronizationEntrypoint(150);
    let device: IMgDevice = new WGLDevice(
      gl
      , queue
      , deviceEntrypoint
      , memoryTypeMap
      , fenceSynchronization);
    let physicalDevice: IMgPhysicalDevice = new WGLPhysicalDevice(device, memoryTypeMap);

    this.mEntrypoint = new WGLEntrypoint(device, physicalDevice);
    this.mContext = new MgDriverContext(this.mEntrypoint);
    this.mContext.initializeWithExtensions(
      appInfo
      , MgInstanceExtensionOptions.ALL
    ); 

    let presentationSurface = new WGLPresentationSurface(canvas);
    this.mConfiguration = new MgDefaultGraphicsConfiguration(
      this.mContext
      , presentationSurface);

    let cmdRenderer = new WGLCmdRenderer(renderer);
    this.mGraphicsDevice = new WGLGraphicsDevice(cmdRenderer, this.mConfiguration);

    let swKHR = new WGLHtmlSwapchainKHR();
    this.mSwapchains = new WGLSwapchainCollection(swKHR);

    let barriers = new WGLPresentationBarrierEntrypoint();
    this.mPresentationLayer = new MgPresentationLayer(
      this.mConfiguration
      , this.mSwapchains
      , barriers);
  }    
}
