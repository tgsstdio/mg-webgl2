let el = document.getElementById('messageLog')

if (el !== null) {
  el.innerText = 'Hello World'
}

import VulkanExample from './VulkanExample'
import MgBackbone from './MgBackbone'
import VkTriangleDemoShaderPath from './VkTriangleDemoShaderPath'

try {
  let canvas = document.getElementById('glCanvas') as HTMLCanvasElement;

  let appInfo = new Magnesium.MgApplicationInfo();
  appInfo.application = "Hello World";
  appInfo.apiVersion = Magnesium.MgApplicationInfo.generateApiVersion(1, 17, 0);
  appInfo.engineName = "Engine";
  appInfo.engineVersion = 1;

  let backbone = new MgBackbone(appInfo, canvas);
  let width = 1280;
  let height = 720;

  let shaderPath = new VkTriangleDemoShaderPath();

  let vk = new VulkanExample(
    backbone.configuration
    , backbone.swapchains
    , backbone.graphicsDevice
    , backbone.presentationLayer
    , shaderPath
  );

}
catch(err) {
  console.log(err);
}
