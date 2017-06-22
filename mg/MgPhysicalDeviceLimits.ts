/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgPhysicalDeviceLimits {
    maxImageDimension1D: number;
    maxImageDimension2D: number;
    maxImageDimension3D: number;
    maxImageDimensionCube: number;
    maxImageArrayLayers: number;
    maxTexelBufferElements: number;
    maxUniformBufferRange: number;
    maxStorageBufferRange: number;
    maxPushConstantsSize: number;
    maxMemoryAllocationCount: number;
    maxSamplerAllocationCount: number;
    // WARN: bufferImageGranularity requires UInt64
    bufferImageGranularity: number;
    // WARN: sparseAddressSpaceSize requires UInt64
    sparseAddressSpaceSize: number;
    maxBoundDescriptorSets: number;
    maxPerStageDescriptorSamplers: number;
    maxPerStageDescriptorUniformBuffers: number;
    maxPerStageDescriptorStorageBuffers: number;
    maxPerStageDescriptorSampledImages: number;
    maxPerStageDescriptorStorageImages: number;
    maxPerStageDescriptorInputAttachments: number;
    maxPerStageResources: number;
    maxDescriptorSetSamplers: number;
    maxDescriptorSetUniformBuffers: number;
    maxDescriptorSetUniformBuffersDynamic: number;
    maxDescriptorSetStorageBuffers: number;
    maxDescriptorSetStorageBuffersDynamic: number;
    maxDescriptorSetSampledImages: number;
    maxDescriptorSetStorageImages: number;
    maxDescriptorSetInputAttachments: number;
    maxVertexInputAttributes: number;
    maxVertexInputBindings: number;
    maxVertexInputAttributeOffset: number;
    maxVertexInputBindingStride: number;
    maxVertexOutputComponents: number;
    maxTessellationGenerationLevel: number;
    maxTessellationPatchSize: number;
    maxTessellationControlPerVertexInputComponents: number;
    maxTessellationControlPerVertexOutputComponents: number;
    maxTessellationControlPerPatchOutputComponents: number;
    maxTessellationControlTotalOutputComponents: number;
    maxTessellationEvaluationInputComponents: number;
    maxTessellationEvaluationOutputComponents: number;
    maxGeometryShaderInvocations: number;
    maxGeometryInputComponents: number;
    maxGeometryOutputComponents: number;
    maxGeometryOutputVertices: number;
    maxGeometryTotalOutputComponents: number;
    maxFragmentInputComponents: number;
    maxFragmentOutputAttachments: number;
    maxFragmentDualSrcAttachments: number;
    maxFragmentCombinedOutputResources: number;
    maxComputeSharedMemorySize: number;
    maxComputeWorkGroupInvocations: number;
    subPixelPrecisionBits: number;
    subTexelPrecisionBits: number;
    mipmapPrecisionBits: number;
    maxDrawIndexedIndexValue: number;
    maxDrawIndirectCount: number;
    maxSamplerLodBias: number;
    maxSamplerAnisotropy: number;
    maxViewports: number;
    viewportSubPixelBits: number;
    // WARN: minTexelBufferOffsetAlignment requires UIntPtr
    minMemoryMapAlignment: number;
    // WARN: minTexelBufferOffsetAlignment requires UInt64
    minTexelBufferOffsetAlignment: number;
    // WARN: minUniformBufferOffsetAlignment requires UInt64
    minUniformBufferOffsetAlignment: number;
    // WARN: minStorageBufferOffsetAlignment requires UInt64
    minStorageBufferOffsetAlignment: number;
    minTexelOffset: number;
    maxTexelOffset: number;
    minTexelGatherOffset: number;
    maxTexelGatherOffset: number;
    minInterpolationOffset: number;
    maxInterpolationOffset: number;
    subPixelInterpolationOffsetBits: number;
    maxFramebufferWidth: number;
    maxFramebufferHeight: number;
    maxFramebufferLayers: number;
    framebufferColorSampleCounts: MgSampleCountFlagBits;
    framebufferDepthSampleCounts: MgSampleCountFlagBits;
    framebufferStencilSampleCounts: MgSampleCountFlagBits;
    framebufferNoAttachmentsSampleCounts: MgSampleCountFlagBits;
    maxColorAttachments: number;
    sampledImageColorSampleCounts: MgSampleCountFlagBits;
    sampledImageIntegerSampleCounts: MgSampleCountFlagBits;
    sampledImageDepthSampleCounts: MgSampleCountFlagBits;
    sampledImageStencilSampleCounts: MgSampleCountFlagBits;
    storageImageSampleCounts: MgSampleCountFlagBits;
    maxSampleMaskWords: number;
    timestampComputeAndGraphics: boolean;
    timestampPeriod: number;
    maxClipDistances: number;
    maxCullDistances: number;
    maxCombinedClipAndCullDistances: number;
    discreteQueuePriorities: number;
    pointSizeGranularity: number;
    lineWidthGranularity: number;
    strictLines: boolean;
    standardSampleLocations: boolean;
    // WARN: optimalBufferCopyOffsetAlignment requires UInt64
    optimalBufferCopyOffsetAlignment: number;
    // WARN: optimalBufferCopyRowPitchAlignment requires UInt64
    optimalBufferCopyRowPitchAlignment: number;
    // WARN: nonCoherentAtomSize requires UInt64
    nonCoherentAtomSize: number;
  }
}