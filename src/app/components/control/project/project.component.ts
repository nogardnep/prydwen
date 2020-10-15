import { pages } from '../../../../config/pages';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from './../../../../models/entities/Project';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  project: Project = null;
  currentPath: string = null;

  private projectSubscription: Subscription;
  private currentPathSubscription: Subscription;

  constructor(
    private projectManagerService: ProjectManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectSubscription = this.projectManagerService.currentProjectSubject.subscribe(
      (project: Project) => {
        this.project = project;
      }
    );
    this.projectManagerService.emitCurrentProject();

    this.currentPathSubscription = this.projectManagerService.currentPathSubject.subscribe(
      (currentPath: string) => {
        this.currentPath = currentPath;
      }
    );
    this.projectManagerService.emitCurrentPath();
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    this.currentPathSubscription.unsubscribe();
  }

  onClickOpenProject(): void {
    this.router.navigate(['/' + pages.projectLoader.path]);
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
