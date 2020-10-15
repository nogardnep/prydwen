import { TracksManagerService } from './../managers/tracks-manager.service';
import { Injectable, ɵConsole } from '@angular/core';
import { Subject } from 'rxjs';
import { config } from 'src/config/config';
import { AudioTrack } from './../../../models/entities/AudioTrack';
import { EntityUtils } from './../../utils/EntityUtils';
import { ResourcesDataService } from './../data/resources-data.service';
import { ProjectManagerService } from './../managers/project-manager.service';
import { UIService } from './../ui/ui.service';
import * as Tone from 'tone';
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
  private measureCountdown = 0;
  private armedTrack: AudioTrack = null;
  private recorder = new Tone.Recorder();

  recordingSubject = new Subject<boolean>();
  armedSubject = new Subject<boolean>();
  armedTrackSubject = new Subject<AudioTrack>();

  constructor(
    private resourcesDataService: ResourcesDataService,
    private projectManagerService: ProjectManagerService,
    private uiService: UIService,
    private tracksManagerService: TracksManagerService
  ) {
    this.init(() => {
      // this.start();
    });
  }

  private start(): void {
    this.setRecording(true);
    this.setArmed(false);
    this.armed = false;
    this.audioChunks = [];
    this.mediaRecorder.start();
    // this.recorder.start();
  }

  stop(): void {
    this.setArmed(false);

    if (this.recording) {
      this.setRecording(false);

      console.log('a');

      this.mediaRecorder.stop();

      // this.recorder.stop().then((blob: Blob) => {
      //   // const url = URL.createObjectURL(recording);

      //   // const anchor = document.createElement('a');
      //   // anchor.download = 'recording.webm';
      //   // anchor.href = url;
      //   // anchor.click();

      //   // const blob = new Blob(this.audioChunks, {
      //   //   type: 'audio/' + config.recording.audioExtension,
      //   // });

      //   console.log(blob);
      //   // const url = URL.createObjectURL(blob);
      //   // const audio = new Audio(url);
      //   // audio.play();
      //   // this.sendToServer(blob);
      // });
    }
  }

  check(): void {
    if (this.armed && this.measureCountdown <= 0) {
      this.start();
    }
  }

  decreaseCountdown(): void {
    this.measureCountdown--;
  }

  arm(): boolean {
    let ready = false;

    if (this.armedTrack === null) {
      this.uiService.inform('Please arm a pattern for recording');
    } else {
      this.measureCountdown = this.projectManagerService.getCurrentProject().recording.countdown;
      this.setArmed(true);
      ready = true;
    }

    return ready;
  }

  isRecording(): boolean {
    return this.recording;
  }

  emitRecording(): void {
    this.recordingSubject.next(this.recording);
  }

  emitArmed(): void {
    this.armedSubject.next(this.armed);
  }

  emitArmedTrack(): void {
    this.armedTrackSubject.next(this.armedTrack);
  }

  setArmedTrack(track: AudioTrack): void {
    const previousArmed = this.armedTrack;

    if (previousArmed !== null) {
      previousArmed.armedForRecording = false;
    }

    if (track != null) {
      track.armedForRecording = true;
    }

    this.armedTrack = track;
    this.emitArmedTrack();
  }

  unarmeAll(execpted?: AudioTrack): void {
    // TODO: unarm when changing sequence

    this.projectManagerService
      .getCurrentProject()
      .audioTracks.forEach((track: AudioTrack) => {
        if (execpted !== undefined && !EntityUtils.areSame(track, execpted)) {
          track.armedForRecording = false;
        }
      });
  }

  private init(callback?: () => any): void {
    console.log('INIT RECORDER');
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream: MediaStream) => {
        this.stream = stream;
        console.log(stream);
        const audioContext = new AudioContext()

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
    const filename =
      this.makeRecordName() + '.' + config.recording.audioExtension;
    const file = new File([blob], filename);

    this.resourcesDataService
      .storeFile(file, this.projectManagerService.getCurrentPath())
      .then(() => {
        this.armedTrack.resource = {
          path: filename,
          local: true,
        };

        this.projectManagerService.updateResources();
        this.tracksManagerService.update(this.armedTrack);
      });
  }

  private makeRecordName(): string {
    let name = '';

    if (this.armedTrack.name) {
      name += this.armedTrack.name + '-';
    }

    name += this.armedTrack.id;

    return name;
  }
}
