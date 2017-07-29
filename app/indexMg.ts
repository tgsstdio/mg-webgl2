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

function getShaderSource (id:string) : string {
  let node = document.getElementById(id)

  if (node && node.textContent) {
    return node.textContent.replace(/^\s+|\s+$/g, '')
  }
  else {
    return ''
  }
}

function createShader (
  gl: WebGL2RenderingContext
  , source: string
  , type: number
) {
  let shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

function createProgram (
  gl: WebGL2RenderingContext
  , vertexShaderSource: string
  , fragmentShaderSource: string
) : WebGLProgram | null {
  let program = gl.createProgram()
  let vshader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
  let fshader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER)
  gl.attachShader(program, vshader)
  gl.deleteShader(vshader)
  gl.attachShader(program, fshader)
  gl.deleteShader(fshader)
  gl.linkProgram(program)

  let log = gl.getProgramInfoLog(program)
  if (log) {
    console.log(log)
  }

  log = gl.getShaderInfoLog(vshader)
  if (log) {
    console.log(log)
  }

  log = gl.getShaderInfoLog(fshader)
  if (log) {
    console.log(log)
  }

  return program
}

function start (gl: WebGL2RenderingContext): void {
  // https://github.com/WebGLSamples/WebGL2Samples/blob/master/samples/draw_instanced.html#L98

  // -- Init Program
  let program = createProgram(gl, getShaderSource('vs-old'), getShaderSource('fs-old'))
  gl.useProgram(program)
  // -- Init Vertex Array
  let vertexArray = gl.createVertexArray()
  gl.bindVertexArray(vertexArray)
  // -- Init Buffers
  let vertexPosLocation = 0  // set with GLSL layout qualifier
  let vertices = new Float32Array([
    -0.3, -0.5,
    0.3, -0.5,
    0.0, 0.5
  ])
  let vertexPosBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  gl.enableVertexAttribArray(vertexPosLocation)
  gl.vertexAttribPointer(vertexPosLocation, 2, gl.FLOAT, false, 0, 0)
  let vertexColorLocation = 1  // set with GLSL layout qualifier
  let colors = new Float32Array([
    1.0, 0.5, 0.0,
    0.0, 0.5, 1.0
  ])
  let vertexColorBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW)
  gl.enableVertexAttribArray(vertexColorLocation)
  gl.vertexAttribPointer(vertexColorLocation, 3, gl.FLOAT, false, 0, 0)
  gl.vertexAttribDivisor(vertexColorLocation, 1) // attribute used once per instance
  gl.bindVertexArray(null)
  // -- Render
//  gl.clearColor(0.0, 0.0, 0.0, 1.0)
//  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.bindVertexArray(vertexArray)
  gl.drawArraysInstanced(gl.TRIANGLES, 0, 3, 2)
  // -- Delete WebGL resources
  gl.deleteBuffer(vertexPosBuffer)
  gl.deleteBuffer(vertexColorBuffer)
  gl.deleteProgram(program)
  gl.deleteVertexArray(vertexArray)
}

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

  // vk.renderLoop();

  start(backbone.gl)
}
catch(err) {
  console.log(err);
}

if (el !== null) {
  el.innerText = 'Hello World via Typescript - DONE'
}
