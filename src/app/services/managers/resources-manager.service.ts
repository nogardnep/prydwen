import { ServerService } from './../data/server.service';
import { Injectable } from '@angular/core';
import { Resource } from './../../../api/entities/Resource';

@Injectable({
  providedIn: 'root',
})
export class ResourcesManagerService {
  constructor(private serverService: ServerService) {}

  makeResource(path: string): Resource {
    return {
      path,
      local: true,
      src: this.serverService.makeSrcFor(path),
    };
  }
}
