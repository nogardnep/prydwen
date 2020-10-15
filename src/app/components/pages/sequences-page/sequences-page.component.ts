import { Sequence } from './../../../../models/entities/Sequence';
import { SelectionService } from './../../../services/control/selection.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from './../../../../models/entities/Project';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';

@Component({
  selector: 'app-sequences-page',
  templateUrl: './sequences-page.component.html',
  styleUrls: ['./sequences-page.component.scss'],
})
export class SequencesPageComponent {
  constructor() {}
}
