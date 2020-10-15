import { SequencesManagerService } from './sequences-manager.service';
import { SequencerService } from './../mecanism/sequencer.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { messages } from 'src/config/messages';
import { pages } from './../../../config/pages';
import { AudioTrack } from './../../../models/entities/AudioTrack';
import { Pattern } from './../../../models/entities/Pattern';
import { Project } from './../../../models/entities/Project';
import { Resource, ResourceType } from './../../../models/entities/Resource';
import { Sequence, SequencePattern } from './../../../models/entities/Sequence';
import { Song } from './../../../models/entities/Song';
import { SongPart } from './../../../models/entities/SongPart';
import { EntityUtils } from './../../utils/EntityUtils';
import { SelectionService } from './../control/selection.service';
import { ProjectsDataService } from './../data/projects-data.service';
import { ResourcesDataService } from './../data/resources-data.service';
import { ServerService } from './../data/server.service';
import { AudioPlayerService } from './../mecanism/audio-player.service';
import { UIService } from './../ui/ui.service';
import { ResourcesManagerService } from './resources-manager.service';
import { TracksManagerService } from './tracks-manager.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectManagerService {
  private currentProject: Project = null;
  private availableResources: Resource[] = [];
  private currentPath: string = null;

  currentProjectSubject = new Subject<Project>();
  availableResourcesSubject = new Subject<Resource[]>();
  currentPathSubject = new Subject<string>();

  constructor(
    private projectsDataService: ProjectsDataService,
    private resourcesDataService: ResourcesDataService,
    private uiService: UIService,
    private resourcesManagerService: ResourcesManagerService,
    private selectionService: SelectionService,
    private router: Router,
    private tracksManagerService: TracksManagerService,
    private serverService: ServerService,
    private audioPlayerService: AudioPlayerService
  ) {}
  loadProject(path: string): Promise<Project> {
    this.uiService.setLoading(true);
    this.setAvailableResources([]);

    return new Promise((resolve, reject) => {
      let project: Project = null;

      this.projectsDataService
        .getProjectData(path)
        .then((projectFound: Project) => {
          if (projectFound !== null) {
            project = projectFound;
          } else {
            const defaultName = 'Unnamed';

            project = {
              id: EntityUtils.makeId(),
              name: defaultName,
              songs: [],
              sequences: [],
              patterns: [],
              audioTracks: [],
              recording: {
                countdown: 1,
              },
              metronome: {
                volume: 1,
                muted: false,
              },
            };
          }

          this.setProject(project, path);
          this.uiService.setLoading(false);
          this.addDefaultEntities();
          this.selectDefault();
          // TODO
          // this.router.navigate(['/' + pages.patterns.path]);

          // TODO: move?
          project.audioTracks.forEach((track: AudioTrack) => {
            this.tracksManagerService.update(track);
          });

          resolve(project);
        })
        .catch((erorr) => {
          reject(erorr);
        });
    });
  }

  makeSrc(resource: Resource): string {
    return this.resourcesDataService.makeSrc(resource);
  }

  private addDefaultEntities(): void {
    if (this.currentProject.sequences.length === 0) {
      this.addSequence();
    }

    if (this.currentProject.songs.length === 0) {
      this.addSong();
    }
  }

  private setProject(project: Project, path: string): void {
    this.currentProject = project;
    this.emitCurrentProject();
    this.serverService.setCurrentPath(path);
    this.currentPath = path; // TODO: delete?
    this.emitCurrentPath();
    this.updateResources();
  }

  private selectDefault(): void {
    if (this.currentProject.songs.length > 0) {
      this.selectionService.selectSong(this.currentProject.songs[0]);
    }

    if (this.currentProject.sequences.length > 0) {
      this.selectionService.selectSequence(this.currentProject.sequences[0]);
    }

    this.selectionService.selectPattern(null);
  }

  emitCurrentProject(): void {
    this.currentProjectSubject.next(this.currentProject);
  }

  emitAvailableResources(): void {
    this.availableResourcesSubject.next(this.availableResources);
  }

  getCurrentProject(): Project {
    return this.currentProject;
  }

  getCurrentPath(): string {
    return this.currentPath;
  }

  addPattern(): Pattern {
    const newPattern = {
      id: EntityUtils.makeId(),
      name: '',
      num: EntityUtils.makeNum(this.currentProject.patterns),
      bank: 1,
      looping: false,
      audioTracks: [],
      timeSignature: {
        step: 4,
        beat: 4,
        measure: 1,
      },
      events: [],
      parameters: {},
    };

    this.currentProject.patterns.push(newPattern);

    return newPattern;
  }

  addAudioTrack(): AudioTrack {
    const newTrack = {
      id: EntityUtils.makeId(),
      name: '',
      num: EntityUtils.makeNum(this.currentProject.audioTracks),
      armedForRecording: false,
      timeSignature: {
        step: 4,
        beat: 4,
        measure: 1,
      },
      resource: null,
      parameters: {},
    };

    this.currentProject.audioTracks.push(newTrack);
    this.tracksManagerService.update(newTrack);

    return newTrack;
  }

  addSong(): Song {
    const newSong = {
      id: EntityUtils.makeId(),
      name: '',
      num: EntityUtils.makeNum(this.currentProject.songs),
      bank: 1,
      songParts: [],
    };

    this.currentProject.songs.push(newSong);

    return newSong;
  }

  addSongPart(song: Song): SongPart {
    const newSongPart = {
      id: EntityUtils.makeId(),
      name: '',
      num: EntityUtils.makeNum(song.songParts),
      bank: 1,
      sequenceId: null,
    };

    song.songParts.push(newSongPart);

    return newSongPart;
  }

  addSequence(): Sequence {
    const newSequence = {
      id: EntityUtils.makeId(),
      name: '',
      num: EntityUtils.makeNum(this.currentProject.sequences),
      bank: 1,
      events: [],
      patterns: [],
      timeSignature: {
        step: 4,
        beat: 4,
        measure: 1,
      },
      parameters: {},
    };

    const model = this.selectionService.getSelectedSequence();

    if (model) {
      // TODO: do not use string
      newSequence.parameters['bpm'] = model.parameters['bpm'];
    }

    this.currentProject.sequences.push(newSequence);

    return newSequence;
  }

  changeSequenceNum(sequence: Sequence, num: number): void {
    EntityUtils.changeEntityNum(this.currentProject.sequences, sequence, num);
  }

  changeAudioTrackNum(audioTrack: AudioTrack, num: number): void {
    EntityUtils.changeEntityNum(
      this.currentProject.audioTracks,
      audioTrack,
      num
    );
  }

  changePatternNum(pattern: Pattern, num: number): void {
    EntityUtils.changeEntityNum(this.currentProject.patterns, pattern, num);
  }

  changeSongPartNum(song: Song, songPart: SongPart, num: number): void {
    EntityUtils.changeEntityNum(song.songParts, songPart, num);
  }

  changeSongNum(song: Song, num: number): void {
    EntityUtils.changeEntityNum(this.currentProject.songs, song, num);
  }

  // getSequenceByNum(num: number): Sequence {
  //   this.currentProject.sequences.forEach((lookedSequence: Sequence) => {
  //     if (lookedSequence.num === null) {
  //       return lookedSequence;
  //     }
  //   });

  //   return null;
  // }

  removeSequence(sequence: Sequence): void {
    if (this.selectionService.sequenceIsSelected(sequence)) {
      this.selectionService.selectSequence(null);
    }

    EntityUtils.removeFrom(sequence, this.currentProject.sequences);
  }

  removeAudioTrack(audioTrack: AudioTrack): void {
    console.log(audioTrack);
    if (this.selectionService.trackIsSelected(audioTrack)) {
      this.selectionService.selectTrack(null);
    }

    EntityUtils.removeFrom(audioTrack, this.currentProject.audioTracks);
  }

  removePattern(pattern: Pattern): void {
    if (this.selectionService.patternIsSelected(pattern)) {
      this.selectionService.selectPattern(null);
    }

    // TODO: test
    // this.currentProject.sequences.forEach((sequence: Sequence) => {
    //   sequence.patterns.forEach((sequencePattern: SequencePattern) => {
    //     if (sequencePattern.id === pattern.id) {
    //       EntityUtils.removeFrom(sequencePattern, sequence.patterns);
    //     }
    //   });
    // });

    EntityUtils.removeFrom(pattern, this.currentProject.patterns);
  }

  removeSong(song: Song): void {
    if (this.selectionService.songIsSelected(song)) {
      this.selectionService.selectSong(null);
    }

    EntityUtils.removeFrom(song, this.currentProject.songs);
  }

  removeSongPart(songPart: SongPart, song: Song): void {
    if (this.selectionService.songPartIsSelected(songPart)) {
      this.selectionService.selectSongPart(null);
    }

    EntityUtils.removeFrom(songPart, song.songParts);
  }

  removeAvailableResource(resource: Resource): void {
    // TODO: use path property instead of indexOf

    const index = this.availableResources.indexOf(resource, 0);

    if (index >= 0) {
      this.availableResources.splice(index, 1);
    }

    this.emitAvailableResources();
  }

  createProject(): void {
    this.uiService.askName((givenName: string) => {
      if (givenName !== null) {
        if (givenName === '') {
          this.uiService.inform(messages.error.unvalidName);
        } else {
          this.projectsDataService
            .createProjectFolder(givenName)
            .then((path: string) => {
              this.loadProject(path);
            })
            .catch((response: any) => {
              if (response.error) {
                this.uiService.inform(messages.error.folderAlreadyExists);
              }
            });
        }
      }
    }, messages.prompt.newProjectName);
  }

  saveProject(): void {
    this.projectsDataService
      .saveProjectData(this.currentProject, this.currentPath)
      .then(() => {
        this.uiService.inform('Project saved');
      });
  }

  deleteProject(): void {
    this.projectsDataService.deleteProjectFolder(this.currentPath).then(() => {
      this.selectionService.unselectAll();
      this.setProject(null, null);
      this.updateResources();
      this.router.navigate(['/' + pages.index.path]);
    });
  }

  deleteResource(resource: Resource): void {
    this.resourcesDataService.deleteFile(resource.path).then(() => {
      this.removeAvailableResource(resource);
    });
  }

  setAvailableResources(availableResources: Resource[]): void {
    this.availableResources = availableResources;
    this.emitAvailableResources();
  }

  emitCurrentPath(): void {
    this.currentPathSubject.next(this.currentPath);
  }

  updateResources(): Promise<Resource[]> {
    // TODO: problem of cache
    // TODO: same for other types of resources
    return new Promise<Resource[]>((resolve, reject) => {
      this.getAudios()
        .then((resources: Resource[]) => {
          this.setAvailableResources(resources);
          resolve(resources);
        })
        .catch((message: string) => {
          reject(message);
        });
    });
  }

  private getAudios(): Promise<Resource[]> {
    return new Promise<Resource[]>((resolve, reject) => {
      this.resourcesDataService
        .getFiles(this.currentPath, ResourceType.Audio)
        .then((items: string[]) => {
          const resources: Resource[] = [];

          items.forEach((item: string) => {
            resources.push(this.resourcesManagerService.makeResource(item));
          });

          resolve(resources);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
