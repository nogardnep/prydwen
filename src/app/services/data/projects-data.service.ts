import { HttpClient } from '@angular/common/http';
import { Project } from './../../../models/entities/Project';
import { config } from 'src/config/config';
import { Injectable } from '@angular/core';
import { ServerService } from './../data/server.service';
import { createNoSubstitutionTemplateLiteral } from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class ProjectsDataService {
  constructor(
    private serverService: ServerService,
    private httpClient: HttpClient
  ) {}

  getProjectFolders(): Promise<string[]> {
    const url = this.serverService.makeUrl(config.routes.project);

    return new Promise((resolve, reject) => {
      this.httpClient.get<string[]>(url).subscribe(
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

  getProjectData(path: string): Promise<Project> {
    const url = this.serverService.makeUrl(config.routes.project) + '/' + path;

    return new Promise((resolve, reject) => {
      this.httpClient.get<Project>(url).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
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

  deleteProjectFolder(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const url =
        this.serverService.makeUrl(config.routes.project) + '/' + path;

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
