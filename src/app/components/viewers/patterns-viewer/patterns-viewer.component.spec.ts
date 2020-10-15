import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternsViewerComponent } from './patterns-viewer.component';

describe('PatternsViewerComponent', () => {
  let component: PatternsViewerComponent;
  let fixture: ComponentFixture<PatternsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
