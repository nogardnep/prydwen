import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { Subscription } from 'rxjs';
import { ProjectWrapper } from './../../../../api/wrappers/ProjectWrapper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patterns-page',
  templateUrl: './patterns-page.component.html',
  styleUrls: ['./patterns-page.component.scss'],
})
export class PatternsPageComponent implements OnInit {
  projectWrapper: ProjectWrapper = null;

  projectWrapperSubscription: Subscription;

  constructor(private projectManagerService: ProjectManagerService) {}

  ngOnInit(): void {
    this.projectWrapperSubscription = this.projectManagerService.selectedProjectWrapperSubject.subscribe(
      (projectWrapper: ProjectWrapper) => {
        this.projectWrapper = projectWrapper;
      }
    );

    this.projectManagerService.emitSelectedProjectWrapper();
  }

  onClickAddPattern(): void {
    this.projectManagerService.addPattern();
  }
}
