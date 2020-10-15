import { Entity } from './Entity';

export type EntityId = number;

export interface EntityWithId extends Entity {
  id: EntityId;
}
