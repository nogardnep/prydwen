import { EntityView } from './../EntityView';
import { config } from 'src/config/config';
import { Sequence } from './../../../../api/entities/Sequence';
import { SelectionService } from './../../../services/control/selection.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { UIService } from './../../../services/ui/ui.service';
import { Pattern } from './../../../../api/entities/Pattern';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sequence-pattern-view',
  templateUrl: './sequence-pattern-view.component.html',
  styleUrls: ['./sequence-pattern-view.component.scss'],
})
export class SequencePatternViewComponent implements OnInit, EntityView {
  @Input() pattern: Pattern;
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
    this.selectionService.selectPattern(this.pattern);
  }

  onClickRemove(): void {
    this.uiService.askConfirmation((confirmed: boolean) => {
      if (confirmed) {
        this.projectManagerService.removePattern(this.pattern, this.sequence);
      }
    });
  }

  onChangeNum(value: string): void {
    this.projectManagerService.changePatternNum(
      this.sequence,
      this.pattern,
      +value
    );
  }

  makeIdFor(label: string): string {
    return 'pattern-view-' + this.pattern.id + '-' + label;
  }

  onClickPlay(): void {
    // TODO
    console.log('TODO');
  }

  isSelected(): boolean {
    return this.selectionService.patternIsSelected(this.pattern);
  }
}
