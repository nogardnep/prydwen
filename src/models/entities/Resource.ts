import { Entity } from './Entity';

// TODO: iuse enum for resourcesTypes keys

export enum ResourceType {
  Audio = 'audio',
  Video = 'video',
}

export interface Resource extends Entity {
  path: string;
  local: boolean;
}

export type Extensions = string[];

export type ResourceTypes = {
  [key: string]: Extensions;
};

export const resourceTypes: ResourceTypes = {
  image: ['jpg', 'png', 'jpeg'],
  audio: ['wav', 'mp3', 'ogg'],
  video: ['avi', 'mp4'],
};
