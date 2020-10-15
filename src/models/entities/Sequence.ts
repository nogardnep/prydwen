import { ParametersModel, ParameterValue } from './../parameters/Parameter';
import { EntityWithId, EntityId } from './EntityWithId';
import { EntityWithNumber } from './EntityWithNumber';
import { EntityWithParameters } from './EntityWithParameters';
import { SequenceEvent } from './SequenceEvent';
import { Sheet } from './Sheet';

export interface SequencePattern extends EntityWithNumber, EntityWithId {
  patternId: EntityId;
  armed: boolean;
  looping: boolean;
}

export interface Sequence
  extends Sheet,
    EntityWithNumber,
    EntityWithId,
    EntityWithParameters {
  name: string;
  events: SequenceEvent[];
  patterns: SequencePattern[];
  parameters: {};
}

export const sequenceParametersModel: ParametersModel = {
  bpm: {
    name: 'BPM',
    min: 20,
    max: 300,
    default: 120,
    step: 1,
  },
};
