import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencesViewerComponent } from './sequences-viewer.component';

describe('SequencesViewerComponent', () => {
  let component: SequencesViewerComponent;
  let fixture: ComponentFixture<SequencesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequencesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
