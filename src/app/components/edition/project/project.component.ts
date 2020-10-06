import { pages } from './../../../routerConfig';
import { Router } from '@angular/router';
import { ServerService } from './../../../services/server/server.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectWrapper } from './../../../../api/wrappers/ProjectWrapper';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  projectWrapper: ProjectWrapper = null;

  private projectWrapperSubscription: Subscription;

  constructor(
    private projectManagerService: ProjectManagerService,
    private serverService: ServerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectWrapperSubscription = this.projectManagerService.selectedProjectWrapperSubject.subscribe(
      (projectWrapper: ProjectWrapper) => {
        this.projectWrapper = projectWrapper;
      }
    );
  }

  ngOnDestroy(): void {
    this.projectWrapperSubscription.unsubscribe();
  }

  onClickOpenProject(): void {
    this.router.navigate(['/' + pages.projectLoader]);
  }

  onClickSaveProject(): void {
    this.projectManagerService.saveProject();
  }

  onClickCreateProject(): void {
    this.projectManagerService.createProject();
  }

  onClickDeleteProject(): void {
    this.projectManagerService.deleteProject();
  }
}
