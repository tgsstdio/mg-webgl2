import {MgResult}
from '../mg/MgResult';  
import {IMgImage}
from '../mg/IMgImage';   
import {WGLImageArraySubresource}
from './WGLImageArraySubresource';	  
import {IWGLDeviceImageEntrypoint}
from './IWGLDeviceImageEntrypoint';
import {MgImageType}
	from '../mg/MgImageType';  
import {MgFormat}
	from '../mg/MgFormat';   
import {IWGLImage}
	from './IWGLImage';	  
import {IMgDevice}
	from '../mg/IMgDevice';	
import {IMgDeviceMemory}
	from '../mg/IMgDeviceMemory';
import {MgSubresourceLayout}
	from '../mg/MgSubresourceLayout';
import {WGLImageLevelSubresource}
	from './WGLImageLevelSubresource';
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';			

export class WGLImage implements IWGLImage {
	private mEntrypoint: IWGLDeviceImageEntrypoint;
	private mTexture: WebGLTexture;

	private mImageType: MgImageType;    
	get imageType(): MgImageType {
		return this.mImageType;
	}

	private mFormat: MgFormat;
	
	get format(): MgFormat {
		return this.mFormat;
	}
	
	private mWidth: number;
	get width() : number {
		return this.mWidth;
	}

	private mHeight: number;
	get height() : number {
		return this.mHeight;
	}

	private mDepth: number;
	get depth() : number {
		return this.mDepth;
	}

	private mLevels: number;
	get levels(): number {
		return this.mLevels;
	}

	private mLayers: number;
	get layers(): number {
		return this.mLayers;
	}

	constructor(
		entrypoint: IWGLDeviceImageEntrypoint
		, texture: WebGLTexture
		, imageType: MgImageType
		, format: MgFormat
		, width: number
		, height: number
		, depth: number
		, levels: number
		, layers:number
	) {
		this.mEntrypoint = entrypoint;
		this.mTexture = texture;
		this.mImageType = imageType;
		this.mFormat = format;
		this.mWidth = width;
		this.mHeight = height;
		this.mDepth = depth;
		this.mLevels = levels;
		this.mLayers = layers;
		this.generateMipmaps();
	}

	// WARN: memoryOffset requires ulong
	bindImageMemory(
		device: IMgDevice
		, memory: IMgDeviceMemory
		, memoryOffset: number
	) : MgResult {
		return MgResult.SUCCESS;
	}

	private mArraySubresources: Array<WGLImageArraySubresource>;  
	get arrayLayers(): Array<WGLImageArraySubresource> {
		return this.mArraySubresources;
	}

	private generateMipmaps() : void {
		// WARN: imageSize requires ulong
		let imageSize = 0;
		// WARN: imageSize requires ulong
		let offset = 0;

		let width = this.mWidth;
		let height = this.mHeight;
		let depth = this.mDepth;

		// 
		let pixelSize = WGLImage.getSize (this.mFormat);

		this.mArraySubresources = new Array<WGLImageArraySubresource>(this.mLayers);

		for (let index = 0; index < this.mLayers; index += 1) {
			let arrayItem = new WGLImageArraySubresource(
				index
				, new Array<WGLImageLevelSubresource>(this.mLevels));

			for (let level = 0; level < this.mLevels; level += 1) {		
				switch (this.mFormat)
				{
				// FIXME : 
				//				//case SurfaceFormat.RgbPvrtc2Bpp:
				//				case SurfaceFormat.RgbaPvrtc2Bpp:
				//					imageSize = (Math.Max(this.width, 16) * Math.Max(this.height, 8) * 2 + 7) / 8;
				//					break;
				//				case SurfaceFormat.RgbPvrtc4Bpp:
				//				case SurfaceFormat.RgbaPvrtc4Bpp:
				//					imageSize = (Math.Max(this.width, 8) * Math.Max(this.height, 8) * 4 + 7) / 8;
				//					break;
				case MgFormat.BC1_RGB_UNORM_BLOCK:
					//case SurfaceFormat.Dxt1:
				case MgFormat.BC1_RGBA_UNORM_BLOCK:
					//case SurfaceFormat.Dxt1a:
				case MgFormat.BC1_RGB_SRGB_BLOCK:
					//case SurfaceFormat.Dxt1SRgb:
				case MgFormat.BC2_UNORM_BLOCK:
					//case SurfaceFormat.Dxt3:
				case MgFormat.BC2_SRGB_BLOCK:				
					//case SurfaceFormat.Dxt3SRgb:
				case MgFormat.BC3_UNORM_BLOCK:
					//case SurfaceFormat.Dxt5:
				case MgFormat.BC3_SRGB_BLOCK:
					//case SurfaceFormat.Dxt5SRgb:
					//case SurfaceFormat.RgbEtc1:
					//case SurfaceFormat.RgbaAtcExplicitAlpha:
					//case SurfaceFormat.RgbaAtcInterpolatedAlpha:

					// TODO : include depth SOMEHOW
					imageSize = ((width + 3) / 4) * ((height + 3) / 4) * pixelSize;
					break;
				default:
					imageSize = pixelSize * width * height * depth;
					break;
				//return Result.ERROR_FEATURE_NOT_PRESENT;
				}

				let current = new MgSubresourceLayout();
				current.offset = offset;
				current.size = imageSize;
				current.arrayPitch = WGLImage.roundPixelUp(imageSize),
				current.rowPitch = (this.mImageType == MgImageType.TYPE_1D) 
					? 0
					: WGLImage.roundPixelUp(width);
				current.depthPitch = 
					( 
						this.mImageType == MgImageType.TYPE_1D 
						|| this.mImageType == MgImageType.TYPE_2D
					) 
					? 0 
					: WGLImage.roundPixelUp(depth);
			

				let mipLevelData = new WGLImageLevelSubresource ();
				mipLevelData.width = width;
				mipLevelData.height = height;
				mipLevelData.depth = depth;
				mipLevelData.subresourceLayout = current;

				arrayItem.levels [level] = mipLevelData;

				// for next array item
				offset += current.arrayPitch;

				if (width > 1)
					width /= 2;

				if (height > 1)
					height /= 2;

				if (depth > 1)
					depth /= 2;
			}
			this.mArraySubresources [index] = arrayItem;
		}
	}  

	private static getSize(surfaceFormat: MgFormat) : number {
		switch (surfaceFormat)
		{
		case MgFormat.BC1_RGB_UNORM_BLOCK:
		//case SurfaceFormat.Dxt1:
		case MgFormat.BC1_RGB_SRGB_BLOCK:
		//case SurfaceFormat.Dxt1SRgb:
		case MgFormat.BC1_RGBA_UNORM_BLOCK:
		//case SurfaceFormat.Dxt1a:
		//case SurfaceFormat.RgbPvrtc2Bpp:
		//case SurfaceFormat.RgbaPvrtc2Bpp:			
		//case SurfaceFormat.RgbEtc1:
			// One texel in DXT1, PVRTC 2bpp and ETC1 is a minimum 4x4 block, which is 8 bytes
			return 8;
		case MgFormat.BC2_UNORM_BLOCK:
		//case SurfaceFormat.Dxt3:
		case MgFormat.BC2_SRGB_BLOCK:
		//case SurfaceFormat.Dxt3SRgb:
		case MgFormat.BC3_UNORM_BLOCK:
		//case SurfaceFormat.Dxt5:
		case MgFormat.BC3_SRGB_BLOCK:
		//case SurfaceFormat.Dxt5SRgb:
		//case SurfaceFormat.RgbPvrtc4Bpp:
		//case SurfaceFormat.RgbaPvrtc4Bpp:
		//case SurfaceFormat.RgbaAtcExplicitAlpha:
		//case SurfaceFormat.RgbaAtcInterpolatedAlpha:
		// One texel in DXT3, DXT5 and PVRTC 4bpp is a minimum 4x4 block, which is 16 bytes
		case MgFormat.BC7_UNORM_BLOCK:
		case MgFormat.BC7_SRGB_BLOCK:
			return 16;
		case MgFormat.R8_UNORM:
		//case SurfaceFormat.Alpha8:
			return 1;
		case MgFormat.B5G6R5_UNORM_PACK16:
		//case SurfaceFormat.Bgr565:
		case MgFormat.B4G4R4A4_UNORM_PACK16:
		//case SurfaceFormat.Bgra4444:
		case MgFormat.B5G5R5A1_UNORM_PACK16:
		//case SurfaceFormat.Bgra5551:
		case MgFormat.R16_SFLOAT:
		//case SurfaceFormat.HalfSingle:
		case MgFormat.R16_UNORM:
		//case SurfaceFormat.NormalizedByte2:
			return 2;
		case MgFormat.R8G8B8A8_UINT:
			//case SurfaceFormat.Color:
		case MgFormat.R8G8B8A8_SRGB:
			//case SurfaceFormat.ColorSRgb:
		case MgFormat.R32_SFLOAT:
			//case SurfaceFormat.Single:
		case MgFormat.R16G16_UINT:
			//case SurfaceFormat.Rg32:
		case MgFormat.R16G16_SFLOAT:
			//case SurfaceFormat.HalfVector2:
		case MgFormat.R8G8B8A8_SNORM:
			//case SurfaceFormat.NormalizedByte4:
		case MgFormat.A2B10G10R10_UINT_PACK32:
			//case SurfaceFormat.Rgba1010102:
			//case SurfaceFormat.Bgra32:
			//case SurfaceFormat.Bgra32SRgb:
			//case SurfaceFormat.Bgr32:
			//case SurfaceFormat.Bgr32SRgb:
			return 4;
		case MgFormat.R16G16B16A16_SFLOAT:				
			//case SurfaceFormat.HalfVector4:
			//case SurfaceFormat.Rgba64:
		case MgFormat.R32G32_SFLOAT:
			//case SurfaceFormat.Vector2:
			return 8;
		case MgFormat.R32G32B32A32_SFLOAT:				
			//case SurfaceFormat.Vector4:
			return 16;
		case MgFormat.R8G8B8_SRGB:
		case MgFormat.R8G8B8_SSCALED:
		case MgFormat.R8G8B8_UINT:
		case MgFormat.R8G8B8_UNORM:
		case MgFormat.R8G8B8_USCALED:
		case MgFormat.R8G8B8_SINT:
		case MgFormat.R8G8B8_SNORM:
			return 3;
		default:
			throw new Error('surfaceFormat not supported');
		}
	}         

	//WARN : requires ulong
	private static roundPixelUp(value: number) : number
	{
		// TODO: round up to 4 
		return value;
	}    

	private mIsDisposed : boolean = false;
	destroyImage(
		device: IMgDevice
		, allocator: IMgAllocationCallbacks| null
	) : void {
		if (!this.mIsDisposed) {
			if (this.mEntrypoint != null) {
				this.mEntrypoint.deleteImage(this.mTexture);
			}
			this.mIsDisposed = true;
		}
	}
}
