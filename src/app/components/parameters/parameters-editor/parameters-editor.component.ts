import { ParameterWrapper } from './../../../../api/wrappers/ParameterWrapper.model';
import { Entity } from './../../../../api/entities/Entity';
import { ParametersModel } from './../../../../api/parameters/Parameter';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-parameters-editor',
  templateUrl: './parameters-editor.component.html',
  styleUrls: ['./parameters-editor.component.scss'],
})
export class ParametersEditorComponent implements OnInit {
  @Input() parametersModel: ParametersModel;
  @Input() entity: Entity;
  @Output() changed = new EventEmitter<ParameterWrapper>();

  constructor() {}

  ngOnInit(): void {}

  getKeys(): string[] {
    return Object.keys(this.parametersModel);
  }

  onChange(parameterWrapper: ParameterWrapper): void {
    this.changed.emit(parameterWrapper);
  }
}
