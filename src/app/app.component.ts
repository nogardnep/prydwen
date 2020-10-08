import { ProjectsDataService } from './services/data/projects-data.service';
import { RecorderService } from './services/mecanism/recorder.service';
import { HttpClient } from '@angular/common/http';
import { Project } from './../api/entities/Project';
import { SelectionService } from './services/control/selection.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectManagerService } from './services/managers/project-manager.service';
import { ServerService } from './services/data/server.service';
import { UIService } from './services/ui/ui.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title: 'Prydwen';
  loading = false;

  loadingSubscription: Subscription;

  constructor(
    private projectsDataService: ProjectsDataService,
    private projectManagerService: ProjectManagerService,
    private selectionService: SelectionService,
    private uiService: UIService,
    private recorderService: RecorderService
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
    this.projectsDataService.getProjectFolders().then((items: string[]) => {
      if (items.length > 0) {
        this.projectManagerService
          .loadProject(items[0])
          .then((project: Project) => {
            if (project.sequences.length > 0) {
              this.selectionService.selectSequence(project.sequences[0]);

              if (project.sequences[0].patterns.length > 0) {
                this.selectionService.selectPattern(
                  project.sequences[0].patterns[0]
                );
              }
            }
          });
      }
    });

    // this.recorderService.init(() => {
    //   this.recorderService.start();
    //   setTimeout(() => {
    //     this.recorderService.stop();
    //   }, 1000);
    // });
  }
}
