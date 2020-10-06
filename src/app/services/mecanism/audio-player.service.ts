import { OutputsService } from './../io/outputs.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  constructor(private outputsService: OutputsService) {}

  play(src: string): void {
    this.outputsService.getAudioPlayer().play(src);
  }
}
