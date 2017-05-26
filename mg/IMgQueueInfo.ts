	namespace Magnesium {
    export interface IMgQueueInfo	{
      readonly queueIndex: number;
      readonly queueFamilyIndex: number;
      readonly device: IMgDevice;
      readonly queue: IMgQueue;
      createPartition (flags: MgCommandPoolCreateFlagBits) : IMgThreadPartition;
    }
  }