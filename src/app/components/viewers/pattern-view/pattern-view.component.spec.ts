import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternViewComponent } from './pattern-view.component';

describe('PatternViewComponent', () => {
  let component: PatternViewComponent;
  let fixture: ComponentFixture<PatternViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
