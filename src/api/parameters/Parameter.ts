export type ParameterValue = number;

export type ParameterLabel = {
  text: string;
  value: ParameterValue;
};

export type ParameterModel = {
  name: string;
  default: ParameterValue;
  labels?: ParameterLabel[];
  min?: number;
  max?: number;
};

export type ParametersModel = {
  [name: string]: ParameterModel;
};

export type Parameters = {
  [name: string]: ParameterValue;
};
