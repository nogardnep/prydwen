import { Sequence } from './Sequence';
import { Pattern } from './Pattern';
import { Entity } from './Entity';

export interface Project extends Entity {
  name: string;
  patterns: Pattern[];
  sequences: Sequence[];
}
