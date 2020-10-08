import { pages } from '../../../../config/pages';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClickConfiguration(): void {
    this.router.navigate(['/' + pages.configuration.path]);
  }
}
