var el = document.getElementById('messageLog')

if (el !== null) {
  el.innerText = 'Hello World'
}

const initWebGL = require('./initWebGL.js')

function start () {
  var canvas = document.getElementById('glCanvas')

  // Initialize the GL context
  var gl = initWebGL(canvas)
  // Only continue if WebGL is available and working
  if (!gl) {
    throw new Error()
  }
}

start()
