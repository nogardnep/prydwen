import { ProjectWrapper } from './../../../api/wrappers/ProjectWrapper';
import { Project } from './../../../api/entities/Project';
import { Resource, ResourceType } from './../../../api/entities/Resource';
import { config } from 'src/config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private httpClient: HttpClient) {}

  makeSrcFor(absolutePath: string): string {
    return this.makeUrl(config.routes.file) + '/src/' + absolutePath;
  }

  getProjectFolders(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<string[]>(this.makeUrl(config.routes.project))
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            this.printError(error);
            reject(error);
          }
        );
    });
  }

  getProjectData(absolutePath: string): Promise<Project> {
    const url = this.makeUrl(config.routes.project) + '/' + absolutePath;
    console.log(url);

    return new Promise((resolve, reject) => {
      this.httpClient.get<Project>(url).subscribe(
        (response) => {
          console.log(response);

          resolve(response);
        },
        (error) => {
          resolve(null);
        }
      );
    });
  }

  saveProjectData(projectWrapper: ProjectWrapper): Promise<Project> {
    return new Promise((resolve, reject) => {
      const url =
        this.makeUrl(config.routes.project) + '/' + projectWrapper.path;

      this.httpClient.post<Project>(url, projectWrapper.project).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          this.printError(error);
          reject(error);
        }
      );
    });
  }

  getFiles(absolutePath: string, type: ResourceType): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<string[]>(
          this.makeUrl(config.routes.file) +
            '/path/' +
            type +
            '/' +
            absolutePath
        )
        .subscribe(
          (response) => {
            console.log(response);
            resolve(response);
          },
          (error) => {
            this.printError(error);
            reject(error);
          }
        );
    });
  }

  private makeUrl(path: string): string {
    return (
      config.url + ':' + config.backendPort + '/' + config.apiRoot + '/' + path
    );
  }

  private printError(message: string): void {
    console.error('Error during request');
    console.error(message);
  }
}
