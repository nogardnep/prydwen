import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioTrack } from './../../../../models/entities/AudioTrack';
import { Project } from './../../../../models/entities/Project';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';

@Component({
  selector: 'app-audio-tracks-viewer',
  templateUrl: './audio-tracks-viewer.component.html',
  styleUrls: ['./audio-tracks-viewer.component.scss'],
})
export class AudioTracksViewerComponent implements OnInit {
  project: Project = null;
  tracks: AudioTrack[] = [];

  projectSubscription: Subscription;

  constructor(private projectManagerService: ProjectManagerService) {}

  ngOnInit(): void {
    this.projectSubscription = this.projectManagerService.currentProjectSubject.subscribe(
      (project: Project) => {
        this.project = project;

        if (project !== null) {
          this.tracks = project.audioTracks;
        } else {
          this.init();
        }
      }
    );
    this.projectManagerService.emitCurrentProject();
  }

  onClickAddTrack(): void {
    this.projectManagerService.addAudioTrack();
  }

  getTracks(): AudioTrack[] {
    // TODO: sort by num

    return this.tracks;
  }

  private init(): void {
    this.tracks = [];
  }
}
