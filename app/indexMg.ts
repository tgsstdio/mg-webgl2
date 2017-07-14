let el = document.getElementById('messageLog')

if (el !== null) {
  el.innerText = 'Hello World via Typescript'
}

import {VulkanExample} from './VulkanExample';
import {MgBackbone} from './MgBackbone';
import {VkTriangleDemoShaderPath} from './VkTriangleDemoShaderPath';
import {MgApplicationInfo} from '../mg/MgApplicationInfo';

let vk: VulkanExample;
let backbone: MgBackbone;

let canvas = document.getElementById('glCanvas') as HTMLCanvasElement;

try {
  let appInfo = new MgApplicationInfo();
  appInfo.applicationName = "Hello World";
  appInfo.apiVersion = MgApplicationInfo.generateApiVersion(1, 17, 0);
  appInfo.engineName = "Engine";
  appInfo.engineVersion = 1;

  backbone = new MgBackbone(appInfo, canvas);
  let width = 1280;
  let height = 720;

  let shaderPath = new VkTriangleDemoShaderPath();
  
  let gl = backbone.gl;
  let vb = gl.createVertexArray();
  console.log('init : ' + gl.isVertexArray(vb));
  gl.deleteVertexArray(vb);

  gl.clearColor(0, 0, 0, 0); 
  gl.clearColor(0, 0, 0, 0); 
  gl.clear(backbone.gl.COLOR_BUFFER_BIT)  

  vk = new VulkanExample(
    backbone.configuration
    , backbone.swapchains
    , backbone.graphicsDevice
    , backbone.presentationLayer
    , shaderPath
  );






  vk.renderLoop();
}
catch(err) {
  console.log(err);
}

if (el !== null) {
  el.innerText = 'Hello World via Typescript - DONE'
}
