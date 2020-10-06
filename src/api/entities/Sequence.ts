import { ParametersModel } from './../parameters/Parameter';
import { TimeSignature } from '../utils/TimeSignature';
import { Sheet } from './Sheet';

export interface Sequence extends Sheet {
  name: string;
  num: number;
  bank: number;
  timeSignature: TimeSignature;
}

export const sequenceParametersModel: ParametersModel = {
  bpm: {
    name: 'BPM',
    min: 20,
    max: 500,
    default: 120,
  },
};
