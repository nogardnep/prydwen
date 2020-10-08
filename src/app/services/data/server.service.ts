import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config/config';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private httpClient: HttpClient) {}

  makeSrcFor(absolutePath: string): string {
    return this.makeUrl(config.routes.file) + '/src/' + absolutePath;
  }

  makeUrl(path: string): string {
    return (
      config.url + ':' + config.backendPort + '/' + config.apiRoot + '/' + path
    );
  }

  printError(message: string): void {
    console.error('Error during request');
    console.error(message);
  }
}
