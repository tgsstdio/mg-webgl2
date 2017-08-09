import {IWGLCmdDrawEncodingSection} from './IWGLCmdDrawEncodingSection';
import {IWGLGraphicsPipeline} from '../pipeline/IWGLGraphicsPipeline';
import {WGLCmdGraphicsBag} from './WGLCmdGraphicsBag';
import {WGLCmdEncoderContextSorter} from './WGLCmdEncoderContextSorter';
import {WGLCmdInternalDraw} from './WGLCmdInternalDraw';
import {WGLCmdEncodingInstruction} from './WGLCmdEncodingInstruction';
import {WGLCmdEncoderCategory} from './WGLCmdEncoderCategory';
import {IMgBuffer} from '../../mg/IMgBuffer';
import {IWGLBuffer} from '../IWGLBuffer';
import {WGLCmdInternalDrawIndirect} from './WGLCmdInternalDrawIndirect';
import {WGLCmdIndexBufferParameter} from './WGLCmdIndexBufferParameter';
import {WGLCmdInternalDrawIndexed} from './WGLCmdInternalDrawIndexed';
import {WGLCmdInternalDrawIndexedIndirect} from './WGLCmdInternalDrawIndexedIndirect';
import {MgIndexType} from '../../mg/MgIndexType'
import {MgPrimitiveTopology} from '../../mg/MgPrimitiveTopology'
import {WGLCmdAction} from './WGLCmdAction'
import {WGLCmdCommandRecording} from './WGLCmdCommandRecording'
import {IWGLBackbufferContext} from '../IWGLBackbufferContext'

export class WGLCmdDrawEncodingSection implements IWGLCmdDrawEncodingSection
{
  draw(
    pipeline: IWGLGraphicsPipeline
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter
    , vertexCount: number
    , instanceCount: number
    , firstVertex: number
    , firstInstance: number
  ): void {
    if (firstInstance != 0)
      throw new Error("firstInstance must be 0");

    let draw = new WGLCmdInternalDraw();
    draw.mode = this.getMode(pipeline.topology);
    draw.firstVertex = firstVertex;
    draw.indicesCount = this.getIndicesCountByTopology(
      pipeline.topology
      , vertexCount);
    draw.instanceCount = instanceCount;
    // ALWAYS draw.firstInstance = 0;

    let nextIndex = bag.draws.push(draw);

    let encoding = new WGLCmdEncodingInstruction();
    encoding.category = WGLCmdEncoderCategory.GRAPHICS;
    encoding.index = nextIndex;
    encoding.operation = new WGLCmdDraw();

    instructions.add(encoding);      
  }

  drawIndirect(
    pipeline: IWGLGraphicsPipeline
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter
    , buffer: IMgBuffer
    , offset: number
    , drawCount: number
    , stride: number            
  ) : void {
    let indirect = buffer as IWGLBuffer;

    let draw = new WGLCmdInternalDrawIndirect();        
    draw.mode = this.getMode(pipeline.topology);
    draw.indirect = indirect;
    draw.drawCount = drawCount;
    draw.offset = offset;
    draw.stride = stride;            

    let nextIndex = bag.drawIndirects.push(draw);

    let encoding = new WGLCmdEncodingInstruction();
    encoding.category = WGLCmdEncoderCategory.GRAPHICS;
    encoding.index = nextIndex;
    encoding.operation = new WGLCmdDrawIndirect();

    instructions.add(encoding);
  }

  drawIndexed(
    pipeline: IWGLGraphicsPipeline
    , indexBuffer: WGLCmdIndexBufferParameter
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter
    , indexCount: number
    , instanceCount: number
    , firstIndex: number
    , vertexOffset: number
    , firstInstance: number      
  ) : void {
    if (vertexOffset != 0)
      throw new Error("vertexOffset must be 0");

    if (firstInstance != 0)
      throw new Error("firstInstance must be 0");

    let draw = new WGLCmdInternalDrawIndexed();

    draw.mode = this.getMode(pipeline.topology);
    draw.elementCount =  indexCount;
    draw.elementType = this.getIndexBufferType(indexBuffer.indexType);
    let indexByteSize = this.getIndexByteSize(indexBuffer.indexType);
    draw.indexOffset = indexBuffer.offset + (firstIndex * indexByteSize);
    draw.instanceCount = instanceCount;
    // ALWAYS draw.vertexOffset = 0;
    // ALWAYS draw.firstInstance = 0;

    let nextIndex = bag.drawIndexeds.push(draw);

    let encoding = new WGLCmdEncodingInstruction();
    encoding.category = WGLCmdEncoderCategory.GRAPHICS;
    encoding.index = nextIndex;
    encoding.operation = new WGLCmdDrawIndexed();

    instructions.add(encoding);
  }

  drawIndexedIndirect(
    pipeline: IWGLGraphicsPipeline
    , indexBuffer: WGLCmdIndexBufferParameter
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter
    , buffer: IMgBuffer
    , offset: number
    , drawCount: number
    , stride: number      
  ): void {
    let indirect = buffer as IWGLBuffer;

    let draw = new WGLCmdInternalDrawIndexedIndirect();
    draw.mode = this.getMode(pipeline.topology);
    draw.topology = pipeline.topology;
    draw.indexType = indexBuffer.indexType;
    draw.elementType = this.getIndexBufferType(indexBuffer.indexType);
    draw.indexByteSize = this.getIndexByteSize(indexBuffer.indexType);
    draw.indirect = indirect;
    draw.topology = pipeline.topology;
    draw.drawCount = drawCount;
    draw.offset = offset;
    draw.stride = stride;

    // ALWAYS draw.firstInstance = 0;

    let nextIndex = bag.drawIndexedIndirects.push(draw);

    let encoding = new WGLCmdEncodingInstruction();
    encoding.category = WGLCmdEncoderCategory.GRAPHICS;
    encoding.index = nextIndex;
    encoding.operation = new WGLCmdDrawIndexedIndirect();

    instructions.add(encoding);
  }

  private getIndexByteSize(
    indexType: MgIndexType
  ) : number {
    switch (indexType)
    {
    case MgIndexType.UINT16:
      return 2;
    case MgIndexType.UINT32:
      return 4;	
    default:
      throw new Error ("not supported");
    }
  }

  private getIndexBufferType(
    indexType: MgIndexType
  ) : number {
    const UNSIGNED_SHORT: number = 0x1403;
    const UNSIGNED_INT: number = 0x1405;    

    switch (indexType) {
      case MgIndexType.UINT16:
        return UNSIGNED_SHORT;
      case MgIndexType.UINT32:
        return UNSIGNED_INT;	
      default:
        throw new Error ("not supported");
    }
  }

  private getMode(
    topology: MgPrimitiveTopology
  ) : number {
    const LINES: number = 0x0001;
    const POINTS: number = 0x0000;
    const TRIANGLES: number = 0x0004;        
    const LINE_STRIP: number = 0x0003;
    const TRIANGLE_FAN: number = 0x0006;        

    switch (topology)	{
      case MgPrimitiveTopology.LINE_LIST:
        return LINES;
      case MgPrimitiveTopology.POINT_LIST:
        return POINTS;
      case MgPrimitiveTopology.TRIANGLE_LIST:
        return TRIANGLES;
      case MgPrimitiveTopology.LINE_STRIP:
        return LINE_STRIP;
      case MgPrimitiveTopology.TRIANGLE_FAN:
        return TRIANGLE_FAN;
      default:
        throw new Error ("not supported");
    }
  }

  private getIndicesCountByTopology(
    topology: MgPrimitiveTopology
    , vertexCount: number    
  ) : number {
    switch (topology)	{
      case MgPrimitiveTopology.LINE_LIST:
        return vertexCount / 2;
      case MgPrimitiveTopology.POINT_LIST:
        return vertexCount;
      case MgPrimitiveTopology.TRIANGLE_LIST:
        return vertexCount / 3;
      case MgPrimitiveTopology.LINE_STRIP:
        return vertexCount - 1;
      case MgPrimitiveTopology.TRIANGLE_FAN:
        return vertexCount - 2;
      default:
        throw new Error ("not supported");
    }
  }        
}

class WGLCmdDraw implements WGLCmdAction {
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

    let items = grid.draws;
    if (items == null)
      return; 

    let draw = items[arg2];
    if (draw == null)
      return; 

    let renderer = context.stateRenderer;
    if (renderer == null)
      return;       

    renderer.draw(draw);
  }
}  

class WGLCmdDrawIndirect implements WGLCmdAction {
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

    let items = grid.drawIndirects;
    if (items == null)
      return; 

    let draw = items[arg2];
    if (draw == null)
      return; 

    let renderer = context.stateRenderer;
    if (renderer == null)
      return;       

    renderer.drawIndirect(draw);
  }
}    

class WGLCmdDrawIndexed implements WGLCmdAction {
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

    let items = grid.drawIndexeds;
    if (items == null)
      return; 

    let draw = items[arg2];
    if (draw == null)
      return; 

    let renderer = context.stateRenderer;
    if (renderer == null)
      return;       

    renderer.drawIndexed(draw);
  }
}   

class WGLCmdDrawIndexedIndirect implements WGLCmdAction {
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

    let items = grid.drawIndexedIndirects;
    if (items == null)
      return; 

    let drawIndexedIndirect = items[arg2];
    if (drawIndexedIndirect == null)
      return; 

    let renderer = context.stateRenderer;
    if (renderer == null)
      return;       

    renderer.drawIndexedIndirect(drawIndexedIndirect);
  }
}       
