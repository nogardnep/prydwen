import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { ServerService } from './../../../services/server/server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
})
export class IndexPageComponent implements OnInit {
  constructor(
    private serverService: ServerService,
    private projectManagerService: ProjectManagerService
  ) {}

  ngOnInit(): void {}
}
