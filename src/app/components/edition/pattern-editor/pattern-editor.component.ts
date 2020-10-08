import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { config } from 'src/config/config';
import { ParametersModel } from './../../../../api/parameters/Parameter';
import {
  Pattern,
  patternParametersModel,
} from './../../../../api/entities/Pattern';
import { SelectionService } from './../../../services/control/selection.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pattern-editor',
  templateUrl: './pattern-editor.component.html',
  styleUrls: ['./pattern-editor.component.scss'],
})
export class PatternEditorComponent implements OnInit, OnDestroy {
  pattern: Pattern = null;

  private selectedPatternSubscription: Subscription;

  constructor(
    private selectionService: SelectionService,
    private projectManagerService: ProjectManagerService
  ) {}

  ngOnInit(): void {
    this.selectedPatternSubscription = this.selectionService.selectedPatternSubject.subscribe(
      (pattern: Pattern) => {
        this.pattern = pattern;
      }
    );
    this.selectionService.emitSelectedPattern();
  }

  ngOnDestroy(): void {
    this.selectedPatternSubscription.unsubscribe();
  }

  getParametersModel(): ParametersModel {
    return patternParametersModel;
  }

  makeIdFor(label: string): string {
    return 'pattern-' + this.pattern.id + '-' + label;
  }
}
