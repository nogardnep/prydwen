import { config } from './../../../../config/config';
import { Sheet } from './../../../../api/entities/Sheet';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-time-signature',
  templateUrl: './time-signature.component.html',
  styleUrls: ['./time-signature.component.scss'],
})
export class TimeSignatureComponent {
  @Input() model: Sheet;
  @Input() id: string;
  config = config.sequencer.timeSignature;

  getIdFor(label: string): string {
    return 'timesignature-' + this.id + '-' + label;
  }
}
