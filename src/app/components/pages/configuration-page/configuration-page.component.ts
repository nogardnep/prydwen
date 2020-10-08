import { UserConfiguration } from './../../../../api/utils/userConfig';
import { Location } from '@angular/common';
import { ConfigurationDataService } from './../../../services/data/configuration-data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss']
})
export class ConfigurationPageComponent implements OnInit {
  configuration: UserConfiguration;
  loading = true;

  constructor(
    private location: Location,
    private configurationDataService: ConfigurationDataService
  ) {}

  ngOnInit(): void {
    this.configurationDataService
      .load()
      .then((configuration: UserConfiguration) => {
        this.loading = false;
        this.configuration = configuration;
      });
  }

  onClickCancel(): void {
    this.location.back();
  }

  onSubmit(ngForm: NgForm): void {
    const configuration = ngForm.form.value as UserConfiguration;
    configuration.dataRoot = configuration.dataRoot.replace(/\\/g, '/'); // TODO: does not work

    this.configurationDataService.update(configuration).then(() => {
      this.location.back();
    });
  }
}
