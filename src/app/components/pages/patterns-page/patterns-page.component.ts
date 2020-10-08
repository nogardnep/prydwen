import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pattern } from './../../../../api/entities/Pattern';
import { Sequence } from './../../../../api/entities/Sequence';
import { PatternWrapper } from './../../../../api/wrappers/PatternWrapper';
import { SelectionService } from './../../../services/control/selection.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';

@Component({
  selector: 'app-patterns-page',
  templateUrl: './patterns-page.component.html',
  styleUrls: ['./patterns-page.component.scss'],
})
export class PatternsPageComponent implements OnInit, OnDestroy {
  sequence: Sequence = null;
  patternWrappers: PatternWrapper[] = [];

  selectedSequenceSubscription: Subscription;

  constructor(
    private selectionService: SelectionService,
    private projectManagerService: ProjectManagerService
  ) {}

  ngOnInit(): void {
    this.selectedSequenceSubscription = this.selectionService.selectedSequenceSubject.subscribe(
      (sequence: Sequence) => {
        if (sequence !== null) {
          this.sequence = sequence;
          this.patternWrappers = [];

          // this.project.project.patterns.forEach((pattern: Pattern) => {
          //   this.addPatternWrapper(pattern);
          // });
        }
      }
    );
    this.selectionService.emitSelectedSequence();
  }

  ngOnDestroy(): void {
    this.selectedSequenceSubscription.unsubscribe();
  }

  onClickAddPattern(): void {
    const newPattern = this.projectManagerService.addPattern(this.sequence);
    this.addPatternWrapper(newPattern);
  }

  private addPatternWrapper(pattern: Pattern): void {
    this.patternWrappers.push(new PatternWrapper(pattern));
  }
}
