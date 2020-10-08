import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPartsViewerComponent } from './song-parts-viewer.component';

describe('SongPartsViewerComponent', () => {
  let component: SongPartsViewerComponent;
  let fixture: ComponentFixture<SongPartsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongPartsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongPartsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
