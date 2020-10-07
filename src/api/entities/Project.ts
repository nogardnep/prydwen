import { EntityWithId } from './EntityWithId';
import { Pattern } from './Pattern';
import { Sequence } from './Sequence';

export interface Project extends EntityWithId {
  name: string;
  patterns: Pattern[];
  sequences: Sequence[];
}
