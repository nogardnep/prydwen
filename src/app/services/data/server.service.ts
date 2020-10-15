import { Injectable } from '@angular/core';
import { config } from 'src/config/config';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  currentPath: string;

  constructor() {}

  setCurrentPath(path: string): void {
    this.currentPath = path;
  }

  getCurrentPath(): string {
    return this.currentPath;
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
