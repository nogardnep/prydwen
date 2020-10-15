import { RecorderService } from './../mecanism/recorder.service';
import { Injectable } from '@angular/core';
import { EntityUtils } from 'src/app/utils/EntityUtils';
import { AudioTrack } from './../../../models/entities/AudioTrack';
import { Pattern, PatternAudioTrack } from './../../../models/entities/Pattern';
import { Position } from './../../../models/utils/Position';
import { PatternWrapper } from './../../../models/wrappers/PatternWrapper';
import { ProjectManagerService } from './project-manager.service';
import { TracksManagerService } from './tracks-manager.service';

@Injectable({
  providedIn: 'root',
})
export class PatternsManagerService {
  private patternWrappers: PatternWrapper[] = [];

  constructor(
    private projectManagerService: ProjectManagerService,
    private tracksManagerService: TracksManagerService,
    private recorderService: RecorderService
  ) {}

  setPatternWrappers(patternWrappers: PatternWrapper[]): void {
    this.patternWrappers = patternWrappers;
  }

  startAll(): void {
    this.stopAll();
    this.patternWrappers.forEach((patternWrapper: PatternWrapper) => {
      patternWrapper.initPosition();
      this.play(patternWrapper.pattern);
    });
  }

  stopAll(): void {
    this.patternWrappers.forEach((patternWrapper: PatternWrapper) => {
      this.stop(patternWrapper.pattern);
    });
  }

  play(pattern: Pattern): void {
    this.applyForAllTracks(
      pattern,
      (track: AudioTrack, patternTrack: PatternAudioTrack) => {
        if (patternTrack.armed) {
          this.tracksManagerService.play(track, this.recorderService.isRecording());
        }
      }
    );
  }

  update(pattern: Pattern): void {
    // TODO: delete?
    // this.patternWrappers.forEach((looked: PatternWrapper, index: number) => {
    //   if (looked.pattern.id === pattern.id) {
    //     this.patternWrappers[index] = new PatternWrapper(pattern);
    //   }
    // });
    // console.log(this.patternWrappers);
  }

  moveAll(progression: Position): void {
    this.patternWrappers.forEach((patternWrapper: PatternWrapper) => {
      patternWrapper.move(progression);
      if (patternWrapper.reachedEnd()) {
        this.stop(patternWrapper.pattern);
        console.log(patternWrapper.looping);

        if (patternWrapper.looping) {
          patternWrapper.initPosition();
          //this.play(patternWrapper.pattern);
          console.log('LOOP');
        }
      }
    });
  }

  pause(pattern: Pattern): void {
    this.applyForAllTracks(pattern, (track: AudioTrack) => {
      this.tracksManagerService.pause(track);
    });
  }

  stop(pattern: Pattern): void {
    this.applyForAllTracks(pattern, (track: AudioTrack) => {
      this.tracksManagerService.stop(track);
    });
  }

  addAudioTrack(pattern: Pattern): void {
    const newTrack = this.projectManagerService.addAudioTrack();

    pattern.audioTracks.push({
      id: EntityUtils.makeId(),
      num: EntityUtils.makeNum(pattern.audioTracks),
      trackId: newTrack.id,
      armed: true,
    });
  }

  removeTrack(patternTrack: PatternAudioTrack, pattern: Pattern): void {
    pattern.audioTracks.forEach((looked: PatternAudioTrack) => {
      if (looked.trackId === patternTrack.trackId) {
        EntityUtils.removeFrom(looked, pattern.audioTracks);
      }
    });

    this.projectManagerService.removeAudioTrack(
      this.getAudioTrackFor(patternTrack)
    );
  }

  getAudioTrackFor(patternAudioTrack: PatternAudioTrack): AudioTrack {
    return EntityUtils.getEntityById(
      this.projectManagerService.getCurrentProject().audioTracks,
      patternAudioTrack.trackId
    ) as AudioTrack;
  }

  private applyForAllTracks(
    pattern: Pattern,
    callback: (track: AudioTrack, patternTrack: PatternAudioTrack) => void
  ): void {
    pattern.audioTracks.forEach((patternTrack: PatternAudioTrack) => {
      callback(this.getAudioTrackFor(patternTrack), patternTrack);
    });
  }
}
