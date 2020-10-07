import { PatternWrapper } from './../../../../api/wrappers/PatternWrapper';
import { Pattern } from './../../../../api/entities/Pattern';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { Subscription } from 'rxjs';
import { ProjectWrapper } from './../../../../api/wrappers/ProjectWrapper';
import { Component, OnChanges, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-patterns-page',
  templateUrl: './patterns-page.component.html',
  styleUrls: ['./patterns-page.component.scss'],
})
export class PatternsPageComponent implements OnInit, OnDestroy {
  projectWrapper: ProjectWrapper = null;
  patternWrappers: PatternWrapper[] = [];

  projectWrapperSubscription: Subscription;

  constructor(private projectManagerService: ProjectManagerService) {}

  ngOnInit(): void {
    this.projectWrapperSubscription = this.projectManagerService.selectedProjectWrapperSubject.subscribe(
      (projectWrapper: ProjectWrapper) => {
        if (projectWrapper !== null) {
          this.projectWrapper = projectWrapper;
          this.patternWrappers = [];

          this.projectWrapper.project.patterns.forEach((pattern: Pattern) => {
            this.addPatternWrapper(pattern);
          });
        }
      }
    );

    this.projectManagerService.emitSelectedProjectWrapper();
  }

  ngOnDestroy(): void {
    this.projectWrapperSubscription.unsubscribe();
  }

  onClickAddPattern(): void {
    const newPattern = this.projectManagerService.addPattern();
    this.addPatternWrapper(newPattern);
  }

  private addPatternWrapper(pattern: Pattern): void {
    this.patternWrappers.push(new PatternWrapper(pattern));
  }
}
