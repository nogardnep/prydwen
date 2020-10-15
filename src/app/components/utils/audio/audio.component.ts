import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { Resource } from './../../../../models/entities/Resource';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnInit, OnChanges {
  @Input() resource: Resource;
  @Input() title: string;
  src: string = null;

  constructor(private projectManagerService: ProjectManagerService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.src = this.projectManagerService.makeSrc(this.resource);
  }
}
