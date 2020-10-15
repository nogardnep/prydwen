import { ParametersModel } from './../parameters/Parameter';
import { AudioTrack } from './AudioTrack';
import { EntityWithId, EntityId } from './EntityWithId';
import { EntityWithNumber } from './EntityWithNumber';
import { PatternEvent } from './PatternEvent';
import { Sheet } from './Sheet';

export interface PatternAudioTrack extends EntityWithNumber, EntityWithId {
  trackId: EntityId;
  armed: boolean;
}

export interface Pattern extends Sheet, EntityWithNumber, EntityWithId {
  name: string;
  events: PatternEvent[];
  looping: boolean;
  audioTracks: PatternAudioTrack[];
}

export const patternParametersModel: ParametersModel = {};
