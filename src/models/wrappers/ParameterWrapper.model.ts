import { ParametersModel } from './../parameters/Parameter';
import { Entity } from './../entities/Entity';

export class ParameterWrapper {
  constructor(
    private entity: Entity,
    private parametersModel: ParametersModel,
    private key: string
  ) {}

  getEntity(): Entity {
    return this.entity;
  }

  getParameterModel(): ParametersModel {
    return this.parametersModel;
  }

  getKey(): string {
    return this.key;
  }
}
