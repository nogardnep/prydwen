import { SequencesManagerService } from './../managers/sequences-manager.service';
import { SongPart } from './../../../models/entities/SongPart';
import { Song } from './../../../models/entities/Song';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pattern } from './../../../models/entities/Pattern';
import { Sequence } from './../../../models/entities/Sequence';
import { Track } from './../../../models/entities/Track';
import { EntityUtils } from './../../utils/EntityUtils';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private selectedSequence: Sequence = null;
  private selectedPattern: Pattern = null;
  private selectedSong: Song = null;
  private selectedSongPart: SongPart = null;
  private selectedTrack: Track = null;

  selectedSequenceSubject = new Subject<Sequence>();
  selectedPatternSubject = new Subject<Pattern>();
  selectedSongSubject = new Subject<Song>();
  selectedSongPartSubject = new Subject<SongPart>();
  selectedTrackSubject = new Subject<Track>();

  constructor() {}

  unselectAll(): void {
    this.selectPattern(null);
    this.selectSequence(null);
    this.selectSong(null);
    this.selectSongPart(null);
    this.selectTrack(null);
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

  songIsSelected(song: Song): boolean {
    return (
      this.selectedSong !== null && EntityUtils.areSame(song, this.selectedSong)
    );
  }

  getSelectedSongPart(): SongPart {
    return this.selectedSongPart;
  }

  emitSelectedSongPart(): void {
    this.selectedSongPartSubject.next(this.selectedSongPart);
  }

  songPartIsSelected(songPart: SongPart): boolean {
    return (
      this.selectedSongPart !== null &&
      EntityUtils.areSame(songPart, this.selectedSongPart)
    );
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

  sequenceIsSelected(sequence: Sequence): boolean {
    return (
      this.selectedSequence !== null &&
      EntityUtils.areSame(sequence, this.selectedSequence)
    );
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

  patternIsSelected(pattern: Pattern): boolean {
    return (
      this.selectedPattern !== null &&
      EntityUtils.areSame(pattern, this.selectedPattern)
    );
  }

  selectTrack(track: Track): void {
    this.selectedTrack = track;
    this.emitSelectedTrack();
  }

  getSelectedTrack(): Track {
    return this.selectedTrack;
  }

  emitSelectedTrack(): void {
    this.selectedTrackSubject.next(this.selectedTrack);
  }

  trackIsSelected(track: Track): boolean {
    return (
      this.selectedTrack !== null &&
      EntityUtils.areSame(track, this.selectedTrack)
    );
  }
}
