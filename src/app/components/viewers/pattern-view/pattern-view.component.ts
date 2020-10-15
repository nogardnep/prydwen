import { PatternsManagerService } from './../../../services/managers/patterns-manager.service';
import { EntityView } from './../EntityView';
import { UIService } from './../../../services/ui/ui.service';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { SelectionService } from './../../../services/control/selection.service';
import { config } from './../../../../config/config';
import { Pattern } from './../../../../models/entities/Pattern';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pattern-view',
  templateUrl: './pattern-view.component.html',
  styleUrls: ['./pattern-view.component.scss'],
})
export class PatternViewComponent implements OnInit, EntityView {
  @Input() pattern: Pattern;
  minNum = config.entities.firstNum;
  maxNum = config.entities.maxNum;

  constructor(
    private selectionService: SelectionService,
    private projectManagerService: ProjectManagerService,
    private uiService: UIService,
    private patternsManagerService: PatternsManagerService
  ) {}

  ngOnInit(): void {}

  onClickSelect(): void {
    this.selectionService.selectPattern(this.pattern);
  }

  onClickRemove(): void {
    this.uiService.askConfirmation((confirmed: boolean) => {
      if (confirmed) {
        this.projectManagerService.removePattern(this.pattern);
      }
    });
  }

  onClickPlay(): void {
    this.patternsManagerService.play(this.pattern);
  }

  onClickStop(): void {
    this.patternsManagerService.stop(this.pattern);
  }

  isSelected(): boolean {
    return this.selectionService.patternIsSelected(this.pattern);
  }

  onChangeNum(value: string): void {
    this.projectManagerService.changePatternNum(this.pattern, +value);
  }

  makeIdFor(label: string): string {
    return 'pattern-view-' + this.pattern.id + '-' + label;
  }
}
