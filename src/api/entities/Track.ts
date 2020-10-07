import { EntityWithNumber } from './EntityWithNumber';
import { ParametersModel } from './../parameters/Parameter';
import { EntityWithId } from './EntityWithId';
import { Resource } from './Resource';

export interface Track extends EntityWithNumber, EntityWithId {
  name: string;
  audio: {
    resource: Resource;
  };
  video: {
    resource: Resource;
  };
}

export const trackParametersModel: ParametersModel = {};
