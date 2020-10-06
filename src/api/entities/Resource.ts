import { Entity } from './Entity';

// TODO: iuse enum for resourcesTypes keys

export enum ResourceType {
  Audio = 'audio',
  Video = 'video',
}

export interface Resource extends Entity {
  path: string;
  local: boolean;
  src: string;
}

export type Extensions = string[];

export type ResourceTypes = {
  [key: string]: Extensions;
};

export const resourceTypes: ResourceTypes = {
  image: ['jpg', 'png'],
  audio: ['wav', 'mp3'],
  video: ['avi', 'mp4'],
};
