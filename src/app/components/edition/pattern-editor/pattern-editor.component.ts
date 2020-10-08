import { PatternsManagerService } from './../../../services/managers/patterns-manager.service';
import { RecorderService } from './../../../services/mecanism/recorder.service';
import { Resource } from './../../../../api/entities/Resource';
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
  availableResources: Resource[];

  private availableResourcesSubscription: Subscription;
  private selectedPatternSubscription: Subscription;

  constructor(
    private selectionService: SelectionService,
    private projectManagerService: ProjectManagerService,
    private patternsManagerService: PatternsManagerService
  ) {}

  ngOnInit(): void {
    this.availableResourcesSubscription = this.projectManagerService.availableResourcesSubject.subscribe(
      (resources: Resource[]) => {
        if (resources !== null) {
          this.availableResources = resources;
        }
      }
    );
    this.projectManagerService.emitAvailableResources();

    this.selectedPatternSubscription = this.selectionService.selectedPatternSubject.subscribe(
      (pattern: Pattern) => {
        this.pattern = pattern;
      }
    );
    this.selectionService.emitSelectedPattern();

    // TODO: remove?
    // this.armedPatternForRecordingSubscription = this.recorderService.armedPatternSubject.subscribe(
    //   (pattern: Pattern) => {
    //     if (pattern.id !== this.pattern.id) {
    //       this.armedForRecording = false;
    //     }
    //   }
    // );
    // this.projectManagerService.emitAvailableResources();
  }

  ngOnDestroy(): void {
    this.selectedPatternSubscription.unsubscribe();
    this.availableResourcesSubscription.unsubscribe();
    // this.armedPatternForRecordingSubscription.unsubscribe();
  }

  getParametersModel(): ParametersModel {
    return patternParametersModel;
  }

  makeIdFor(label: string): string {
    return 'pattern-' + this.pattern.id + '-' + label;
  }

  onChangeAudio(): void {
    this.patternsManagerService.updateAudio(this.pattern);
  }
}
