import { ParametersModel } from './../parameters/Parameter';
import { Entity } from './Entity';
import { Resource } from './Resource';

export interface Track extends Entity {
  name: string;
  num: number;
  bank: number;
  audio: {
    resource: Resource;
  };
  video: {
    resource: Resource;
  };
}

export const trackParametersModel: ParametersModel = {};
