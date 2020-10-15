import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTrackArmForRecordingComponent } from './audio-track-arm-for-recording.component';

describe('AudioTrackArmForRecordingComponent', () => {
  let component: AudioTrackArmForRecordingComponent;
  let fixture: ComponentFixture<AudioTrackArmForRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioTrackArmForRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTrackArmForRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
