import { EntityWithNumber } from './EntityWithNumber';
import { Sequence } from './Sequence';
import { TimeSignature } from './../utils/TimeSignature';
import { ParametersModel } from './../parameters/Parameter';
import { Resource } from './Resource';
import { Sheet } from './Sheet';

export interface Pattern extends Sheet, EntityWithNumber {
  name: string;
  audio: {
    resource: Resource;
  };
  video: {
    resource: Resource;
  };
}

export const patternParametersModel: ParametersModel = {};
