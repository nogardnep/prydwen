import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTrackViewComponent } from './audio-track-view.component';

describe('AudioTrackViewComponent', () => {
  let component: AudioTrackViewComponent;
  let fixture: ComponentFixture<AudioTrackViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioTrackViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTrackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
