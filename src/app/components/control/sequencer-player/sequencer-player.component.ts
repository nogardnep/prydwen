import { Metronome } from './../../../../api/machine/Metronome';
import { RecorderService } from './../../../services/mecanism/recorder.service';
import { Position } from './../../../../api/utils/Position';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sequence } from './../../../../api/entities/Sequence';
import { SelectionService } from './../../../services/control/selection.service';
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
  recording = null;
  recorderArmed = null;
  metronome: Metronome = {
    muted: false,
    volume: 0.5,
  };
  useCountdown = true;
  playing = true;

  sequencerPositionSubscription: Subscription;
  selectedSequenceSubscription: Subscription;
  recordingSubscription: Subscription;
  recorderArmedSubscription: Subscription;
  playingSubscription: Subscription;

  constructor(
    private sequencerService: SequencerService,
    private sequencerOutputService: SequencerOutputService,
    private selectionService: SelectionService,
    private recorderService: RecorderService
  ) {
    // TODO: move
    this.sequencerService.switchMetronome(this.metronome.muted);
    this.sequencerService.setMetronomeVolume(this.metronome.volume);
  }

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
  }

  ngOnDestroy(): void {
    this.sequencerPositionSubscription.unsubscribe();
    this.selectedSequenceSubscription.unsubscribe();
    this.recordingSubscription.unsubscribe();
    this.recorderArmedSubscription.unsubscribe();
  }

  onClickPlay(): void {
    this.sequencerService.play();
  }

  onClickRecord(): void {
    if (!this.recorderArmed && !this.recording) {
      this.recorderService.arm(this.useCountdown);
      this.sequencerService.play();
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
    this.metronome.muted = !this.metronome.muted;
    this.sequencerService.switchMetronome(this.metronome.muted);
  }

  onChangeMetronomeVolume(volume: number): void {
    this.sequencerService.setMetronomeVolume(volume);
  }
}
