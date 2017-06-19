// Code from MonoGame's Matrix4 code
// MIT License - Copyright (C) The Mono.Xna Team
// This file is subject to the terms and conditions defined in
// file 'LICENSE.txt', which is part of this source code package.
namespace TriangleDemo {
  export class Matrix4 {
    private mV: Float32Array;
    get values(): Float32Array {
      return this.mV;
    } 

    static readonly NO_OF_MEMBERS: number = 16;

    constructor(
      m00: number
      , m01: number
      , m02: number
      , m03: number
      , m10: number
      , m11: number
      , m12: number
      , m13: number
      , m20: number
      , m21: number
      , m22: number
      , m23: number 
      , m30: number
      , m31: number
      , m32: number
      , m33: number       
    ) {
      this.mV = new Float32Array(Matrix4.NO_OF_MEMBERS);
      this.mV[0] = m00;
      this.mV[1] = m01;
      this.mV[2] = m02;
      this.mV[3] = m03;

      this.mV[4] = m10;
      this.mV[5] = m11;
      this.mV[6] = m12;
      this.mV[7] = m13;
      
      this.mV[8] = m20;
      this.mV[9] = m21;
      this.mV[10] = m22;
      this.mV[11] = m23;

      this.mV[12] = m30;
      this.mV[13] = m31;
      this.mV[14] = m32;
      this.mV[15] = m33;
    }

    private static mIdentity: Matrix4 = new Matrix4(
      1, 0, 0, 0, 
      0, 1, 0, 0, 
      0, 0, 1, 0, 
      0, 0, 0, 1);

    // not sure if identity is static created 
    public static get identity(): Matrix4 {
      return this.mIdentity;
    }    

    private set M11(value: number) {
      this.mV[0] = value;
    }

    private set M12(value: number) {
      this.mV[1] = value;
    }  

    private set M13(value: number) {
      this.mV[2] = value;
    }    

    private set M14(value: number) {
      this.mV[3] = value;
    } 

    private set M21(value: number) {
      this.mV[4] = value;
    }

    private set M22(value: number) {
      this.mV[5] = value;
    }  

    private set M23(value: number) {
      this.mV[6] = value;
    }    

    private set M24(value: number) {
      this.mV[7] = value;
    }   

    private set M31(value: number) {
      this.mV[8] = value;
    }

    private set M32(value: number) {
      this.mV[9] = value;
    }  

    private set M33(value: number) {
      this.mV[10] = value;
    }    

    private set M34(value: number) {
      this.mV[11] = value;
    }    

    private set M41(value: number) {
      this.mV[12] = value;
    }

    private set M42(value: number) {
      this.mV[13] = value;
    }  

    private set M43(value: number) {
      this.mV[14] = value;
    }    

    private set M44(value: number) {
      this.mV[15] = value;
    }

    static createPerspectiveFieldOfView(
      fieldOfView: number
      , aspectRatio: number
      , nearPlaneDistance: number
      , farPlaneDistance: number
      , out : {result: Matrix4}
    ) : void {
      if ((fieldOfView <= 0) || (fieldOfView >= Math.PI)) {
        throw new Error("fieldOfView <= 0 or >= Math.PI");
      }
      if (nearPlaneDistance <= 0) {
        throw new Error("nearPlaneDistance <= 0");
      }
      if (farPlaneDistance <= 0) {
        throw new Error("farPlaneDistance <= 0");
      }
      if (nearPlaneDistance >= farPlaneDistance) {
        throw new Error("nearPlaneDistance >= farPlaneDistance");
      }
      let num = 1 / ( Math.tan(fieldOfView * 0.5));
      let num9 = num / aspectRatio;
      out.result.M11 = num9;
      out.result.M12 = out.result.M13 = out.result.M14 = 0;
      out.result.M22 = num;
      out.result.M21 = out.result.M23 = out.result.M24 = 0;
      out.result.M31 = out.result.M32 = 0;
      out.result.M33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
      out.result.M34 = -1;
      out.result.M41 = out.result.M42 = out.result.M44 = 0;
      out.result.M43 = (nearPlaneDistance * farPlaneDistance) / (nearPlaneDistance - farPlaneDistance);
    }

    static createTranslation(
      x: number
      , y: number
      , z: number
      , out: {result: Matrix4}
    ): void {
      out.result.M11 = 1;
      out.result.M12 = 0;
      out.result.M13 = 0;
      out.result.M14 = 0;
      out.result.M21 = 0;
      out.result.M22 = 1;
      out.result.M23 = 0;
      out.result.M24 = 0;
      out.result.M31 = 0;
      out.result.M32 = 0;
      out.result.M33 = 1;
      out.result.M34 = 0;
      out.result.M41 = x;
      out.result.M42 = y;
      out.result.M43 = z;
      out.result.M44 = 1;
    }  
  }
}