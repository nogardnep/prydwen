import { PatternsManagerService } from './../managers/patterns-manager.service';
import { EntityUtils } from './../../utils/EntityUtils';
import { Sequence } from './../../../api/entities/Sequence';
import { SelectionService } from './../control/selection.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config } from 'src/config/config';
import { Pattern } from './../../../api/entities/Pattern';
import { ResourcesDataService } from './../data/resources-data.service';
import { ProjectManagerService } from './../managers/project-manager.service';
import { ResourcesManagerService } from './../managers/resources-manager.service';
import { UIService } from './../ui/ui.service';
declare var MediaRecorder: any;

@Injectable({
  providedIn: 'root',
})
export class RecorderService {
  private mediaRecorder: any; // TODO: better
  private stream: MediaStream;
  private audioChunks: BlobPart[]; // TDOO
  private armed = false;
  private recording = false;
  private mesureCountdown = 0;
  private armedPattern: Pattern = null;

  recordingSubject = new Subject<boolean>();
  armedSubject = new Subject<boolean>();
  armedPatternSubject = new Subject<Pattern>();

  constructor(
    private resourcesDataService: ResourcesDataService,
    private projectManagerService: ProjectManagerService,
    private uiService: UIService,
    private resourcesManagerService: ResourcesManagerService,
    private selectionService: SelectionService,
    private patternsManagerService:PatternsManagerService
  ) {
    this.init();
  }

  private start(): void {
    console.log('start');
    this.setRecording(true);
    this.setArmed(false);
    this.armed = false;
    this.audioChunks = [];
    this.mediaRecorder.start();
  }

  stop(): void {
    this.setArmed(false);

    if (this.recording) {
      this.setRecording(false);
      this.mediaRecorder.stop();
    }
  }

  check(): void {
    if (this.armed && this.mesureCountdown <= 0) {
      this.start();
    }
  }

  decreaseCountdown(): void {
    this.mesureCountdown--;
  }

  arm(): boolean {
    let ready = false;

    if (this.armedPattern === null) {
      this.uiService.inform('Please arm a pattern for recording');
    } else {
      this.mesureCountdown = this.projectManagerService.getCurrentProject().recording.countdown;
      this.setArmed(true);
      ready = true;
    }

    return ready;
  }

  emitRecording(): void {
    this.recordingSubject.next(this.recording);
  }

  emitArmed(): void {
    this.armedSubject.next(this.armed);
  }

  emitArmedPattern(): void {
    this.armedPatternSubject.next(this.armedPattern);
  }

  setArmedPattern(pattern: Pattern): void {
    const previousArmed = this.armedPattern;

    if (previousArmed !== null) {
      previousArmed.armedForRecording = false;
    }

    if (pattern != null) {
      pattern.armedForRecording = true;
    }

    this.armedPattern = pattern;
    this.emitArmedPattern();
  }

  unarmeAll(execpted: Pattern): void {
    // TODO: unarm when changing sequence

    this.projectManagerService
      .getCurrentProject()
      .sequences.forEach((sequence: Sequence) => {
        sequence.patterns.forEach((pattern: Pattern) => {
          if (!EntityUtils.areSame(pattern, execpted)) {
            pattern.armedForRecording = false;
          }
        });
      });
  }

  private init(callback?: () => any): void {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        this.stream = stream;
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.addEventListener('dataavailable', (event) => {
          this.audioChunks.push(event.data);
        });

        this.mediaRecorder.addEventListener('stop', () => {
          this.onRecordEnd();
        });

        if (callback !== undefined) {
          callback();
        }
      })
      .catch((error) => {
        console.log(error);
        console.error('Error when loading audio input');
      });
  }

  private onRecordEnd(): void {
    const blob = new Blob(this.audioChunks, {
      type: 'audio/' + config.recording.audioExtension,
    });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
    this.sendToServer(blob);
  }

  private setArmed(armed: boolean): void {
    this.armed = armed;
    this.emitArmed();
  }

  private setRecording(recording: boolean): void {
    this.recording = recording;
    this.emitRecording();
  }

  private sendToServer(blob: Blob): void {
    let name = '';

    if (this.armedPattern.name) {
      name += this.armedPattern.name + '-';
    }

    name += this.armedPattern.id;

    const path =
      this.projectManagerService.getCurrentPath() +
      '/' +
      name +
      '.' +
      config.recording.audioExtension;

    this.resourcesDataService
      .storeFile(
        new File([blob], name + '.' + config.recording.audioExtension),
        // blob,
        this.projectManagerService.getCurrentPath()
      )
      .then(() => {
        const newResouce = this.resourcesManagerService.makeResource(path);
        this.armedPattern.audio.resource = newResouce;
        this.projectManagerService.updateResources();
        this.patternsManagerService.updateAudio(this.armedPattern);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
