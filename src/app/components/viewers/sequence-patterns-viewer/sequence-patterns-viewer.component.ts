import { SelectionService } from './../../../services/control/selection.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { Subscription } from 'rxjs';
import { Sequence } from './../../../../api/entities/Sequence';
import { Pattern } from './../../../../api/entities/Pattern';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sequence-patterns-viewer',
  templateUrl: './sequence-patterns-viewer.component.html',
  styleUrls: ['./sequence-patterns-viewer.component.scss'],
})
export class SequencePatternsViewerComponent implements OnInit {
  patterns: Pattern[] = [];
  sequence: Sequence = null;

  sequenceSubscription: Subscription;

  constructor(
    private projectManagerService: ProjectManagerService,
    private selectionService: SelectionService
  ) {}

  ngOnInit(): void {
    this.sequenceSubscription = this.selectionService.selectedSequenceSubject.subscribe(
      (sequence: Sequence) => {
        this.sequence = sequence;

        if (sequence !== null) {
          this.patterns = sequence.patterns;
        } else {
          this.init();
        }
      }
    );
    this.projectManagerService.emitCurrentProject();
  }

  onClickAddPattern(): void {
    this.projectManagerService.addPattern(this.sequence);
  }

  getPatterns(): Pattern[] {
    // TODO: sort by num

    return this.patterns;
  }

  private init(): void {
    this.patterns = [];
  }
}
