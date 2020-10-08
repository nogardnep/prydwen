import { SongPart } from './SongPart';
import { ParametersModel } from './../parameters/Parameter';
import { EntityWithNumber } from './EntityWithNumber';
import { EntityWithId } from './EntityWithId';

export interface Song extends EntityWithId, EntityWithNumber {
  name: string;
  songParts: SongPart[];
}

export const songParametersModel: ParametersModel = {
};
