let el = document.getElementById('messageLog')

if (el !== null) {
  el.innerText = 'Hello World via Typescript'
}

import {VulkanExample} from './VulkanExample';
import {MgBackbone} from './MgBackbone';
import {VkTriangleDemoShaderPath} from './VkTriangleDemoShaderPath';
import {MgApplicationInfo} from '../mg/MgApplicationInfo';
import {pipelineTest} from './pipelineTest2';

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
  
  vk = new VulkanExample(
    backbone.configuration
    , backbone.swapchains
    , backbone.graphicsDevice
    , backbone.presentationLayer
    , shaderPath
  );

  pipelineTest(backbone)
}
catch(err) {
  console.log(err);
}

if (el !== null) {
  el.innerText = 'Hello World via Typescript - DONE'
}
