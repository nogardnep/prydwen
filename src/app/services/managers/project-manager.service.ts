import { ResourcesManagerService } from './resources-manager.service';
import { EntityWithNumber } from './../../../api/entities/EntityWithNumber';
import { Entity } from './../../../api/entities/Entity';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pattern } from './../../../api/entities/Pattern';
import { Project } from './../../../api/entities/Project';
import { Resource, ResourceType } from './../../../api/entities/Resource';
import { Sequence } from './../../../api/entities/Sequence';
import { ProjectWrapper } from './../../../api/wrappers/ProjectWrapper';
import { ServerService } from './../server/server.service';
import { UiService } from './../ui/ui.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectManagerService {
  private selectedProjectWrapper: ProjectWrapper = null;
  private availableResources: Resource[] = [];

  selectedProjectWrapperSubject = new Subject<ProjectWrapper>();
  availableResourcesSubject = new Subject<Resource[]>();

  constructor(
    private serverService: ServerService,
    private uiService: UiService,
    private resourcesManagerService: ResourcesManagerService
  ) {}

  loadProject(path: string): Promise<Project> {
    this.uiService.setLoading(true);
    this.setAvailableResources([]);

    return new Promise((resolve, reject) => {
      let project: Project = null;

      this.serverService
        .getProjectData(path)
        .then((projectFound: Project) => {
          if (projectFound !== null) {
            project = projectFound;
          } else {
            project = {
              id: this.makeId(),
              name: 'Unnamed',
              patterns: [],
              sequences: [],
            };

            // TODO: addSequence
          }

          this.selectedProjectWrapper = {
            path,
            project,
          };

          this.emitSelectedProjectWrapper();
          this.updateResources();
          resolve(project);
          this.uiService.setLoading(false);
        })
        .catch((erorr) => {
          reject(erorr);
        });
    });
  }

  emitSelectedProjectWrapper(): void {
    this.selectedProjectWrapperSubject.next(this.selectedProjectWrapper);
  }

  emitAvailableResources(): void {
    this.availableResourcesSubject.next(this.availableResources);
  }

  getSelectedProjectWrapper(): ProjectWrapper {
    return this.selectedProjectWrapper;
  }

  addPattern(): Pattern {
    const project = this.selectedProjectWrapper.project;

    const newPattern = {
      id: this.makeId(),
      name: '',
      num: this.makeNum(project.patterns),
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

    project.patterns.push(newPattern);

    return newPattern;
  }

  addSequence(): Sequence {
    const project = this.selectedProjectWrapper.project;

    // TODO: get bpm of the last sequence

    const newSequence = {
      id: this.makeId(),
      name: '',
      num: this.makeNum(project.sequences),
      bank: 1,
      timeSignature: {
        step: 4,
        beat: 4,
        mesure: 1,
      },
      parameters: {},
    };

    project.sequences.push(newSequence);

    return newSequence;
  }

  removeSequence(num, bank): void {
    // TODO
  }

  removePattern(num, bank): void {
    // TODO
  }

  createProject(): void {
    // TODO
  }

  saveProject(): void {
    // TODO
    this.serverService.saveProjectData(
      this.selectedProjectWrapper.project,
      this.selectedProjectWrapper.path
    );
  }

  deleteProject(): void {
    // TODO
  }

  setAvailableResources(availableResources: Resource[]): void {
    this.availableResources = availableResources;
    this.emitAvailableResources();
  }

  updateResources(): Promise<Resource[]> {
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
      this.serverService
        .getFiles(this.selectedProjectWrapper.path, ResourceType.Audio)
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
