import { UIService } from './../../../services/ui/ui.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Resource } from './../../../../api/entities/Resource';

@Component({
  selector: 'app-audio-resource',
  templateUrl: './audio-resource.component.html',
  styleUrls: ['./audio-resource.component.scss'],
})
export class AudioResourceComponent implements OnInit {
  @Input() resource: Resource;
  @Output() deleteClicked = new EventEmitter<Resource>();

  constructor(
    private uiService: UIService
  ) {}

  ngOnInit(): void {}

  onClickDelete(): void {
    this.deleteClicked.emit(this.resource);
  }
}
