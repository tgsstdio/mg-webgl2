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
	from '../mg-webgl/entrypoint/IWGLSemaphoreEntrypoint';  
import {WGLSemaphoreEntrypoint}
	from '../mg-webgl/entrypoint/WGLSemaphoreEntrypoint';  
import {WGLCmdDrawEntrypoint}
	from '../mg-webgl/entrypoint/WGLCmdDrawEntrypoint';
import {WGLCmdStateRendererCacheEntrypoint}
	from '../mg-webgl/entrypoint/WGLCmdStateRendererCacheEntrypoint';  
import {WGLCmdRenderer}
	from '../mg-webgl/renderer/WGLCmdRenderer';  
import {WGLCmdShaderProgramCache}
	from '../mg-webgl/renderer/WGLCmdShaderProgramCache';  
import {IWGLCmdStateRenderer}
	from '../mg-webgl/renderer/IWGLCmdStateRenderer';  
import {WGLCmdStateRenderer}
	from '../mg-webgl/renderer/WGLCmdStateRenderer';
import {IWGLBlitOperationEntrypoint}
	from '../mg-webgl/entrypoint/IWGLBlitOperationEntrypoint';  
import {WGLBlitOperationEntrypoint}
	from '../mg-webgl/entrypoint/WGLBlitOperationEntrypoint';
import {IWGLQueue}
	from '../mg-webgl/queue/IWGLQueue';  
import {WGLCmdQueue}
	from '../mg-webgl/queue/WGLCmdQueue';
import {WGLDeviceMemoryTypeMap}
	from '../mg-webgl/WGLDeviceMemoryTypeMap';  
import {WGLDeviceMemoryEntrypoint}
	from '../mg-webgl/entrypoint/WGLDeviceMemoryEntrypoint';
import {WGLDeviceImageEntrypoint}
	from '../mg-webgl/entrypoint/WGLDeviceImageEntrypoint';  
import {WGLShaderModuleEntrypoint}
	from '../mg-webgl/entrypoint/WGLShaderModuleEntrypoint';
import {WGLGraphicsPipelineEntrypoint}
	from '../mg-webgl/entrypoint/WGLGraphicsPipelineEntrypoint';  
import {WGLErrorHandler}
	from '../mg-webgl/entrypoint/WGLErrorHandler';      
import {WGLUniformBlockEntrypoint}
	from '../mg-webgl/entrypoint/WGLUniformBlockEntrypoint';
import {WGLUniformBlockNameParser}
	from '../mg-webgl/pipeline/WGLUniformBlockNameParser';  
import {WGLGraphicsPipelineCompilerEntrypoint}
	from '../mg-webgl/entrypoint/WGLGraphicsPipelineCompilerEntrypoint';     
import {WGLSamplerEntrypoint}
	from '../mg-webgl/entrypoint/WGLSamplerEntrypoint';
import {WGLImageDescriptorEntrypoint}
	from '../mg-webgl/entrypoint/WGLImageDescriptorEntrypoint';  
import {WGLDescriptorPoolEntrypoint}
	from '../mg-webgl/entrypoint/WGLDescriptorPoolEntrypoint';     
import {WGLDescriptorSetEntrypoint}
	from '../mg-webgl/entrypoint/WGLDescriptorSetEntrypoint';
import {WGLCmdVertexArrayEntrypoint}
	from '../mg-webgl/entrypoint/WGLCmdVertexArrayEntrypoint';  
import {WGLImageFormatEntrypoint}
	from '../mg-webgl/entrypoint/WGLImageFormatEntrypoint';  
import {WGLSynchronizableFenceEntrypoint}
	from '../mg-webgl/entrypoint/WGLSynchronizableFenceEntrypoint';  
import {WGLBufferEntrypoint}
	from '../mg-webgl/entrypoint/WGLBufferEntrypoint';
import {WGLDeviceEntrypoint}
	from '../mg-webgl/entrypoint/WGLDeviceEntrypoint';  
import {WGLDevice}
	from '../mg-webgl/WGLDevice';           
import {WGLPhysicalDevice}
	from '../mg-webgl/WGLPhysicalDevice';
import {WGLEntrypoint}
	from '../mg-webgl/WGLEntrypoint';
import {WGLPresentationSurface}
	from '../mg-webgl/WGLPresentationSurface';
import {WGLGraphicsDevice}
	from '../mg-webgl/WGLGraphicsDevice';
import {WGLHtmlSwapchainKHR}
	from '../mg-webgl/WGLHtmlSwapchainKHR';          
import {WGLSwapchainCollection}
	from '../mg-webgl/WGLSwapchainCollection';  
import {WGLPresentationBarrierEntrypoint}
	from '../mg-webgl/entrypoint/WGLPresentationBarrierEntrypoint';  
import {WGLCmdBlendEntrypoint}
	from '../mg-webgl/entrypoint/WGLCmdBlendEntrypoint';  
import {WGLCmdStencilEntrypoint}
	from '../mg-webgl/entrypoint/WGLCmdStencilEntrypoint';  
import {WGLCmdDepthEntrypoint}
	from '../mg-webgl/entrypoint/WGLCmdDepthEntrypoint';	  
import {WGLCmdRasterizationEntrypoint}
	from '../mg-webgl/entrypoint/WGLCmdRasterizationEntrypoint';  
import {WGLCmdScissorsEntrypoint}
	from '../mg-webgl/entrypoint/WGLCmdScissorsEntrypoint';  
import {WGLCmdClearEntrypoint}
	from '../mg-webgl/entrypoint/WGLCmdClearEntrypoint';  
import {WGLFenceSynchronizationEntrypoint}
	from '../mg-webgl/entrypoint/WGLFenceSynchronizationEntrypoint';    
import {IWGLBackbufferContext}
	from '../mg-webgl/IWGLBackbufferContext';    
import {WGLBackbufferContext}
  from '../mg-webgl/WGLBackbufferContext';  
import {IWGLCmdVertexArrayEntrypoint}
  from '../mg-webgl/entrypoint/IWGLCmdVertexArrayEntrypoint'; 
import {IWGLCmdDrawEntrypoint}
	from '../mg-webgl/entrypoint/IWGLCmdDrawEntrypoint';     

export class MgBackbone {
  private mGLContext: IWGLBackbufferContext;
  get gl(): WebGL2RenderingContext {
    return this.mGLContext.gl;
  }

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

  private mVertexArrays: IWGLCmdVertexArrayEntrypoint;
  get vertexArrays(): IWGLCmdVertexArrayEntrypoint {
    return this.mVertexArrays;
  }

  private mDraws: IWGLCmdDrawEntrypoint;
  get draws(): IWGLCmdDrawEntrypoint {
    return this.mDraws;
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
    let presentationSurface = new WGLPresentationSurface(canvas);

    let glContext = new WGLBackbufferContext(canvas);

    let semaphores: IWGLSemaphoreEntrypoint = new WGLSemaphoreEntrypoint(glContext);
    this.mDraws = new WGLCmdDrawEntrypoint(glContext);
    let rendererCache = new WGLCmdStateRendererCacheEntrypoint(glContext);
    let cache = new WGLCmdShaderProgramCache(rendererCache);
    let errorHandler = new WGLErrorHandler(glContext);
    let blend = new WGLCmdBlendEntrypoint(glContext, errorHandler);
    let stencil = new WGLCmdStencilEntrypoint(glContext, errorHandler);
    let depth = new WGLCmdDepthEntrypoint(glContext, errorHandler);
    let raster = new WGLCmdRasterizationEntrypoint(glContext, errorHandler);
    let scissor = new WGLCmdScissorsEntrypoint(glContext, errorHandler);
    let clear = new WGLCmdClearEntrypoint(glContext, errorHandler);
    let renderer: IWGLCmdStateRenderer = new WGLCmdStateRenderer(
        this.mDraws
      , cache
      , blend
      , stencil
      , depth
      , raster
      , scissor
      , clear
      );
    let blit: IWGLBlitOperationEntrypoint = new WGLBlitOperationEntrypoint(glContext, errorHandler);
    let queue: IWGLQueue = new WGLCmdQueue(semaphores, renderer, blit);
    let memoryTypeMap = new WGLDeviceMemoryTypeMap();
    let deviceMemory = new WGLDeviceMemoryEntrypoint(glContext, memoryTypeMap);
    let deviceImage = new WGLDeviceImageEntrypoint(glContext);
    let shaders = new WGLShaderModuleEntrypoint(glContext);
    let programs = new WGLGraphicsPipelineEntrypoint(glContext);

    let uniforms = new WGLUniformBlockEntrypoint(glContext, errorHandler);
    let parser = new WGLUniformBlockNameParser();
    let compiler = new WGLGraphicsPipelineCompilerEntrypoint(
      errorHandler
      , shaders
      , programs
      , uniforms
      , parser);
    let sampler = new WGLSamplerEntrypoint(glContext, errorHandler);
    let imageDescriptor = new WGLImageDescriptorEntrypoint();
    let desciptorPool = new WGLDescriptorPoolEntrypoint(imageDescriptor);
    let descriptorSets = new WGLDescriptorSetEntrypoint();
    this.mVertexArrays = new WGLCmdVertexArrayEntrypoint(glContext, errorHandler);
    let imageFormat = new WGLImageFormatEntrypoint();
    let fences = new WGLSynchronizableFenceEntrypoint(glContext);
    let buffers = new WGLBufferEntrypoint(glContext);
    let deviceEntrypoint = new WGLDeviceEntrypoint(
      deviceMemory
      , deviceImage
      , compiler
      , programs
      , sampler
      , desciptorPool
      , descriptorSets
      , this.mVertexArrays
      , imageFormat
      , semaphores
      , fences
      , buffers);

    let fenceSynchronization = new WGLFenceSynchronizationEntrypoint(150);
    let device: IMgDevice = new WGLDevice(
      glContext
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

    this.mConfiguration = new MgDefaultGraphicsConfiguration(
      this.mContext
      , presentationSurface);

    let cmdRenderer = new WGLCmdRenderer(renderer);
    this.mGraphicsDevice = new WGLGraphicsDevice(glContext, cmdRenderer, this.mConfiguration);
    this.mGLContext = glContext;

    let swKHR = new WGLHtmlSwapchainKHR();
    this.mSwapchains = new WGLSwapchainCollection(swKHR);

    let barriers = new WGLPresentationBarrierEntrypoint();
    this.mPresentationLayer = new MgPresentationLayer(
      this.mConfiguration
      , this.mSwapchains
      , barriers);
  }    
}
