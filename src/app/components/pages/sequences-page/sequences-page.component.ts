import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { Subscription } from 'rxjs';
import { ProjectWrapper } from './../../../../api/wrappers/ProjectWrapper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sequences-page',
  templateUrl: './sequences-page.component.html',
  styleUrls: ['./sequences-page.component.scss'],
})
export class SequencesPageComponent implements OnInit {
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

  onClickAddSequence(): void {
    this.projectManagerService.addSequence();
  }
}
