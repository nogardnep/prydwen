import { UtilsService } from './../../../services/control/utils.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Resource } from './../../../../api/entities/Resource';

@Component({
  selector: 'app-audio-resource',
  templateUrl: './audio-resource.component.html',
  styleUrls: ['./audio-resource.component.scss'],
})
export class AudioResourceComponent implements OnInit {
  @Input() resource: Resource;
  @Output() deleted = new EventEmitter<Resource>();

  constructor(
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {}

  onClickDelete(): void {
    this.utilsService.askConfirmation((confirmed: boolean) => {
      if (confirmed) {
        this.deleted.emit(this.resource);
      }
    });
  }
}
