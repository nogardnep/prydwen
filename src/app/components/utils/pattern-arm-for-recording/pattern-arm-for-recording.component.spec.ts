import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternArmForRecordingComponent } from './pattern-arm-for-recording.component';

describe('PatternArmForRecordingComponent', () => {
  let component: PatternArmForRecordingComponent;
  let fixture: ComponentFixture<PatternArmForRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternArmForRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternArmForRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
