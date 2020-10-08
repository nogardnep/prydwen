import { ParametersModel } from './../parameters/Parameter';
import { EntityWithNumber } from './EntityWithNumber';
import { EntityWithId } from './EntityWithId';

export interface SongPart extends EntityWithId, EntityWithNumber {
  name: string;
  sequenceId: number;
}

export const songPartParametersModel: ParametersModel = {
};
