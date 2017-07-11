import {IWGLCmdVertexArrayEncodingSection}
	from './IWGLCmdVertexArrayEncodingSection';	  
import {IWGLCmdVertexArrayEntrypoint}
	from './IWGLCmdVertexArrayEntrypoint';
import {WGLCmdVertexBufferObject}
	from './WGLCmdVertexBufferObject';	  
import {WGLCmdVertexBufferParameter}
	from './WGLCmdVertexBufferParameter'; 
import {WGLCmdIndexBufferParameter}
	from './WGLCmdIndexBufferParameter';	  
import {IMgBuffer}
	from '../mg/IMgBuffer';  
import {MgIndexType}
	from '../mg/MgIndexType'; 	
import {IWGLBuffer}
	from './IWGLBuffer';	  
import {IWGLGraphicsPipeline}
	from './IWGLGraphicsPipeline';  
import {WGLCmdGraphicsBag}
	from './WGLCmdGraphicsBag';	  
import {WGLCmdEncoderContextSorter}
	from './WGLCmdEncoderContextSorter';
import {WGLCmdEncodingInstruction}
	from './WGLCmdEncodingInstruction';	  
import {WGLCmdEncoderCategory}
	from './WGLCmdEncoderCategory'; 
import {MgBufferUsageFlagBits}
	from '../mg/MgBufferUsageFlagBits';  
import {WGLVertexAttribFunction}
	from './WGLVertexAttribFunction';	  
import {WGLCmdAction}
	from './WGLCmdAction';	  
import {WGLCmdCommandRecording}
	from './WGLCmdCommandRecording';		   	

export class WGLCmdVertexArrayEncodingSection
    implements IWGLCmdVertexArrayEncodingSection {

  private mVertexArrays: IWGLCmdVertexArrayEntrypoint;    
  private mCurrentVertexArray: WGLCmdVertexBufferObject|null;
  private mBoundVertexBuffer: WGLCmdVertexBufferParameter|null;
  
  private mBoundIndexBuffer: WGLCmdIndexBufferParameter|null;
  get boundIndexBuffer(): WGLCmdIndexBufferParameter|null {
    return this.mBoundIndexBuffer;
  }

  constructor(
    vertexArrays: IWGLCmdVertexArrayEntrypoint
  ) {
    this.mVertexArrays = vertexArrays;
    this.clear();
  }

  clear(): void {
    this.mCurrentVertexArray = null;
    this.mBoundIndexBuffer = null;
    this.mBoundVertexBuffer = null;
  }

  bindVertexBuffers(
    firstBinding: number
    , pBuffers: Array<IMgBuffer>
    , pOffsets: Array<number>|null
  ): void {
    if (pBuffers == null)
        throw new Error("pBuffers is null");

    let buffer = new WGLCmdVertexBufferParameter();
    buffer.firstBinding = firstBinding;
    buffer.pBuffers = pBuffers;
    buffer.pOffsets = pOffsets;
    this.mBoundVertexBuffer = buffer;
  }

  bindIndexBuffer(
    buffer: IMgBuffer
    , offset: number
    , indexType: MgIndexType
  ) : void {
    if (buffer == null)
      throw new Error("buffer is null");

    let temp = new WGLCmdIndexBufferParameter();
    temp.buffer = buffer as IWGLBuffer;
    temp.offset = offset;
    temp.indexType = indexType;
    this.mBoundIndexBuffer = temp;
  }

  pushIfRequired(
      pipeline: IWGLGraphicsPipeline
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter
  ): void {
    // create new vbo
    if (this.mCurrentVertexArray == null && this.mBoundVertexBuffer != null) {
      let vertexData = this.mBoundVertexBuffer as WGLCmdVertexBufferParameter;
      let vao = this.generateVBO(pipeline, vertexData);

      this.mCurrentVertexArray = vao;
      let nextIndex = bag.vertexArrays.push(vao);

      let inst = new WGLCmdEncodingInstruction();           
      inst.category = WGLCmdEncoderCategory.GRAPHICS;
      inst.index = nextIndex,
      inst.operation = new WGLCmdBindVertexBuffers();  

      instructions.add(inst);
    }
  }

  private generateVBO(
    pipeline: IWGLGraphicsPipeline
    , vertexData: WGLCmdVertexBufferParameter
  ): WGLCmdVertexBufferObject {
    let noOfBindings = pipeline.vertexInput.bindings.length;
    let bufferIds = new Array<WebGLBuffer|null>(noOfBindings);
    let offsets = new Array<number>(noOfBindings);

    for (let i = 0; i < vertexData.pBuffers.length; i += 1) {
        let index = i + vertexData.firstBinding;
        let buffer = vertexData.pBuffers[index] as IWGLBuffer;
        // SILENT error
        if (
          (buffer.usage & MgBufferUsageFlagBits.VERTEX_BUFFER_BIT)
            == MgBufferUsageFlagBits.VERTEX_BUFFER_BIT
        ) {
            bufferIds[i] = buffer.deviceMemory;
            offsets[i] = (vertexData.pOffsets != null) ? vertexData.pOffsets[i] : 0;
        }
        else {
            bufferIds[i] = 0;
            offsets[i] = 0;
        }
    }

    let vbo = this.mVertexArrays.generateVBO();

    this.mVertexArrays.bindVertexArray(vbo);
    // only one buffer can be attached in WebGL 2.0
    if (pipeline.vertexInput.attributes.length >= 1) {
        let bufferId = bufferIds[0];
        let binding = pipeline.vertexInput.bindings[0];
        let offset = offsets[0];
        this.mVertexArrays.bindVertexBuffer(bufferId);
    }

    // WEBGL: need to bind single buffer as vertex buffer to vertex array
    for (let attribute of pipeline.vertexInput.attributes) {          
      if (attribute.function == WGLVertexAttribFunction.FLOAT) {
          // NOT direct state access, must be currently bound
          this.mVertexArrays.bindFloatVertexAttribute(
            attribute.location
            , attribute.size
            , attribute.pointerType
            , attribute.isNormalized
            , attribute.stride
            , attribute.offset);
      }
      else if (attribute.function == WGLVertexAttribFunction.INT) {
          this.mVertexArrays.bindIntVertexAttribute(
            attribute.location
            , attribute.size
            , attribute.pointerType
            , attribute.stride
            , attribute.offset);
      }
      // PER VERTEX OR PER INSTANCE
      this.mVertexArrays.setupVertexAttributeDivisor(attribute.location, attribute.divisor);
    }

    if (this.mBoundIndexBuffer != null) {
      let indexBuffer = this.mBoundIndexBuffer.buffer;
      if (
        indexBuffer != null
        &&
        (
          (indexBuffer.usage & MgBufferUsageFlagBits.INDEX_BUFFER_BIT)
          == MgBufferUsageFlagBits.INDEX_BUFFER_BIT
        )
      ) {
        this.mVertexArrays.bindIndexBuffer(indexBuffer.deviceMemory);
      }
    }
    this.mVertexArrays.unbindVertexArray();

    return new WGLCmdVertexBufferObject(vbo, this.mVertexArrays);
  }    
}

class WGLCmdBindVertexBuffers implements WGLCmdAction {
  action(
    arg1: WGLCmdCommandRecording
    , arg2: number
  ) : void {
    let context = arg1.graphics;
    if (context == null)
      return;

    let grid = context.grid;
    if (grid == null)
      return;

    let items = grid.vertexArrays;
    if (items == null)
      return; 

    let vao = items[arg2];
    if (vao == null)
      return; 

    let renderer = context.stateRenderer;
    if (renderer == null)
      return;       

    renderer.bindVertexArrays(vao);
  }
}
