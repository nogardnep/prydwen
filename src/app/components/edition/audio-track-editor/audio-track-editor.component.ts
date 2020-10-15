import { RecorderService } from './../../../services/mecanism/recorder.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  AudioTrack,
  audioTrackParametersModel,
} from './../../../../models/entities/AudioTrack';
import { Resource } from './../../../../models/entities/Resource';
import { ParametersModel } from './../../../../models/parameters/Parameter';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { TracksManagerService } from './../../../services/managers/tracks-manager.service';

@Component({
  selector: 'app-audio-track-editor',
  templateUrl: './audio-track-editor.component.html',
  styleUrls: ['./audio-track-editor.component.scss'],
})
export class AudioTrackEditorComponent implements OnInit, OnDestroy {
  @Input() track: AudioTrack = null;
  availableResources: Resource[];

  private availableResourcesSubscription: Subscription;

  constructor(
    private projectManagerService: ProjectManagerService,
    private tracksManagerService: TracksManagerService
  ) {}

  ngOnInit(): void {
    this.availableResourcesSubscription = this.projectManagerService.availableResourcesSubject.subscribe(
      (resources: Resource[]) => {
        if (resources !== null) {
          this.availableResources = resources;
        }
      }
    );
    this.projectManagerService.emitAvailableResources();
  }

  ngOnDestroy(): void {
    this.availableResourcesSubscription.unsubscribe();
  }

  getParametersModel(): ParametersModel {
    return audioTrackParametersModel;
  }

  makeIdFor(label: string): string {
    return 'audio-track-editor-' + this.track.id + '-' + label;
  }

  onChangeAudio(): void {
    this.tracksManagerService.update(this.track);
    console.log(this.track.resource);
  }

  onClickPlay(): void {
    this.tracksManagerService.play(this.track);
  }

  onClickPause(): void {
    this.tracksManagerService.pause(this.track);
  }

  onClickStop(): void {
    this.tracksManagerService.stop(this.track);
  }

  onChangeParameter(): void {
    this.tracksManagerService.update(this.track);
  }
}
