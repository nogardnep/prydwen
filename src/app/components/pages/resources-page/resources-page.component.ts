import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { Project } from './../../../../api/entities/Project';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-resources-page',
  templateUrl: './resources-page.component.html',
  styleUrls: ['./resources-page.component.scss'],
})
export class ResourcesPageComponent implements OnInit, OnDestroy {
  currentProject: Project = null;

  private currentProjectSubscription: Subscription;

  constructor(private projectManagerService: ProjectManagerService) {}

  ngOnInit(): void {
    this.currentProjectSubscription = this.projectManagerService.currentProjectSubject.subscribe(
      (project: Project) => {
        this.currentProject = project;
      }
    );
    this.projectManagerService.emitCurrentProject();
  }

  ngOnDestroy(): void {
    this.currentProjectSubscription.unsubscribe();
  }
}
