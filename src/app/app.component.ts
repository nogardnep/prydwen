import { Project } from './../api/entities/Project';
import { SelectionService } from './services/control/selection.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectManagerService } from './services/managers/project-manager.service';
import { ServerService } from './services/server/server.service';
import { UiService } from './services/ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loading = false;

  loadingSubscription: Subscription;

  constructor(
    private serverService: ServerService,
    private projectManagerService: ProjectManagerService,
    private selectionService: SelectionService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.test();
    this.loadingSubscription = this.uiService.loadingSubject.subscribe(
      (loading: boolean) => {
        this.loading = loading;
      }
    );

    this.uiService.emitLoading();
  }

  ngOnDestroy(): void {
    //   this.loadingSubscription.unsubscribe();
  }

  test(): void {
    this.serverService.getProjectFolders().then((items: string[]) => {
      this.projectManagerService
        .loadProject(items[0])
        .then((project: Project) => {
          this.selectionService.setSelectedSequence(project.sequences[0]);
        });
    });
  }
}
