import { Subject } from 'rxjs';
import { ProjectManagerService } from './../managers/project-manager.service';
import { ServerService } from './../server/server.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare var MediaRecorder: any;

const recordExtension = 'wav';

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

  recordingSubject = new Subject<boolean>();
  armedSubject = new Subject<boolean>();

  constructor(
    private serverService: ServerService,
    private projectManagerService: ProjectManagerService
  ) {
    this.init();
  }

  private start(): void {
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
    if (this.armed) {
      if (this.isReadyForRecording()) {
        this.start();
      } else {
        this.mesureCountdown--;
      }
    }
  }

  arm(useCountdown: boolean): void {
    if (useCountdown) {
      this.mesureCountdown = 1;
      this.setArmed(true);
    } else {
      this.start();
    }
  }

  emitRecording(): void {
    this.recordingSubject.next(this.recording);
  }

  emitArmed(): void {
    this.armedSubject.next(this.armed);
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
          console.log(this.audioChunks.length);
          const blob = new Blob(this.audioChunks, {
            type: 'audio/' + recordExtension,
          });
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audio.play();
          this.sendToServer(blob);
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

  private isReadyForRecording(): boolean {
    return this.mesureCountdown <= 0;
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
    const name = 'test';

    this.serverService.storeFile(
      new File([blob], name + '.' + recordExtension),
      // blob,
      this.projectManagerService.getSelectedProjectWrapper().path
    );
  }
}
