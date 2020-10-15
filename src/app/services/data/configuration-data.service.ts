import { UserConfiguration } from './../../../models/utils/userConfig';
import { ServerService } from './../data/server.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationDataService {
  constructor(
    private httpClient: HttpClient,
    private serverService: ServerService
  ) {}
  load(): Promise<UserConfiguration> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<UserConfiguration>(this.getConfigurationPath())
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            this.serverService.printError(
              'error when loading configuration: ' + error
            );
            reject(error);
          }
        );
    });
  }

  update(configuration: UserConfiguration): Promise<UserConfiguration> {
    return new Promise<UserConfiguration>((resolve, reject) => {
      this.httpClient.put(this.getConfigurationPath(), configuration).subscribe(
        () => {
          resolve();
        },
        (error) => {
          this.serverService.printError(
            'error when updating configuration: ' + error
          );
          reject(error);
        }
      );
    });
  }

  private getConfigurationPath(): string {
    return this.serverService.makeUrl('configuration');
  }
}
