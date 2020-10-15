import { ParametersModel } from '../parameters/Parameter';
import { Resource } from './Resource';
import { Track } from './Track';

export enum Reverse {
  NoReverse = 0,
  Reverse = 1,
}

export interface AudioTrack extends Track {
  name: string;
  resource: Resource;
  armedForRecording: boolean;
}

export const audioTrackParametersModel: ParametersModel = {
  reverse: {
    default: 0,
    name: 'reverse',
    max: 1,
    min: 0,
    step: 1,
    labels: [
      {
        value: Reverse.NoReverse,
        text: 'No',
      },
      {
        value: Reverse.Reverse,
        text: 'Yes',
      },
    ],
  },
  fadein: {
    default: 0,
    name: 'fadein',
    max: 100,
    min: 0,
    step: 0.1,
  },
  fadeout: {
    default: 0,
    name: 'fadeout',
    max: 100,
    min: 0,
    step: 0.1,
  },
  loopEnd: {
    default: 0,
    name: 'loopEnd',
    max: 100,
    min: 0,
    step: 0.1,
  },
  loopStart: {
    default: 0,
    name: 'loopStart',
    max: 100,
    min: 0,
    step: 0.1,
  },
};
