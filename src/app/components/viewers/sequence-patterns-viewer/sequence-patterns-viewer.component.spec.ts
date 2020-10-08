import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencePatternsViewerComponent } from './sequence-patterns-viewer.component';

describe('SequencePatternsViewerComponent', () => {
  let component: SequencePatternsViewerComponent;
  let fixture: ComponentFixture<SequencePatternsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequencePatternsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencePatternsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
