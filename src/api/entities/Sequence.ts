import { EntityWithParameters } from './EntityWithParameters';
import { Pattern } from './Pattern';
import { ParametersModel } from './../parameters/Parameter';
import { EntityWithId } from './EntityWithId';
import { EntityWithNumber } from './EntityWithNumber';
import { Sheet } from './Sheet';

export interface Sequence extends Sheet, EntityWithNumber, EntityWithId, EntityWithParameters {
  name: string;
  patterns: Pattern[];
}

export const sequenceParametersModel: ParametersModel = {
  bpm: {
    name: 'BPM',
    min: 20,
    max: 500,
    default: 120,
  },
};
