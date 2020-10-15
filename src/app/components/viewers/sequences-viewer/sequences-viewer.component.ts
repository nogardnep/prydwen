import { Sequence } from './../../../../models/entities/Sequence';
import { SelectionService } from './../../../services/control/selection.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { Subscription } from 'rxjs';
import { Project } from './../../../../models/entities/Project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sequences-viewer',
  templateUrl: './sequences-viewer.component.html',
  styleUrls: ['./sequences-viewer.component.scss'],
})
export class SequencesViewerComponent implements OnInit {
  sequences: Sequence[] = [];
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
          this.sequences = project.sequences;
        } else {
          this.init();
        }
      }
    );
    this.projectManagerService.emitCurrentProject();
  }

  getSequences(): Sequence[] {
      // TODO: sort by num
      return this.sequences;
  }

  onClickAddSequence(): void {
    this.projectManagerService.addSequence();
  }

  init(): void {
    this.sequences = [];
  }
}
