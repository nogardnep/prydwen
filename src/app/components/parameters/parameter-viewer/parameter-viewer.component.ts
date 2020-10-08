import { Component, Input, OnInit } from '@angular/core';
import { ParametersService } from 'src/app/services/parameters/parameters.service';
import { EntityWithParameters } from './../../../../api/entities/EntityWithParameters';
import { ParametersModel } from './../../../../api/parameters/Parameter';

@Component({
  selector: 'app-parameter-viewer',
  templateUrl: './parameter-viewer.component.html',
  styleUrls: ['./parameter-viewer.component.scss'],
})
export class ParameterViewerComponent implements OnInit {
  @Input() entity: EntityWithParameters;
  @Input() key: string;
  @Input() parametersModel: ParametersModel;

  constructor(private parametersService: ParametersService) {}

  ngOnInit(): void {
    this.parametersService.checkParameter(
      this.entity,
      this.parametersModel,
      this.key
    );
  }

  print(): string {
    const value = this.entity.parameters[this.key];
    const label = this.parametersService.getLabelFor(
      value,
      this.parametersModel[this.key]
    );

    return label !== null ? label.text : value.toString();
  }
}
