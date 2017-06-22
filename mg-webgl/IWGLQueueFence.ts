import {IMgFence} from '../mg/IMgFence'

export interface IWGLQueueFence extends IMgFence {
  signal() : boolean;
}
