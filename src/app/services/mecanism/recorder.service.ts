import { ResourcesManagerService } from './../managers/resources-manager.service';
import { config } from 'src/config/config';
import { Pattern } from './../../../api/entities/Pattern';
import { UtilsService } from './../control/utils.service';
import { Subject } from 'rxjs';
import { ProjectManagerService } from './../managers/project-manager.service';
import { ServerService } from './../server/server.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    private serverService: ServerService,
    private projectManagerService: ProjectManagerService,
    private utilsService: UtilsService,
    private resourcesManagerService: ResourcesManagerService
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

  arm(useCountdown: boolean): boolean {
    let ready = false;

    if (this.armedPattern === null) {
      this.utilsService.inform('Please arm a pattern');
    } else {
      if (useCountdown) {
        this.mesureCountdown = 1;
      }

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
    this.armedPattern = pattern;
    this.emitArmedPattern();
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
      name += this.armedPattern.name;
    }

    name += this.armedPattern.id;

    const path =
      this.projectManagerService.getSelectedProjectWrapper().path +
      '/' +
      name +
      '.' +
      config.recording.audioExtension;

    this.serverService
      .storeFile(
        new File([blob], name + '.' + config.recording.audioExtension),
        // blob,
        this.projectManagerService.getSelectedProjectWrapper().path
      )
      .then(() => {
        const newResouce = this.resourcesManagerService.makeResource(path);
        this.armedPattern.audio.resource = newResouce;
        this.projectManagerService.updateResources();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
