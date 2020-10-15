import { SelectionService } from './../../../services/control/selection.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { Subscription } from 'rxjs';
import { Pattern } from './../../../../models/entities/Pattern';
import { Project } from './../../../../models/entities/Project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patterns-viewer',
  templateUrl: './patterns-viewer.component.html',
  styleUrls: ['./patterns-viewer.component.scss'],
})
export class PatternsViewerComponent implements OnInit {
  patterns: Pattern[] = [];
  project: Project = null;

  projectSubscription: Subscription;

  constructor(
    private projectManagerService: ProjectManagerService,
    private selectionService: SelectionService
  ) {}

  ngOnInit(): void {
    this.projectSubscription = this.projectManagerService.currentProjectSubject.subscribe(
      (project: Project) => {
        this.project = project;

        if (project !== null) {
          this.patterns = project.patterns;
        } else {
          this.init();
        }
      }
    );
    this.projectManagerService.emitCurrentProject();
  }

  getPatterns(): Pattern[] {
    // TODO: sort by num
    return this.patterns;
  }

  onClickAddPattern(): void {
    this.projectManagerService.addPattern();
  }

  init(): void {
    this.patterns = [];
  }
}
