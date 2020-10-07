import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config/config';
import { Project } from './../../../api/entities/Project';
import { ResourceType } from './../../../api/entities/Resource';

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
      const url = this.makeUrl(config.routes.project) + '/' + path;

      this.httpClient.post<Project>(url, project).subscribe(
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
            resolve(response);
          },
          (error) => {
            this.printError(error);
            reject(error);
          }
        );
    });
  }

  storeFile(file: File, path: string): Promise<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Accept: 'application/json',
    // });

    console.log(file);

    const formData = new FormData();
    formData.append(config.uploadId, file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');
    headers.append('Accept', 'application/json');

    // const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>(
          this.makeUrl(config.routes.file) + '/path/' + path,
          formData,
          {
            headers,
            // responseType: 'blob' as 'json',
          }
        )
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
