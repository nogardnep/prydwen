import { EntityWithParameters } from './../../models/entities/EntityWithParameters';
import {
  ParameterLabel,
  ParameterModel,
  ParametersModel,
  ParameterValue,
} from './../../models/parameters/Parameter';

export class ParameterUtils {
  static checkParameter(
    entity: EntityWithParameters,
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

  static getParameter(
    entity: EntityWithParameters,
    parametersModel: ParametersModel,
    key: string
  ): ParameterValue {
    // TODO: do not use string for key (possible?)
    ParameterUtils.checkParameter(entity, parametersModel, key);
    return entity.parameters[key];
  }

  static getLabelFor(
    value: number,
    parameterModel: ParameterModel
  ): ParameterLabel {
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
