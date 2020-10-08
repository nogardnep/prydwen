import { UIService } from './../../../services/ui/ui.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { Subscription } from 'rxjs';
import { Resource } from './../../../../api/entities/Resource';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-resources-viewer',
  templateUrl: './resources-viewer.component.html',
  styleUrls: ['./resources-viewer.component.scss'],
})
export class ResourcesViewerComponent implements OnInit, OnDestroy {
  // TODO: sort by subfolders

  audioResources: Resource[];
  loading = true;

  private selectedProjectSubscription: Subscription;

  constructor(
    private projectManagerService: ProjectManagerService,
    private uiService: UIService
  ) {}

  onClickSynchronize(): void {
    this.loading = true;
    this.projectManagerService.updateResources();
  }

  ngOnInit(): void {
    this.selectedProjectSubscription = this.projectManagerService.availableResourcesSubject.subscribe(
      (resources: Resource[]) => {
        this.audioResources = resources;
        this.loading = false;
      }
    );

    this.projectManagerService.emitAvailableResources();
  }

  ngOnDestroy(): void {
    this.selectedProjectSubscription.unsubscribe();
  }

  onClickDelete(resource: Resource): void {
    this.uiService.askConfirmation((confirmed: boolean) => {
      if (confirmed) {
        this.projectManagerService.deleteResource(resource);
      }
    });
  }
}
