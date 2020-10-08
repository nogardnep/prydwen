import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config/config';
import { ResourceType } from './../../../api/entities/Resource';
import { ServerService } from './../data/server.service';

@Injectable({
  providedIn: 'root',
})
export class ResourcesDataService {
  constructor(
    private httpClient: HttpClient,
    private serverService: ServerService
  ) {}

  getFiles(absolutePath: string, type: ResourceType): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<string[]>(
          this.serverService.makeUrl(config.routes.file) +
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
            this.serverService.printError(error);
            reject(error);
          }
        );
    });
  }

  deleteFile(absolutePath: string): Promise<any> {
    // TODO: get error "range not satisfiable" (but works)

    return new Promise((resolve, reject) => {
      this.httpClient
        .delete<any>(
          this.serverService.makeUrl(config.routes.file) + '/' + absolutePath
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

  storeFile(file: File, path: string): Promise<any> {
    const formData = new FormData();
    formData.append(config.uploadId, file, file.name);

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
