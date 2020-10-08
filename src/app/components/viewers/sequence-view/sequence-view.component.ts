import { EntityView } from './../EntityView';
import { config } from 'src/config/config';
import { EntityUtils } from './../../../utils/EntityUtils';
import { UIService } from './../../../services/ui/ui.service';
import { Component, Input, OnInit } from '@angular/core';
import { Sequence } from './../../../../api/entities/Sequence';
import { SelectionService } from './../../../services/control/selection.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';

@Component({
  selector: 'app-sequence-view',
  templateUrl: './sequence-view.component.html',
  styleUrls: ['./sequence-view.component.scss'],
})
export class SequenceViewComponent implements OnInit, EntityView {
  @Input() sequence: Sequence;
  minNum = config.entities.firstNum;
  maxNum = config.entities.maxNum;

  constructor(
    private selectionService: SelectionService,
    private projectManagerService: ProjectManagerService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {}

  onClickSelect(): void {
    this.selectionService.selectSequence(this.sequence);
  }

  onClickRemove(): void {
    this.uiService.askConfirmation((confirmed: boolean) => {
      if (confirmed) {
        this.projectManagerService.removeSequence(this.sequence);
      }
    });
  }

  onClickPlay(): void {
    // TODO
    console.log('TODO');
  }

  isSelected(): boolean {
    return this.selectionService.sequenceIsSelected(this.sequence);
  }

  onChangeNum(value: string): void {
    this.projectManagerService.changeSequenceNum(this.sequence, +value);
  }

  makeIdFor(label: string): string {
    return 'sequence-view-' + this.sequence.id + '-' + label;
  }
}
