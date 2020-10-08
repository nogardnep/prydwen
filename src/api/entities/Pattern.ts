import { EntityWithNumber } from './EntityWithNumber';
import { EntityWithId } from './EntityWithId';
import { Sequence } from './Sequence';
import { TimeSignature } from './../utils/TimeSignature';
import { ParametersModel } from './../parameters/Parameter';
import { Resource } from './Resource';
import { Sheet } from './Sheet';

export interface Pattern extends Sheet, EntityWithNumber, EntityWithId {
  name: string;
  audio: {
    resource: Resource;
  };
  video: {
    resource: Resource;
  };
  armedForRecording: boolean;
  armedForPlaying: boolean;
  looping: boolean;
}

export const patternParametersModel: ParametersModel = {};
