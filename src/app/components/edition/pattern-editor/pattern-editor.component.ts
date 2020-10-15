import { AudioTrack } from './../../../../models/entities/AudioTrack';
import { EntityUtils } from './../../../utils/EntityUtils';
import { Component, Input, OnInit } from '@angular/core';
import {
  Pattern,
  PatternAudioTrack,
  patternParametersModel,
} from './../../../../models/entities/Pattern';
import { ParametersModel } from './../../../../models/parameters/Parameter';
import { PatternsManagerService } from './../../../services/managers/patterns-manager.service';
import { UIService } from './../../../services/ui/ui.service';

@Component({
  selector: 'app-pattern-editor',
  templateUrl: './pattern-editor.component.html',
  styleUrls: ['./pattern-editor.component.scss'],
})
export class PatternEditorComponent implements OnInit {
  @Input() pattern: Pattern = null;

  constructor(
    private patternsManagerService: PatternsManagerService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {}

  getParametersModel(): ParametersModel {
    return patternParametersModel;
  }

  makeIdFor(label: string): string {
    return 'pattern-editor-' + this.pattern.id + '-' + label;
  }

  makeIdForTrack(patternTrack: PatternAudioTrack, label: string): string {
    return (
      'pattern-editor-' +
      this.pattern.id +
      '-' +
      patternTrack.trackId +
      '-track-' +
      +label
    );
  }

  getPatterAudioTracks(): PatternAudioTrack[] {
    return this.pattern.audioTracks.sort((a, b) => {
      if (a.num > b.num) {
        return 1;
      } else if (a.num < b.num) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  onClickPlay(): void {
    this.patternsManagerService.play(this.pattern);
  }

  onClickPause(): void {
    this.patternsManagerService.pause(this.pattern);
  }

  onClickStop(): void {
    this.patternsManagerService.stop(this.pattern);
  }

  onClickAddAudioTrack(): void {
    this.patternsManagerService.addAudioTrack(this.pattern);
  }

  onClickRemoveAudioTrack(patternTrack: PatternAudioTrack): void {
    this.uiService.askConfirmation((confirmed: boolean) => {
      if (confirmed) {
        this.patternsManagerService.removeTrack(patternTrack, this.pattern);
      }
    });
  }

  onClickDecreaseNum(patternTrack: PatternAudioTrack): void {
    this.changeNum(patternTrack, -1);
  }

  onClickIncreaseNum(patternTrack: PatternAudioTrack): void {
    this.changeNum(patternTrack, 1);
  }

  onChangeTimeSignature(): void {
    this.patternsManagerService.update(this.pattern)
  }

  getAudioTrack(patternAudioTrack: PatternAudioTrack): AudioTrack {
    return this.patternsManagerService.getAudioTrackFor(patternAudioTrack);
  }

  private changeNum(
    patternTrack: PatternAudioTrack,
    modification: number
  ): void {
    const newNum = patternTrack.num + modification;

    if (
      newNum > 0 &&
      newNum <= EntityUtils.getMaxNum(this.pattern.audioTracks)
    ) {
      EntityUtils.changeEntityNum(
        this.pattern.audioTracks,
        patternTrack,
        newNum
      );
    }
  }
}
