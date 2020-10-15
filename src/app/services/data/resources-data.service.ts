import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config/config';
import { Resource, ResourceType } from './../../../models/entities/Resource';
import { ServerService } from './../data/server.service';

@Injectable({
  providedIn: 'root',
})
export class ResourcesDataService {
  constructor(
    private httpClient: HttpClient,
    private serverService: ServerService
  ) {}

  makeSrc(resource: Resource): string {
    return (
      this.serverService.makeUrl(config.routes.file) +
      '/src/' +
      this.serverService.getCurrentPath() +
      '/' +
      resource.path
    );
  }

  getFiles(path: string, type: ResourceType): Promise<string[]> {
    const url =
      this.serverService.makeUrl(config.routes.file) +
      '/path/' +
      type +
      '/' +
      path;

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

  deleteFile(path: string): Promise<any> {
    // TODO: get error "range not satisfiable" (but works)
    const url = this.serverService.makeUrl(config.routes.file) + '/' + path;

    return new Promise((resolve, reject) => {
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

  storeFile(file: File, path: string): Promise<any> {
    const formData = new FormData();
    formData.append(config.uploadId, file, file.name);
    console.log(path)

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');
    headers.append('Accept', 'application/json');

    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>(
          this.serverService.makeUrl(config.routes.file) + '/path/' + path,
          formData,
          {
            headers,
          }
        )
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
}
