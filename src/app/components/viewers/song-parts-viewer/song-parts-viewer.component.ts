import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from 'src/models/entities/Song';
import { SongPart } from './../../../../models/entities/SongPart';
import { SelectionService } from './../../../services/control/selection.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';

@Component({
  selector: 'app-song-parts-viewer',
  templateUrl: './song-parts-viewer.component.html',
  styleUrls: ['./song-parts-viewer.component.scss'],
})
export class SongPartsViewerComponent implements OnInit {
  songParts: SongPart[] = [];
  song: Song = null;

  songSubscription: Subscription;

  constructor(
    private projectManagerService: ProjectManagerService,
    private selectionService: SelectionService
  ) {}

  ngOnInit(): void {
    this.songSubscription = this.selectionService.selectedSongSubject.subscribe(
      (song: Song) => {
        if (song !== null) {
          this.song = song;
          this.songParts = song.songParts;
        } else {
          this.init();
        }
      }
    );
    this.selectionService.emitSelectedSong();
  }

  getSongParts(): SongPart[] {
    // TODO: sort by num
    return this.songParts;
  }

  onClickAddSongPart(): void {
    this.projectManagerService.addSongPart(
      this.selectionService.getSelectedSong()
    );
  }

  init(): void {
    this.songParts = [];
  }
}
