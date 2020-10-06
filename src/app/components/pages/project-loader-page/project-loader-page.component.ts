import { ProjectManagerService } from '../../../services/managers/project-manager.service';
import { ServerService } from '../../../services/server/server.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-loader-page',
  templateUrl: './project-loader-page.component.html',
  styleUrls: ['./project-loader-page.component.scss'],
})
export class ProjectLoaderPageComponent implements OnInit {
  projectPaths: string[];
  loading = true;

  constructor(
    private serverService: ServerService,
    private projectManagerService: ProjectManagerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.serverService.getProjectFolders().then((items: string[]) => {
      this.projectPaths = items;
      this.loading = false;
    });
  }

  onClickProject(path: string): void {
    this.projectManagerService.loadProject(path);
    this.location.back();
  }
}
