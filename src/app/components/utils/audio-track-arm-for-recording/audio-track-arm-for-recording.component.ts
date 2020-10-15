import { RecorderService } from './../../../services/mecanism/recorder.service';
import { AudioTrack } from './../../../../models/entities/AudioTrack';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-audio-track-arm-for-recording',
  templateUrl: './audio-track-arm-for-recording.component.html',
  styleUrls: ['./audio-track-arm-for-recording.component.scss']
})
export class AudioTrackArmForRecordingComponent implements OnInit {
  @Input() track: AudioTrack;

  constructor(private recorderService: RecorderService) {}

  ngOnInit(): void {}

  onClickArmForRecording(): void {
    this.track.armedForRecording = !this.track.armedForRecording;

    if (this.track.armedForRecording) {
      this.recorderService.setArmedTrack(this.track);
    }
  }

}
