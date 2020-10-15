import { config } from 'src/config/config';
import { Song } from 'src/models/entities/Song';
import { UIService } from './../../../services/ui/ui.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { SelectionService } from './../../../services/control/selection.service';
import { Component, Input, OnInit } from '@angular/core';
import { SongPart } from './../../../../models/entities/SongPart';
import { EntityView } from '../EntityView';

@Component({
  selector: 'app-song-part-view',
  templateUrl: './song-part-view.component.html',
  styleUrls: ['./song-part-view.component.scss'],
})
export class SongPartViewComponent implements OnInit, EntityView {
  @Input() songPart: SongPart;
  @Input() song: Song;
  minNum = config.entities.firstNum;
  maxNum = config.entities.maxNum;

  constructor(
    private selectionService: SelectionService,
    private projectManagerService: ProjectManagerService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {}

  onClickSelect(): void {
    this.selectionService.selectSongPart(this.songPart);
  }

  onClickRemove(): void {
    this.uiService.askConfirmation((confirmed: boolean) => {
      if (confirmed) {
        this.projectManagerService.removeSongPart(this.songPart, this.song);
      }
    });
  }

  onClickPlay(): void {
    // TODO
    console.log('TODO');
  }

  isSelected(): boolean {
    return this.selectionService.songPartIsSelected(this.songPart);
  }

  onChangeNum(value: string): void {
    this.projectManagerService.changeSongPartNum(
      this.song,
      this.songPart,
      +value
    );
  }

  makeIdFor(label: string): string {
    return 'song-part-view-' + this.songPart.id + '-' + label;
  }
}
