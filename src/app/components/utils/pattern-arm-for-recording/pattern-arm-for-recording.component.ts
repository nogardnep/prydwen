import { RecorderService } from './../../../services/mecanism/recorder.service';
import { Pattern } from './../../../../api/entities/Pattern';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pattern-arm-for-recording',
  templateUrl: './pattern-arm-for-recording.component.html',
  styleUrls: ['./pattern-arm-for-recording.component.scss'],
})
export class PatternArmForRecordingComponent implements OnInit {
  @Input() pattern: Pattern;

  constructor(private recorderService: RecorderService) {}

  ngOnInit(): void {}

  onClickArmForRecording(): void {
    this.pattern.armedForRecording = !this.pattern.armedForRecording;

    if (this.pattern.armedForRecording) {
      this.recorderService.setArmedPattern(this.pattern);
    }
  }
}
