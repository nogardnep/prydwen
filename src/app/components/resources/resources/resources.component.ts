import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Resource } from './../../../../api/entities/Resource';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit, OnDestroy {
  // TODO: sort by subfolders

  audioResources: Resource[];
  loading = true;

  private projectWrapperSubscription: Subscription;

  constructor(private projectManagerService: ProjectManagerService) {}

  onClickSynchronize(): void {
    this.loading = true;
    this.projectManagerService.updateResources();
  }

  ngOnInit(): void {
    this.projectWrapperSubscription = this.projectManagerService.availableResourcesSubject.subscribe(
      (resources: Resource[]) => {
        this.audioResources = resources;
        this.loading = false;
      }
    );

    this.projectManagerService.emitAvailableResources();
  }

  ngOnDestroy(): void {
    this.projectWrapperSubscription.unsubscribe();
  }

  onDeleted(resource: Resource): void {
    // TODO
    console.log(resource);
  }
}
