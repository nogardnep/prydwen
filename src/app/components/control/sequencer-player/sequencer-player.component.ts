import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from './../../../../api/entities/Project';
import { Sequence } from './../../../../api/entities/Sequence';
import { Position } from './../../../../api/utils/Position';
import { SelectionService } from './../../../services/control/selection.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { RecorderService } from './../../../services/mecanism/recorder.service';
import { SequencerOutputService } from './../../../services/mecanism/sequencer-output.service';
import { SequencerService } from './../../../services/mecanism/sequencer.service';

@Component({
  selector: 'app-sequencer-player',
  templateUrl: './sequencer-player.component.html',
  styleUrls: ['./sequencer-player.component.scss'],
})
export class SequencerPlayerComponent implements OnInit, OnDestroy {
  selectedSequence: Sequence = null;
  sequencerPosition: Position = null;
  project: Project = null;
  recording = null;
  recorderArmed = null;
  playing = true;

  sequencerPositionSubscription: Subscription;
  selectedSequenceSubscription: Subscription;
  recordingSubscription: Subscription;
  recorderArmedSubscription: Subscription;
  playingSubscription: Subscription;
  selectedProjectSubcription: Subscription;

  constructor(
    private sequencerService: SequencerService,
    private sequencerOutputService: SequencerOutputService,
    private selectionService: SelectionService,
    private recorderService: RecorderService,
    private projectManagerService: ProjectManagerService
  ) {}

  ngOnInit(): void {
    this.sequencerPositionSubscription = this.sequencerOutputService.positionSubject.subscribe(
      (position: Position) => {
        this.sequencerPosition = position;
      }
    );
    this.sequencerOutputService.emitPosition();

    this.selectedSequenceSubscription = this.selectionService.selectedSequenceSubject.subscribe(
      (sequence: Sequence) => {
        this.selectedSequence = sequence;
      }
    );
    this.selectionService.emitSelectedSequence();

    this.recordingSubscription = this.recorderService.recordingSubject.subscribe(
      (recording: boolean) => {
        this.recording = recording;
      }
    );
    this.recorderService.emitRecording();

    this.recorderArmedSubscription = this.recorderService.armedSubject.subscribe(
      (recorderArmed: boolean) => {
        this.recorderArmed = recorderArmed;
      }
    );
    this.recorderService.emitArmed();

    this.playingSubscription = this.sequencerOutputService.playingSubject.subscribe(
      (playing: boolean) => {
        this.playing = playing;
      }
    );
    this.sequencerOutputService.emitPlaying();

    this.selectedProjectSubcription = this.projectManagerService.currentProjectSubject.subscribe(
      (project: Project) => {
        if (project !== null) {
          this.project = project;

          // TODO: move
          this.sequencerService.switchMetronome(this.project.metronome.muted);
          this.sequencerService.setMetronomeVolume(
            this.project.metronome.volume
          );
        }
      }
    );
    this.projectManagerService.emitCurrentProject();
  }

  ngOnDestroy(): void {
    this.sequencerPositionSubscription.unsubscribe();
    this.selectedSequenceSubscription.unsubscribe();
    this.recordingSubscription.unsubscribe();
    this.recorderArmedSubscription.unsubscribe();
    this.selectedProjectSubcription.unsubscribe();
  }

  onClickPlay(): void {
    this.sequencerService.play();
  }

  onClickRecord(): void {
    if (!this.recorderArmed && !this.recording) {
      this.recorderService.arm();
    }
  }

  onClickPause(): void {
    this.sequencerService.pause();
  }

  onClickStop(): void {
    this.recorderService.stop();
    this.sequencerService.stop();
  }

  onClickSwitchMetronome(): void {
    // TODO: move
    this.project.metronome.muted = !this.project.metronome.muted;
    this.sequencerService.switchMetronome(this.project.metronome.muted);
  }

  onChangeMetronomeVolume(volume: number): void {
    this.sequencerService.setMetronomeVolume(volume);
  }
}
