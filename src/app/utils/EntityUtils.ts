import { EntityWithId } from './../../api/entities/EntityWithId';

export class EntityUtils {
  static areSame(a: EntityWithId, b: EntityWithId): boolean {
    return a.id === b.id;
  }
}
