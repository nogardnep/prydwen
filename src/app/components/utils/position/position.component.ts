import { Position } from './../../../../models/utils/Position';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {
  @Input() position: Position;
  @Input() id: string;
  range = 1000;

  constructor() {}

  ngOnInit(): void {}
}
