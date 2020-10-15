import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagerService } from '../../../services/managers/project-manager.service';
import { pages } from '../../../../config/pages';
import { ProjectsDataService } from './../../../services/data/projects-data.service';

@Component({
  selector: 'app-project-loader-page',
  templateUrl: './project-loader-page.component.html',
  styleUrls: ['./project-loader-page.component.scss'],
})
export class ProjectLoaderPageComponent implements OnInit {
  projectPaths: string[] = [];
  loading = true;

  constructor(
    private projectsDataService: ProjectsDataService,
    private projectManagerService: ProjectManagerService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectsDataService.getProjectFolders().then((items: string[]) => {
      this.projectPaths = items;
      this.loading = false;
    });
  }

  onClickProject(path: string): void {
    this.projectManagerService.loadProject(path).then(() => {
      this.router.navigate(['/' + pages.sequences.path]);
    });
  }

  onClickCancel(): void {
    this.location.back();
  }
}
