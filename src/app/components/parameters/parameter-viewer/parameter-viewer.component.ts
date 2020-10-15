import { ParameterUtils } from './../../../utils/ParameterUtils';
import { Component, Input, OnInit } from '@angular/core';
import { EntityWithParameters } from './../../../../models/entities/EntityWithParameters';
import { ParametersModel } from './../../../../models/parameters/Parameter';

@Component({
  selector: 'app-parameter-viewer',
  templateUrl: './parameter-viewer.component.html',
  styleUrls: ['./parameter-viewer.component.scss'],
})
export class ParameterViewerComponent implements OnInit {
  @Input() entity: EntityWithParameters;
  @Input() key: string;
  @Input() parametersModel: ParametersModel;

  constructor() {}

  ngOnInit(): void {
    ParameterUtils.checkParameter(
      this.entity,
      this.parametersModel,
      this.key
    );
  }

  print(): string {
    const value = this.entity.parameters[this.key];
    const label = ParameterUtils.getLabelFor(
      value,
      this.parametersModel[this.key]
    );

    return label !== null ? label.text : value.toString();
  }
}
