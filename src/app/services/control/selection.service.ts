import { SongPart } from './../../../api/entities/SongPart';
import { Song } from './../../../api/entities/Song';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pattern } from './../../../api/entities/Pattern';
import { Sequence } from './../../../api/entities/Sequence';
import { EntityUtils } from './../../utils/EntityUtils';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private selectedSequence: Sequence = null;
  private selectedPattern: Pattern = null;
  private selectedSong: Song = null;
  private selectedSongPart: SongPart = null;

  selectedSequenceSubject = new Subject<Sequence>();
  selectedPatternSubject = new Subject<Pattern>();
  selectedSongSubject = new Subject<Song>();
  selectedSongPartSubject = new Subject<SongPart>();

  constructor() {}

  unselectAll(): void {
    this.selectPattern(null);
    this.selectSequence(null);
    this.selectSong(null);
    this.selectSongPart(null);
  }

  selectSong(song: Song): void {
    this.selectedSong = song;
    this.emitSelectedSong();
  }

  getSelectedSong(): Song {
    return this.selectedSong;
  }

  emitSelectedSong(): void {
    this.selectedSongSubject.next(this.selectedSong);
  }

  selectSongPart(songPart: SongPart): void {
    this.selectedSongPart = songPart;
    this.emitSelectedSongPart();
  }

  getSelectedSongPart(): SongPart {
    return this.selectedSongPart;
  }

  emitSelectedSongPart(): void {
    this.selectedSongPartSubject.next(this.selectedSongPart);
  }

  selectSequence(sequence: Sequence): void {
    this.selectPattern(null);
    this.selectedSequence = sequence;
    this.emitSelectedSequence();
  }

  getSelectedSequence(): Sequence {
    return this.selectedSequence;
  }

  emitSelectedSequence(): void {
    this.selectedSequenceSubject.next(this.selectedSequence);
  }

  selectPattern(pattern: Pattern): void {
    this.selectedPattern = pattern;
    this.emitSelectedPattern();
  }

  getSelectedPattern(): Pattern {
    return this.selectedPattern;
  }

  emitSelectedPattern(): void {
    this.selectedPatternSubject.next(this.selectedPattern);
  }

  sequenceIsSelected(sequence: Sequence): boolean {
    return (
      this.selectedSequence !== null &&
      EntityUtils.areSame(sequence, this.selectedSequence)
    );
  }

  patternIsSelected(pattern: Pattern): boolean {
    return (
      this.selectedPattern !== null &&
      EntityUtils.areSame(pattern, this.selectedPattern)
    );
  }

  songIsSelected(song: Song): boolean {
    return (
      this.selectedSong !== null && EntityUtils.areSame(song, this.selectedSong)
    );
  }

  songPartIsSelected(songPart: SongPart): boolean {
    return (
      this.selectedSongPart !== null &&
      EntityUtils.areSame(songPart, this.selectedSongPart)
    );
  }
}
