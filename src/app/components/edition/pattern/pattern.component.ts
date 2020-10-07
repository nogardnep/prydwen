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

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.scss'],
})
export class PatternComponent implements OnInit, OnDestroy {
  @Input() pattern: Pattern;
  availableResources: Resource[];

  private availableResourcesSubscription: Subscription;

  constructor(
    private selectionService: SelectionService,
    private projectManagerService: ProjectManagerService
  ) {
  }

  ngOnInit(): void {
    this.availableResourcesSubscription = this.projectManagerService.availableResourcesSubject.subscribe(
      (resources: Resource[]) => {
        this.availableResources = resources;
      }
    );

      // console.log(this.pattern.audio.resource.path)

    this.projectManagerService.emitAvailableResources();
  }

  ngOnDestroy(): void {
    this.availableResourcesSubscription.unsubscribe();
  }

  getParametersModel(): ParametersModel {
    return patternParametersModel;
  }

  onChangeResource(resource: Resource): void {
    // console.log(resource.path);
    // console.log(this.pattern.audio.resource.path)

    // this.pattern.audio.resource = resource
  }
}
