import { EntityWithParameters } from './EntityWithParameters';
import { Entity } from './Entity';
import { Position } from './../utils/Position';

export interface Event extends EntityWithParameters {
  position: Position;
}
