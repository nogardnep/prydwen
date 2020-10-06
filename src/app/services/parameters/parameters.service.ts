import { Entity } from './../../../api/entities/Entity';
import {
  ParameterModel,
  ParameterLabel,
  ParametersModel,
  ParameterValue,
} from '../../../api/parameters/Parameter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ParametersService {
  constructor() {}

  // TODO: do not use string as keys

  checkParameter(
    entity: Entity,
    parametersModel: ParametersModel,
    key: string
  ): void {
    if (entity.parameters === undefined) {
      entity.parameters = {};
    }

    if (entity.parameters[key] === undefined) {
      entity.parameters[key] = parametersModel[key].default;
    }
  }

  getParameter(
    entity: Entity,
    parametersModel: ParametersModel,
    key: string
  ): ParameterValue {
    // TODO: do not use string for key (possible?)
    this.checkParameter(entity, parametersModel, key);
    return entity.parameters[key];
  }

  getLabelFor(value: number, parameterModel: ParameterModel): ParameterLabel {
    let foundLabel = null;
    const labels = parameterModel.labels;

    if (labels !== undefined) {
      labels.forEach((label: ParameterLabel) => {
        if (label.value === value) {
          foundLabel = label;
        }
      });
    }

    return foundLabel;
  }
}
