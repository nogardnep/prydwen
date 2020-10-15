import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTracksViewerComponent } from './audio-tracks-viewer.component';

describe('AudioTracksViewerComponent', () => {
  let component: AudioTracksViewerComponent;
  let fixture: ComponentFixture<AudioTracksViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioTracksViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTracksViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
