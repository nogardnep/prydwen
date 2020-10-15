import { Entity } from './../../models/entities/Entity';
import { EntityWithNumber } from './../../models/entities/EntityWithNumber';
import { EntityWithId, EntityId } from './../../models/entities/EntityWithId';

export class EntityUtils {
  static areSame(a: EntityWithId, b: EntityWithId): boolean {
    return a.id === b.id;
  }

  static makeId(): number {
    return Math.round(Math.random() * 100000);
  }

  static makeNum(group: EntityWithNumber[]): number {
    let num: number;

    if (group === undefined) {
      group = [];
      num = 1;
    } else {
      num = this.getMaxNum(group) + 1;
    }

    return num;
  }

  static getMaxNum(group: EntityWithNumber[]): number {
    let maxNum = 0;

    group.forEach((entity: EntityWithNumber) => {
      if (entity.num > maxNum) {
        maxNum = entity.num;
      }
    });

    return maxNum;
  }

  static moveIn(
    group: EntityWithNumber[],
    entity: EntityWithNumber,
    modification: number
  ): Entity {
    return EntityUtils.getEntityByNum(group, entity.num + modification);
  }

  static removeFrom(toRemove: EntityWithId, group: Entity[]): void {
    let foundIndex = -1;

    group.forEach((looked: EntityWithId, index: number) => {
      if (EntityUtils.areSame(looked, toRemove)) {
        foundIndex = index;
      }
    });

    if (foundIndex >= 0) {
      group.splice(foundIndex, 1);
    }
  }

  static changeEntityNum(
    group: EntityWithNumber[],
    entity: EntityWithNumber,
    num: number
  ): void {
    const previewWithThatNum = this.getEntityByNum(group, num);

    if (previewWithThatNum !== null) {
      previewWithThatNum.num = entity.num;
    }

    entity.num = num;
  }

  static getEntityByNum(
    group: EntityWithNumber[],
    num: number
  ): EntityWithNumber {
    let found = null;

    group.forEach((entity: EntityWithNumber) => {
      if (entity.num === num) {
        found = entity;
      }
    });

    return found;
  }

  static getEntityById(group: EntityWithId[], id: EntityId): EntityWithId {
    let found = null;

    group.forEach((entity: EntityWithId) => {
      if (entity.id === id) {
        found = entity;
      }
    });

    return found;
  }
}
