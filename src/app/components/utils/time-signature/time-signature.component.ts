import { TimeSignature } from './../../../../models/utils/TimeSignature';
import { config } from './../../../../config/config';
import { Sheet } from './../../../../models/entities/Sheet';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-time-signature',
  templateUrl: './time-signature.component.html',
  styleUrls: ['./time-signature.component.scss'],
})
export class TimeSignatureComponent {
  @Input() model: Sheet;
  @Input() id: string;
  @Output() changed = new EventEmitter<TimeSignature>();
  config = config.sequencer.timeSignature;

  getIdFor(label: string): string {
    return 'timesignature-' + this.id + '-' + label;
  }

  onChange(): void {
    this.changed.emit(this.model.timeSignature);
  }
}
