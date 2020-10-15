import { Resource } from './Resource';
import { EntityWithId } from './EntityWithId';
import { EntityWithNumber } from './EntityWithNumber';
import { EntityWithParameters } from './EntityWithParameters';

export interface Track
  extends EntityWithNumber,
    EntityWithId,
    EntityWithParameters {
  name: string;
  resource: Resource;
  armedForRecording: boolean;
}
