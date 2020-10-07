import { EntityWithNumber } from './EntityWithNumber';
import { ParametersModel } from './../parameters/Parameter';
import { TimeSignature } from '../utils/TimeSignature';
import { Sheet } from './Sheet';

export interface Sequence extends Sheet, EntityWithNumber {
  name: string;
}

export const sequenceParametersModel: ParametersModel = {
  bpm: {
    name: 'BPM',
    min: 20,
    max: 500,
    default: 120,
  },
};
