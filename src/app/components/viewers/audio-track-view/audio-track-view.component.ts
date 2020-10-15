import { TracksManagerService } from './../../../services/managers/tracks-manager.service';
import { EntityView } from './../EntityView';
import { UIService } from './../../../services/ui/ui.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { SelectionService } from './../../../services/control/selection.service';
import { AudioTrack } from './../../../../models/entities/AudioTrack';
import { config } from './../../../../config/config';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-audio-track-view',
  templateUrl: './audio-track-view.component.html',
  styleUrls: ['./audio-track-view.component.scss'],
})
export class AudioTrackViewComponent implements OnInit, EntityView {
  @Input() track: AudioTrack;
  minNum = config.entities.firstNum;
  maxNum = config.entities.maxNum;

  constructor(
    private selectionService: SelectionService,
    private projectManagerService: ProjectManagerService,
    private uiService: UIService,
    private tracksManagerService: TracksManagerService
  ) {}

  ngOnInit(): void {}

  onClickSelect(): void {
    this.selectionService.selectTrack(this.track);
  }

  onClickRemove(): void {
    this.uiService.askConfirmation((confirmed: boolean) => {
      if (confirmed) {
        this.projectManagerService.removeAudioTrack(this.track);
      }
    });
  }

  onChangeNum(value: string): void {
    this.projectManagerService.changeAudioTrackNum(this.track, +value);
  }

  makeIdFor(label: string): string {
    return 'track-view-' + this.track.id + '-' + label;
  }

  onClickPlay(): void {
    // TODO
    this.tracksManagerService.play(this.track);
  }

  isSelected(): boolean {
    return this.selectionService.trackIsSelected(this.track);
  }
}
