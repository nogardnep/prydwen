import { HttpClient } from '@angular/common/http';
import { Project } from './../../../api/entities/Project';
import { config } from 'src/config/config';
import { Injectable } from '@angular/core';
import { ServerService } from './../data/server.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsDataService {
  constructor(
    private serverService: ServerService,
    private httpClient: HttpClient
  ) {}

  getProjectFolders(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<string[]>(this.serverService.makeUrl(config.routes.project))
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            this.serverService.printError(error);
            reject(error);
          }
        );
    });
  }

  getProjectData(absolutePath: string): Promise<Project> {
    const url =
      this.serverService.makeUrl(config.routes.project) + '/' + absolutePath;

    return new Promise((resolve, reject) => {
      this.httpClient.get<Project>(url).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          resolve(null);
        }
      );
    });
  }

  saveProjectData(project: object, path: string): Promise<Project> {
    return new Promise((resolve, reject) => {
      const url =
        this.serverService.makeUrl(config.routes.project) + '/update/' + path;

      this.httpClient.post<Project>(url, project).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          this.serverService.printError(error);
          reject(error);
        }
      );
    });
  }

  createProjectFolder(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = this.serverService.makeUrl(config.routes.project) + '/create';

      this.httpClient
        .post<string>(url, { path })
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            this.serverService.printError(error);
            reject(error);
          }
        );
    });
  }

  deleteProjectFolder(absolutePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const url =
        this.serverService.makeUrl(config.routes.project) + '/' + absolutePath;

      this.httpClient.delete<any>(url).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          this.serverService.printError(error);
          reject(error);
        }
      );
    });
  }
}
