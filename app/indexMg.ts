let el = document.getElementById('messageLog')

if (el !== null) {
  el.innerText = 'Hello World'
}

/// <reference path="MgBackbone.ts" />


try {
  let canvas = document.getElementById('glCanvas') as HTMLCanvasElement;

  let appInfo = new Magnesium.MgApplicationInfo();
  appInfo.application = "Hello World";
  appInfo.apiVersion = Magnesium.MgApplicationInfo.generateApiVersion(1, 17, 0);
  appInfo.engineName = "Engine";
  appInfo.engineVersion = 1;

  let backbone = new Magnesium.MgBackbone(appInfo, canvas);
  let width = 1280;
  let height = 720;

  backbone.configuration.initialize(width, height);
}
catch(err) {
  console.log(err);
}
