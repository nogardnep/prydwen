import { EntityUtils } from './../../utils/EntityUtils';
import { pages } from './../../../config/pages';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { messages } from 'src/config/messages';
import { Entity } from './../../../api/entities/Entity';
import { EntityWithNumber } from './../../../api/entities/EntityWithNumber';
import { Pattern } from './../../../api/entities/Pattern';
import { Project } from './../../../api/entities/Project';
import { Resource, ResourceType } from './../../../api/entities/Resource';
import { Sequence } from './../../../api/entities/Sequence';
import { Song } from './../../../api/entities/Song';
import { SongPart } from './../../../api/entities/SongPart';
import { SelectionService } from './../control/selection.service';
import { ProjectsDataService } from './../data/projects-data.service';
import { ResourcesDataService } from './../data/resources-data.service';
import { UIService } from './../ui/ui.service';
import { ResourcesManagerService } from './resources-manager.service';

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
    private router: Router
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
              id: this.makeId(),
              name: defaultName,
              songs: [],
              sequences: [],
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
          this.router.navigate(['/' + pages.patterns.path]);

          resolve(project);
        })
        .catch((erorr) => {
          reject(erorr);
        });
    });
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
    this.currentPath = path;
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

  getSelectedProject(): Project {
    return this.currentProject;
  }

  getCurrentPath(): string {
    return this.currentPath;
  }

  addPattern(sequence: Sequence): Pattern {
    const newPattern = {
      id: this.makeId(),
      name: '',
      num: this.makeNum(sequence.patterns),
      bank: 1,
      timeSignature: {
        step: 4,
        beat: 4,
        mesure: 1,
      },
      audio: {
        resource: null,
      },
      video: {
        resource: null,
      },
      parameters: {},
    };

    sequence.patterns.push(newPattern);

    return newPattern;
  }

  addSong(): Song {
    const newSong = {
      id: this.makeId(),
      name: '',
      num: this.makeNum(this.currentProject.songs),
      bank: 1,
      songParts: [],
    };

    this.currentProject.songs.push(newSong);

    return newSong;
  }

  addSongPart(song: Song): SongPart {
    const newSongPart = {
      id: this.makeId(),
      name: '',
      num: this.makeNum(song.songParts),
      bank: 1,
      sequenceId: null,
    };

    song.songParts.push(newSongPart);

    return newSongPart;
  }

  addSequence(): Sequence {
    const newSequence = {
      id: this.makeId(),
      name: '',
      num: this.makeNum(this.currentProject.sequences),
      bank: 1,
      patterns: [],
      timeSignature: {
        step: 4,
        beat: 4,
        mesure: 1,
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
    this.changeEntityNum(this.currentProject.sequences, sequence, num);
  }

  changePatternNum(sequence: Sequence, pattern: Pattern, num: number): void {
    this.changeEntityNum(sequence.patterns, pattern, num);
  }

  changeSongPartNum(song: Song, songPart: SongPart, num: number): void {
    this.changeEntityNum(song.songParts, songPart, num);
  }

  changeSongNum(song: Song, num: number): void {
    this.changeEntityNum(this.currentProject.songs, song, num);
  }

  private changeEntityNum(
    group: EntityWithNumber[],
    entity: EntityWithNumber,
    num: number
  ): void {
    const previewWithThatNum = this.getEntityByNum(group, num);

    if (previewWithThatNum !== null) {
      previewWithThatNum.num = entity.num;
    }

    entity.num = num;
  }

  getSequenceByNum(num: number): Sequence {
    this.currentProject.sequences.forEach((lookedSequence: Sequence) => {
      if (lookedSequence.num === null) {
        return lookedSequence;
      }
    });

    return null;
  }

  private getEntityByNum(
    group: EntityWithNumber[],
    num: number
  ): EntityWithNumber {
    let found = null;

    group.forEach((entity: EntityWithNumber) => {
      if (entity.num === num) {
        found = entity;
      }
    });

    return found;
  }

  removeSequence(sequence: Sequence): void {
    if (this.selectionService.sequenceIsSelected(sequence)) {
      this.selectionService.selectSequence(null);
    }

    this.removeFrom(sequence, this.currentProject.sequences);
  }

  removePattern(pattern: Pattern, sequence: Sequence): void {
    if (this.selectionService.patternIsSelected(pattern)) {
      this.selectionService.selectPattern(null);
    }

    this.removeFrom(pattern, sequence.patterns);
  }

  removeSong(song: Song): void {
    if (this.selectionService.songIsSelected(song)) {
      this.selectionService.selectSong(null);
    }

    this.removeFrom(song, this.currentProject.songs);
  }

  removeSongPart(songPart: SongPart, song: Song): void {
    if (this.selectionService.songPartIsSelected(songPart)) {
      this.selectionService.selectSongPart(null);
    }

    this.removeFrom(songPart, song.songParts);
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

  private removeFrom(toRemove: Entity, group: Entity[]): void {
    const index = group.indexOf(toRemove, 0);

    if (index >= 0) {
      group.splice(index, 1);
    }
  }

  private makeId(): number {
    return Math.round(Math.random() * 100000);
  }

  private makeNum(entities: EntityWithNumber[]): number {
    let num: number;

    if (entities === undefined) {
      entities = [];
      num = 1;
    } else {
      let maxNumFound = 0;

      entities.forEach((entity: EntityWithNumber) => {
        if (entity.num > maxNumFound) {
          maxNumFound = entity.num;
        }
      });

      num = maxNumFound + 1;
    }

    return num;
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
