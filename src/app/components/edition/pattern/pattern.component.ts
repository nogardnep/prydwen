import { RecorderService } from './../../../services/mecanism/recorder.service';
import { PatternWrapper } from './../../../../api/wrappers/PatternWrapper';
import { Resource } from './../../../../api/entities/Resource';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { ResourcesManagerService } from './../../../services/managers/resources-manager.service';
import { Subscription } from 'rxjs';
import {
  Pattern,
  patternParametersModel,
} from './../../../../api/entities/Pattern';
import { ParametersModel } from './../../../../api/parameters/Parameter';
import { SelectionService } from './../../../services/control/selection.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

// TODO: delete?

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.scss'],
})
export class PatternComponent implements OnInit, OnDestroy {
  @Input() patternWrapper: PatternWrapper;
  availableResources: Resource[];
  armedForRecording = false;

  private availableResourcesSubscription: Subscription;
  private armedPatternForRecordingSubscription: Subscription;

  constructor(
    private selectionService: SelectionService,
    private projectManagerService: ProjectManagerService,
    private recorderService: RecorderService
  ) {}

  ngOnInit(): void {
    this.availableResourcesSubscription = this.projectManagerService.availableResourcesSubject.subscribe(
      (resources: Resource[]) => {
        this.availableResources = resources;
      }
    );
    this.projectManagerService.emitAvailableResources();

    this.armedPatternForRecordingSubscription = this.recorderService.armedPatternSubject.subscribe(
      (pattern: Pattern) => {
        if (pattern.id !== this.patternWrapper.pattern.id) {
          this.armedForRecording = false;
        }
      }
    );
    this.projectManagerService.emitAvailableResources();
  }

  ngOnDestroy(): void {
    this.availableResourcesSubscription.unsubscribe();
    this.armedPatternForRecordingSubscription.unsubscribe();
  }

  getParametersModel(): ParametersModel {
    return patternParametersModel;
  }

  onClickArmForRecording(): void {
    this.armedForRecording = true;
    this.recorderService.setArmedPattern(this.patternWrapper.pattern);
  }

  getIntputId(label: string): string {
    return 'pattern-' + this.patternWrapper.pattern.id + '-' + label;
  }
}
