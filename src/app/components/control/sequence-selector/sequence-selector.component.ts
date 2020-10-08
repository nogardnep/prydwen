import { Project } from './../../../../api/entities/Project';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { SelectionService } from './../../../services/control/selection.service';
import { Subscription } from 'rxjs';
import { Sequence } from './../../../../api/entities/Sequence';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sequence-selector',
  templateUrl: './sequence-selector.component.html',
  styleUrls: ['./sequence-selector.component.scss'],
})
export class SequenceSelectorComponent implements OnInit, OnDestroy {
  selectedSequence: Sequence;
  sequences: Sequence[];

  private selectedSequenceSubscription: Subscription;
  private selectedProjectSubscription: Subscription;

  constructor(
    private selectionService: SelectionService,
    private projectManagerService: ProjectManagerService
  ) {}

  ngOnInit(): void {
    this.selectedSequenceSubscription = this.selectionService.selectedSequenceSubject.subscribe(
      (sequence: Sequence) => {
        this.selectedSequence = sequence;
      }
    );
    this.selectionService.emitSelectedSequence();

    this.selectedProjectSubscription = this.projectManagerService.currentProjectSubject.subscribe(
      (project: Project) => {
        if (project !== null) {
          this.sequences = project.sequences;
        }
      }
    );
    this.projectManagerService.emitCurrentProject();
  }

  ngOnDestroy(): void {
    this.selectedSequenceSubscription.unsubscribe();
    this.selectedProjectSubscription.unsubscribe();
  }

  onChangeSequence(sequence: Sequence): void {
    this.selectionService.selectSequence(sequence);
  }

  getSequences(): Sequence[] {
    // TODO: sort by num

    return this.sequences;
  }
}
