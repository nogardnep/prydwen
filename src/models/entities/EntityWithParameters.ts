import { Entity } from './Entity';
import { Parameters } from './../parameters/Parameter';

export interface EntityWithParameters extends Entity {
  parameters: Parameters;
}
