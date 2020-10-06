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
  private patternNumCounter = 1;
  private selectedProjectWrapper: ProjectWrapper = null;
  private availableResources: Resource[] = [];

  selectedProjectWrapperSubject = new Subject<ProjectWrapper>();
  availableResourcesSubject = new Subject<Resource[]>();

  constructor(
    private serverService: ServerService,
    private uiService: UiService
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
              name: 'Unnamed',
            } as Project;

            // TODO: Add sequence
          }

          this.selectedProjectWrapper = {
            path,
            project,
          } as ProjectWrapper;

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

  addPattern(): void {
    // TODO: check for last num

    this.selectedProjectWrapper.project.patterns.push({
      num: this.patternNumCounter,
      bank: 1,
    } as Pattern);

    this.patternNumCounter++;
  }

  addSequence(): void {
    const project = this.selectedProjectWrapper.project;
    let num: number;

    if (project.sequences === undefined) {
      project.sequences = [];
      num = 1;
    } else {
      let maxNumFound = 0;

      project.sequences.forEach((sequence: Sequence) => {
        if (sequence.num > maxNumFound) {
          maxNumFound = sequence.num;
        }
      });

      console.log(maxNumFound);

      num = maxNumFound + 1;
    }

    // TODO: get bpm of the last sequence

    project.sequences.push({
      num,
      bank: 1,
    } as Sequence);
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
    this.serverService.saveProjectData(this.selectedProjectWrapper);
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

  private getAudios(): Promise<Resource[]> {
    return new Promise<Resource[]>((resolve, reject) => {
      this.serverService
        .getFiles(this.selectedProjectWrapper.path, ResourceType.Audio)
        .then((items: string[]) => {
          const resources: Resource[] = [];

          items.forEach((item: string) => {
            resources.push({
              path: item,
              local: true,
              src: this.serverService.makeSrcFor(item),
            } as Resource);
          });

          resolve(resources);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
