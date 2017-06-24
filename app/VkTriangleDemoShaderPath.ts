import {ITriangleDemoShaderPath} from './ITriangleDemoShaderPath'

export class VkTriangleDemoShaderPath implements ITriangleDemoShaderPath {            
  private getShaderSource(id:string): string {
    let elem = document.getElementById(id);
    
    if (elem != null && elem.textContent != null) {
      return elem.textContent.replace(/^\s+|\s+$/g, '');
    }
    else 
    {
      throw new Error('element: id not found');
    }
  }
  
  openVertexShader(): string {
    return this.getShaderSource('vs');
  }

  openFragmentShader(): string {
    return this.getShaderSource('fs');
  }
}
